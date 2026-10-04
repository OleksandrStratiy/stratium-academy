// Розмітка сторінки учня: прогрес, індивідуальні доступи та видані завдання.
window.App = window.App || {};

window.App.teacherClassesStudentView = (function () {
  "use strict";

  function create(deps) {
    const {
      getStudentXP,
      getStudentAttempts,
      getStudentCompletedCount,
      getStudentLastActiveDays,
      ctx,
      getCourseAccessTree,
      getStudentCourseSummary,
      escapeHtml,
      renderStudentModuleAccessGroup,
      getActiveStudent,
      formatDate,
      getActiveClass
    } = deps;

    function getStudentRibbonState(student) {
      const xp = getStudentXP(student);
      const attempts = getStudentAttempts(student);
      const completed = getStudentCompletedCount(student);
      const inactiveDays = getStudentLastActiveDays(student);
      const submissionCount = ctx.activeStudentSubmissions.length;

      if (attempts >= 10 || (inactiveDays !== null && inactiveDays >= 10) || (xp < 100 && completed === 0)) {
        return {
          tone: "danger",
          label: "Потрібна увага",
          text: "Мало прогресу або давно немає активності. Варто переглянути завдання і підтримати учня."
        };
      }

      if (completed >= 8 || xp >= 300 || submissionCount >= 3) {
        return {
          tone: "success",
          label: "Добрий прогрес",
          text: "Учень стабільно рухається вперед і має помітний результат у курсах або завданнях."
        };
      }

      return {
        tone: "info",
        label: "Активний",
        text: "Є активність і поступ. Можна продовжувати в поточному темпі."
      };
    }

    function getStudentSubmissionForAssignment(assignmentId) {
      return (
        ctx.activeStudentSubmissions.find(
          (item) => String(item.assignment_id || "") === String(assignmentId || "")
        ) || null
      );
    }

    function renderStudentLearningStateBlock(student) {
      const courses = getCourseAccessTree();
      if (!courses.length) return "";

      return `
    <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.05);">
      <h5 style="margin: 0 0 12px 0; font-size: 11px; text-transform: uppercase; color: var(--text-dim); letter-spacing: 0.05em;">
        Стан навчання (Прогрес за курсами)
      </h5>
      <div style="display: flex; flex-wrap: wrap; gap: 12px;">
        ${courses
          .map((course) => {
            const summary = getStudentCourseSummary(student, course);

            return `
            <div style="flex: 1; min-width: 260px; background: rgba(0,0,0,0.2); padding: 12px 16px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.02);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <div style="font-weight: 700; font-size: 13px; color: var(--text);">${escapeHtml(course.courseTitle)}</div>
                <div style="font-size: 11px; color: var(--text-dim);">${summary.completedTasks} / ${summary.totalTasks} завдань</div>
              </div>
              <div style="display: flex; align-items: center; gap: 12px;">
                <div style="flex: 1; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
                  <div style="height: 100%; width: ${summary.percent}%; background: var(--primary); border-radius: 3px; transition: width 0.5s ease;"></div>
                </div>
                <div style="font-size: 12px; font-weight: 800; color: var(--primary);">${summary.percent}%</div>
              </div>
            </div>
          `;
          })
          .join("")}
      </div>
    </div>
  `;
    }

    function renderStudentAccessBlock(student) {
      const courses = getCourseAccessTree();
      if (!courses.length) return "";

      return `
    <style>
      .access-course-title { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--primary); margin: 20px 0 10px 0; font-weight: 800; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 8px; }
      .module-accordion { background: rgba(30,41,59,0.3); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; margin-bottom: 10px; overflow: hidden; transition: border-color 0.2s; }
      .module-accordion[open] { border-color: rgba(14, 165, 233, 0.3); background: rgba(30,41,59,0.5); }
      .module-summary { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; cursor: pointer; list-style: none; gap: 16px; }
      .module-summary::-webkit-details-marker { display: none; }
      .module-summary:hover { background: rgba(255,255,255,0.03); }
      .module-summary-left { display: flex; align-items: center; gap: 14px; }
      .module-icon { background: rgba(14, 165, 233, 0.1); color: var(--primary); width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; }
      .module-summary-right { display: flex; align-items: center; gap: 12px; }
      .module-summary-right i { transition: transform 0.3s ease; }
      .module-accordion[open] .module-summary-right i { transform: rotate(180deg); color: var(--primary); }
      .custom-select { appearance: none; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); color: var(--text); padding: 8px 32px 8px 12px; border-radius: 8px; font-size: 13px; font-weight: 600; font-family: var(--font); cursor: pointer; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2394a3b8'%3E%3Cpath d='M12 15l-5-5h10z'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 8px center; background-size: 18px; transition: 0.2s; }
      .custom-select:hover { border-color: rgba(255,255,255,0.3); }
      .custom-select:focus { border-color: var(--primary); outline: none; }
      .custom-select--unlocked { color: #4ade80; background-color: rgba(34, 197, 94, 0.05); border-color: rgba(34, 197, 94, 0.3); }
      .custom-select--locked { color: #fb7185; background-color: rgba(244, 63, 94, 0.05); border-color: rgba(244, 63, 94, 0.3); }
      .custom-select--small { padding: 4px 28px 4px 10px; font-size: 12px; border-radius: 6px; }
      .module-body { background: rgba(0,0,0,0.15); border-top: 1px solid rgba(255,255,255,0.05); padding: 8px 16px; }
      .task-access-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px dashed rgba(255,255,255,0.05); }
      .task-access-row:last-child { border-bottom: none; }
      .task-name { font-size: 13px; color: var(--text-dim); display: flex; align-items: center; gap: 10px; }
      .task-num { color: var(--text); font-family: var(--mono); font-size: 11px; background: rgba(255,255,255,0.1); width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; border-radius: 4px; }
    </style>

    <div style="background: rgba(14, 165, 233, 0.03); border: 1px solid rgba(14, 165, 233, 0.2); border-radius: 14px; padding: 20px; margin-bottom: 20px;">
      <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
        <i class="ri-user-settings-fill" style="color: var(--primary); font-size: 20px;"></i>
        <h4 style="margin: 0; color: var(--text); font-size: 16px;">Індивідуальні доступи учня</h4>
      </div>
      <p class="teacher-muted" style="margin: 0 0 16px 0; font-size: 13px;">
        Ці налаштування <b>ігнорують правила класу</b>. Використовуй їх, щоб персонально відкрити чи закрити завдання.<br>
        <i class="ri-checkbox-circle-fill" style="color: var(--success); font-size: 14px; vertical-align: text-bottom;"></i> — учень вже виконав це завдання.
      </p>

      <div style="display: flex; flex-direction: column;">
        ${courses
          .map(
            (course) => `
          <div class="access-course-title">${escapeHtml(course.courseTitle)}</div>
          <div>
            ${course.modules.map((module) => renderStudentModuleAccessGroup(student, course, module)).join("")}
          </div>
        `
          )
          .join("")}
      </div>
    </div>
  `;
    }

    function renderStudentAssignmentsBlock() {
      const student = getActiveStudent();

      if (!student) {
        return `
      <section class="teacher-card">
        <div class="teacher-empty">Учня не знайдено.</div>
      </section>
    `;
      }

      if (!ctx.activeStudentAssignments.length) {
        return `
      <section class="teacher-card">
        <div class="teacher-card__head">
          <div>
            <h4>Видані завдання</h4>
            <p class="teacher-muted">Окремі завдання для цього учня або завдання, видані всьому класу.</p>
          </div>
          <div class="teacher-class-item__actions">
            <button type="button" id="teacherRefreshStudentAssignmentsBtn" class="teacher-btn teacher-btn--ghost teacher-btn--small">Оновити</button>
            <button type="button" class="teacher-btn teacher-btn--ghost teacher-btn--small" data-open-assignments-student="${escapeHtml(student.id)}" data-open-assignments-classcode="${escapeHtml(student.class_code || ctx.activeClassCode || "")}">До вкладки завдань</button>
          </div>
        </div>
        <div class="teacher-empty" style="padding: 40px; text-align: center; background: rgba(255,255,255,0.02); border-radius: 16px; border: 1px dashed rgba(255,255,255,0.1);">
          <i class="ri-cup-line" style="font-size: 48px; color: var(--text-dim); margin-bottom: 16px; display: inline-block;"></i>
          <div style="font-size: 16px; font-weight: 700; color: var(--text);">Для цього учня поки немає виданих завдань</div>
        </div>
      </section>
    `;
      }

      const styles = `
    <style>
      .student-task-accordion > summary::-webkit-details-marker { display: none; } 
      .student-task-accordion[open] > summary { background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.05); } 
      .student-task-accordion[open] .task-chevron { transform: rotate(180deg); color: var(--primary) !important; } 
      .student-task-summary:hover { background: rgba(255,255,255,0.04); }
    </style>
  `;

      return `
    ${styles}
    <section class="teacher-card">
      <div class="teacher-card__head">
        <div>
          <h4>Видані завдання</h4>
          <p class="teacher-muted">Тут видно, що саме видано, що вже здано і який результат перевірки.</p>
        </div>
        <div class="teacher-class-item__actions">
          <button type="button" id="teacherRefreshStudentAssignmentsBtn" class="teacher-btn teacher-btn--ghost teacher-btn--small">Оновити</button>
          <button type="button" class="teacher-btn teacher-btn--ghost teacher-btn--small" data-open-assignments-student="${escapeHtml(student.id)}" data-open-assignments-classcode="${escapeHtml(student.class_code || ctx.activeClassCode || "")}">До вкладки завдань</button>
        </div>
      </div>

      <div class="teacher-student-assignments-wrapper" style="display: flex; flex-direction: column; gap: 4px;">
        ${ctx.activeStudentAssignments
          .map((item) => {
            const submission = getStudentSubmissionForAssignment(item.id);
            const subStatus = submission?.status || null;

            const starterStr = String(item.starter_code_snapshot || "").trim();
            const isAutoAssignment = starterStr.startsWith("auto|") || starterStr.startsWith("auto_module|");
            const displayMaxScore = isAutoAssignment ? 12 : item.max_score_snapshot || 12;

            let statusColor = "var(--text-dim)";
            let statusBg = "rgba(255, 255, 255, 0.05)";
            let statusLabel = "Видано";
            let icon = "ri-send-plane-line";
            let isOpen = false;

            if (isAutoAssignment && !subStatus) {
              statusColor = "var(--primary)";
              statusBg = "rgba(14, 165, 233, 0.1)";
              statusLabel = "Авто-задача";
              icon = "ri-terminal-box-fill";
            } else if (subStatus === "submitted") {
              statusColor = "var(--warn)";
              statusBg = "rgba(251, 191, 36, 0.1)";
              statusLabel = "Очікує перевірки";
              icon = "ri-time-line";
              isOpen = true;
            } else if (subStatus === "review") {
              statusColor = "var(--warn)";
              statusBg = "rgba(251, 191, 36, 0.1)";
              statusLabel = "Перевіряється";
              icon = "ri-eye-line";
              isOpen = true;
            } else if (subStatus === "reviewed") {
              statusColor = "var(--success)";
              statusBg = "rgba(34, 197, 94, 0.1)";
              statusLabel = "Оцінено";
              icon = "ri-check-double-line";
            } else if (subStatus === "returned") {
              statusColor = "var(--danger)";
              statusBg = "rgba(244, 63, 94, 0.1)";
              statusLabel = "Повернуто";
              icon = "ri-error-warning-line";
              isOpen = true;
            } else if (item.status === "closed") {
              statusColor = "var(--text-dim)";
              statusBg = "rgba(255, 255, 255, 0.05)";
              statusLabel = "Закрито";
              icon = "ri-lock-line";
            }

            const scoreBadge =
              subStatus === "reviewed" && submission?.points != null
                ? `<div style="background: rgba(34,197,94,0.14); color: var(--success); padding: 4px 10px; border-radius: 8px; font-weight: 800; font-size: 13px; border: 1px solid rgba(34,197,94,0.18); white-space: nowrap;">${submission.points} / ${displayMaxScore} балів</div>`
                : "";

            return `
            <details class="student-task-accordion" style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; margin-bottom: 12px; overflow: hidden; border-left: 4px solid ${statusColor}; box-shadow: 0 4px 15px rgba(0,0,0,0.1); transition: background 0.2s;" ${isOpen ? "open" : ""}>
              <summary class="student-task-summary" style="padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; list-style: none; gap: 16px; flex-wrap: wrap;">
                
                <div style="display: flex; flex-direction: column; gap: 8px; flex: 1; min-width: 250px;">
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="background: ${statusBg}; color: ${statusColor}; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; display: flex; align-items: center; gap: 4px;"><i class="${icon}"></i> ${statusLabel}</span>
                    <span style="font-size: 12px; color: var(--text-dim); display: flex; align-items: center; gap: 4px;"><i class="ri-pushpin-line"></i> Видано: ${formatDate(item.created_at)}</span>
                    ${item.target_type === "class" ? `<span style="font-size: 11px; color: var(--primary); background: rgba(14,165,233,0.1); padding: 2px 6px; border-radius: 4px;"><i class="ri-group-line"></i> На весь клас</span>` : ""}
                  </div>
                  <h4 style="margin: 0; font-size: 16px; font-weight: 800; color: var(--text);">${isAutoAssignment ? "🤖 " : ""}${escapeHtml(item.title_snapshot || "Без назви")}</h4>
                </div>
                
                <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap; justify-content: flex-end;">
                  ${scoreBadge}
                  <div style="font-size: 12px; color: var(--text); display: flex; align-items: center; gap: 6px; background: rgba(0,0,0,0.2); padding: 8px 12px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.04);">
                    <i class="ri-calendar-event-line" style="color: ${item.due_at ? "var(--primary)" : "var(--text-dim)"};"></i>
                    Дедлайн: ${item.due_at ? formatDate(item.due_at) : "Без дедлайну"}
                  </div>
                  <div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center;">
                    <i class="ri-arrow-down-s-line task-chevron" style="font-size: 20px; color: var(--text-dim); transition: transform 0.3s;"></i>
                  </div>
                </div>
              </summary>
              
              <div style="padding: 20px; border-top: 1px solid rgba(255,255,255,0.05); background: rgba(0,0,0,0.15);">
                
                ${item.note_for_student ? `<div style="font-size: 14px; color: var(--text); background: rgba(139, 92, 246, 0.1); border-left: 3px solid var(--accent); padding: 12px; border-radius: 0 8px 8px 0; margin-bottom: 16px;"><b><i class="ri-message-3-line"></i> Примітка для учня:</b> ${escapeHtml(item.note_for_student)}</div>` : ""}
                
                ${
                  submission
                    ? `
                  <div style="margin-top: 10px; padding: 16px; border: 1px solid rgba(14,165,233,0.15); border-radius: 14px; background: rgba(14,165,233,0.05); margin-bottom: 16px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                      <div style="font-size: 12px; text-transform: uppercase; color: var(--primary); font-weight: 800; letter-spacing: 0.05em;"><i class="ri-user-smile-line"></i> Відповідь учня:</div>
                      <div style="font-size: 12px; color: var(--text-dim);"><i class="ri-time-line"></i> Здано: ${formatDate(submission.submitted_at)}</div>
                    </div>
                    ${
                      submission.submission_text
                        ? `<div style="font-family: var(--mono); font-size: 14px; color: var(--text); white-space: pre-wrap; background: rgba(2,6,23,0.6); padding: 16px; border-radius: 10px; max-height: 350px; overflow-y: auto; border: 1px solid rgba(14,165,233,0.1);">${escapeHtml(submission.submission_text)}</div>`
                        : `<div style="font-size: 14px; color: var(--text-dim); font-style: italic;">Учень не додав текстову відповідь.</div>`
                    }
                  </div>
                `
                    : `
                  <div style="margin-top: 20px; margin-bottom: 16px; text-align: center; padding: 16px; font-size: 14px; color: var(--text-dim); background: rgba(255,255,255,0.02); border-radius: 14px; font-weight: 600; border: 1px dashed rgba(255,255,255,0.1);"><i class="ri-hourglass-2-fill" style="font-size: 18px; vertical-align: middle; margin-right: 6px;"></i> Учень ще не надіслав відповідь.</div>
                `
                }

                ${
                  submission && submission.teacher_comment
                    ? `
                    <div style="background: rgba(34, 197, 94, 0.05); border-left: 3px solid var(--success); padding: 12px; border-radius: 0 8px 8px 0; margin-bottom: 16px;">
                        <div style="font-size: 12px; color: var(--success); font-weight: 800; text-transform: uppercase; margin-bottom: 4px;">Твій коментар:</div>
                        <div style="font-size: 14px; color: var(--text);">${escapeHtml(submission.teacher_comment)}</div>
                    </div>
                `
                    : ""
                }

<div style="display: flex; justify-content: flex-end; gap: 10px; flex-wrap: wrap; padding-top: 10px; border-top: 1px dashed rgba(255,255,255,0.05);">
  <button
    type="button"
    class="teacher-btn teacher-btn--ghost teacher-btn--small teacher-btn--danger"
    data-remove-student-assignment="${escapeHtml(item.id)}"
    data-remove-student-id="${escapeHtml(student.id)}"
    data-remove-student-title="${escapeHtml(item.title_snapshot || "")}"
    style="display: flex; align-items: center; gap: 8px; border-radius: 8px;"
  >
    <i class="ri-user-unfollow-line"></i> Прибрати для учня
  </button>

  <button
    type="button"
    class="teacher-btn teacher-btn--primary teacher-btn--small"
    data-open-assignment-edit="${escapeHtml(item.id)}"
    data-open-assignment-title="${escapeHtml(item.title_snapshot || "")}"
    data-open-assignment-classcode="${escapeHtml(item.class_code || student.class_code || ctx.activeClassCode || "")}"
    data-open-assignment-studentid="${escapeHtml(student.id)}"
    style="display: flex; align-items: center; gap: 8px; border-radius: 8px;"
  >
    <i class="ri-external-link-line"></i> ${subStatus === "submitted" || subStatus === "review" ? "Перевірити завдання" : "Переглянути / Редагувати"}
  </button>
</div>
                
              </div>
            </details>
          `;
          })
          .join("")}
      </div>
    </section>
  `;
    }

    function renderStudentView() {
      const student = getActiveStudent();
      const cls = getActiveClass();

      if (!student) {
        return `<section class="teacher-panel"><div class="teacher-empty">Учня не знайдено.</div></section>`;
      }

      const xp = getStudentXP(student);
      const attempts = getStudentAttempts(student);
      const completed = getStudentCompletedCount(student);
      const lvl = window.App?.helpers?.levelFromXp
        ? window.App.helpers.levelFromXp(xp).level
        : Math.floor(xp / 200) + 1;
      const lastActive = student.updated_at ? escapeHtml(formatDate(student.updated_at)) : "Немає даних";

      const ribbon = getStudentRibbonState(student);
      let ribbonColor = "var(--primary)";
      let ribbonBg = "rgba(14, 165, 233, 0.1)";
      if (ribbon.tone === "danger") {
        ribbonColor = "var(--danger)";
        ribbonBg = "rgba(244, 63, 94, 0.1)";
      }
      if (ribbon.tone === "success") {
        ribbonColor = "var(--success)";
        ribbonBg = "rgba(34, 197, 94, 0.1)";
      }
      if (ribbon.tone === "warn") {
        ribbonColor = "var(--warn)";
        ribbonBg = "rgba(251, 191, 36, 0.1)";
      }

      return `
  <div class="teacher-shell">
    
    <div class="teacher-dashboard-hero" style="margin-bottom: 20px;">
      <div class="teacher-dashboard-hero__main">
        <button class="teacher-btn teacher-btn--ghost teacher-btn--small" data-back-to-class="${escapeHtml(student.class_code || ctx.activeClassCode || "")}" style="margin-bottom: 16px; padding-left: 0; color: var(--text-dim);">
          <i class="ri-arrow-left-line"></i> Назад до класу
        </button>
        
        <div style="display: flex; align-items: flex-start; gap: 16px; margin-bottom: 12px;">
          <div class="class-icon-bg" style="background: var(--primary); color: #fff; padding: 14px; border-radius: 50%; width: 56px; height: 56px; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold; box-shadow: 0 4px 15px rgba(14,165,233,0.3);">
            ${(student.full_name || "Б")[0].toUpperCase()}
          </div>
          <div>
            <div class="teacher-shell__eyebrow">ПРОФІЛЬ УЧНЯ</div>
            <h2 class="teacher-dashboard-hero__title" style="margin: 0;">
              ${escapeHtml(student.full_name || "Без імені")}
            </h2>
            
            <div style="display: flex; gap: 8px; margin-top: 10px; flex-wrap: wrap;">
              <span class="class-code-badge" style="border-color: transparent; background: rgba(255,255,255,0.05); font-family: var(--font);">
                <i class="ri-group-line"></i> Клас: <b style="color: var(--primary);">${escapeHtml(cls?.name || student.class_code || ctx.activeClassCode || "—")}</b>
              </span>
              <span class="class-code-badge" style="border-color: transparent; background: rgba(255,255,255,0.05); font-family: var(--font);">
                <i class="ri-time-line"></i> Був(ла): <b style="color: var(--text);">${lastActive}</b>
              </span>
              <span class="class-code-badge" style="border-color: ${ribbonColor}; background: ${ribbonBg}; color: ${ribbonColor}; font-family: var(--font);">
                ${escapeHtml(ribbon.label)}
              </span>
            </div>
          </div>
        </div>

        <div class="teacher-dashboard-hero__actions" style="margin-top: 20px;">
          <button class="teacher-btn teacher-btn--primary" data-open-assignments-student="${escapeHtml(student.id)}" data-open-assignments-classcode="${escapeHtml(student.class_code || ctx.activeClassCode || "")}">
            <i class="ri-add-line"></i> Видати завдання
          </button>
          <button type="button" id="teacherRefreshStudentAssignmentsBtn" class="teacher-btn teacher-btn--ghost">
            <i class="ri-refresh-line"></i> Оновити дані
          </button>
        </div>
      </div>

      <div class="teacher-dashboard-hero__side" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; align-content: center;">
        <div class="teacher-dashboard-mini-stat">
          <div class="teacher-dashboard-mini-stat__label" style="font-size: 11px;">Рівень учня</div>
          <div class="teacher-dashboard-mini-stat__value" style="font-size: 20px; color: var(--accent);">LVL ${lvl}</div>
        </div>
        <div class="teacher-dashboard-mini-stat">
          <div class="teacher-dashboard-mini-stat__label" style="font-size: 11px;">Поточний XP</div>
          <div class="teacher-dashboard-mini-stat__value" style="font-size: 20px;">${xp}</div>
        </div>
        <div class="teacher-dashboard-mini-stat">
          <div class="teacher-dashboard-mini-stat__label" style="font-size: 11px;">Виконано завдань</div>
          <div class="teacher-dashboard-mini-stat__value" style="font-size: 20px;">${completed}</div>
        </div>
        <div class="teacher-dashboard-mini-stat ${attempts >= 5 ? "teacher-dashboard-mini-stat--warn" : ""}">
          <div class="teacher-dashboard-mini-stat__label" style="font-size: 11px;">Невдалі спроби</div>
          <div class="teacher-dashboard-mini-stat__value" style="font-size: 20px;">${attempts}</div>
        </div>
      </div>

      ${renderStudentLearningStateBlock(student)}

    </div>

    <div style="display: flex; flex-direction: column; gap: 20px; width: 100%;">
      ${renderStudentAccessBlock(student)}
      ${renderStudentAssignmentsBlock()}
    </div>

  </div>
  `;
    }

    return { renderStudentView };
  }

  return { create };
})();
