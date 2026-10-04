// Вкладка «Перевірити»: видані завдання, здачі учнів і форми оцінювання.
window.App = window.App || {};

window.App.teacherAssignmentsReviewView = (function () {
  "use strict";

  function create(deps) {
    const {
      ensureUiState,
      getFilteredAssignments,
      escapeHtml,
      ctx,
      getSubmissionsForAssignment,
      formatDate
    } = deps;

    function renderReviewTab() {
      const ui = ensureUiState();
      const assignmentsList = getFilteredAssignments();

      return `
        <div style="display: flex; flex-direction: column; gap: 24px; width: 100%; max-width: 1100px; margin: 0 auto;">
          
          <section class="teacher-card" style="padding: 16px 20px; background: rgba(30,41,59,0.6); border: 1px solid var(--border); border-radius: 16px; backdrop-filter: blur(10px);">
            <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
              
              <div style="flex: 2; min-width: 200px; position: relative;">
                <i class="ri-search-line" style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--text-dim);"></i>
                <input
                  id="teacherIssuedSearch"
                  class="teacher-input"
                  type="search"
                  placeholder="Пошук завдання..."
                  value="${escapeHtml(ui.issuedSearch || "")}"
                  style="margin: 0; padding: 10px 14px 10px 40px; width: 100%; border-radius: 10px; background: rgba(0,0,0,0.2); border-color: rgba(255,255,255,0.05);"
                >
              </div>

              <select id="teacherIssuedClassFilter" class="teacher-input" style="flex: 1; min-width: 140px; margin: 0; padding: 10px 14px; border-radius: 10px; background: #0f172a; color: #f8fafc; border: 1px solid rgba(255,255,255,0.1);">
                <option value="all">🎓 Усі класи</option>
                ${ctx.teacherClasses.map((cls) => `<option value="${escapeHtml(cls.code)}" ${String(ui.issuedClassFilter || "all") === String(cls.code) ? "selected" : ""}>${escapeHtml(cls.name || cls.code)}</option>`).join("")}
              </select>

              <select id="teacherIssuedStudentFilter" class="teacher-input" style="flex: 1; min-width: 160px; margin: 0; padding: 10px 14px; border-radius: 10px; background: #0f172a; color: #f8fafc; border: 1px solid rgba(255,255,255,0.1);" ${ui.issuedClassFilter === "all" ? "disabled" : ""}>
                <option value="all">👤 Усі учні</option>
                ${ctx.classStudents.map((s) => `<option value="${escapeHtml(s.id)}" ${String(ui.issuedStudentFilter || "all") === String(s.id) ? "selected" : ""}>${escapeHtml(s.full_name)}</option>`).join("")}
              </select>

<select id="teacherIssuedStatusFilter" class="teacher-input" style="flex: 1; min-width: 140px; margin: 0; padding: 10px 14px; border-radius: 10px; background: #0f172a; color: #f8fafc; border: 1px solid rgba(255,255,255,0.1);">
  <option value="all" ${String(ui.issuedStatusFilter || "all") === "all" ? "selected" : ""}>🗂 Усі стани</option>
  <option value="submitted" ${String(ui.issuedStatusFilter) === "submitted" ? "selected" : ""}>⚠️ Очікують перевірки</option>
  <option value="review" ${String(ui.issuedStatusFilter) === "review" ? "selected" : ""}>🟣 На перевірці</option>
  <option value="reviewed" ${String(ui.issuedStatusFilter) === "reviewed" ? "selected" : ""}>✅ Оцінено</option>
  <option value="returned" ${String(ui.issuedStatusFilter) === "returned" ? "selected" : ""}>↩️ Доопрацювати</option>
  <option value="missing" ${String(ui.issuedStatusFilter) === "missing" ? "selected" : ""}>🟢 Не здано</option>
  <option value="active" ${String(ui.issuedStatusFilter) === "active" ? "selected" : ""}>📌 Активні</option>
  <option value="closed" ${String(ui.issuedStatusFilter) === "closed" ? "selected" : ""}>🔒 Закриті</option>
</select>
            </div>
          </section>

          ${
            assignmentsList.length === 0
              ? `
            <div style="text-align: center; padding: 60px 20px; background: rgba(0,0,0,0.1); border-radius: 16px; border: 1px dashed rgba(255,255,255,0.1);">
              <i class="ri-inbox-2-line" style="font-size: 40px; color: var(--text-dim); margin-bottom: 12px; display: block;"></i>
              <p style="color: var(--text-dim); font-size: 14px; margin: 0;">За вашими фільтрами нічого не знайдено.</p>
            </div>
          `
              : `
            <div style="display: flex; flex-direction: column; gap: 16px;">
${assignmentsList
  .map((item) => {
    let subs = getSubmissionsForAssignment(item.id);

    if (ui.issuedStudentFilter && ui.issuedStudentFilter !== "all") {
      subs = subs.filter((s) => String(s.student_id || "") === String(ui.issuedStudentFilter));
    }

    const unreviewedCount = subs.filter((s) => s.status === "submitted" || s.status === "review").length;
    const hasNew = unreviewedCount > 0;

    const targetClass = ctx.teacherClasses.find((c) => String(c.code) === String(item.class_code));
    const className = targetClass ? targetClass.name || targetClass.code : item.class_code || "—";

    return `
                  <details class="teacher-task-accordion" style="background: var(--surface2); border: 1px solid ${hasNew ? "rgba(251, 191, 36, 0.4)" : "var(--border)"}; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                    
                    <summary style="padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; list-style: none; user-select: none; transition: background 0.2s;">
                      
                      <div style="flex: 1;">
                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 6px;">
                          <h4 style="margin: 0; font-size: 16px; font-weight: 700; color: var(--text);">${escapeHtml(item.title_snapshot || "Без назви")}</h4>
                          ${renderAssignmentStatusBadge(item.status)}
                          ${hasNew ? `<span style="background: rgba(251,191,36,0.15); color: var(--warn); border: 1px solid rgba(251,191,36,0.3); font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 12px; letter-spacing: 0.05em;">+${unreviewedCount} НОВИХ</span>` : ""}
                        </div>
                        
                        <div style="font-size: 12px; color: var(--text-dim); display: flex; gap: 16px; flex-wrap: wrap;">
                          <span style="display: flex; align-items: center; gap: 4px;"><i class="ri-user-settings-line" style="color: var(--accent);"></i> <b style="color: var(--text);">${item.target_type === "student" ? "Індивідуально" : "Усьому класу"}</b></span>
                          <span style="display: flex; align-items: center; gap: 4px;"><i class="ri-group-line" style="color: var(--primary);"></i> Клас: <b style="color: var(--text);">${escapeHtml(className)}</b></span>
                          <span style="display: flex; align-items: center; gap: 4px;"><i class="ri-calendar-line"></i> Видано: <span style="color: var(--text);">${escapeHtml(formatDate(item.created_at))}</span></span>
                          <span style="display: flex; align-items: center; gap: 4px;"><i class="ri-calendar-todo-line" style="color: var(--warn);"></i> Дедлайн: <b style="color: var(--text);">${escapeHtml(formatDate(item.due_at))}</b></span>
                        </div>
                      </div>
                      
                      <div style="display: flex; align-items: center; gap: 16px;">
                        <div style="font-size: 12px; font-weight: 600; color: var(--text-dim); background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.05); padding: 6px 12px; border-radius: 10px; display: flex; align-items: center; gap: 6px;">
                          <i class="ri-stack-line"></i> Здач: ${subs.length}
                        </div>
                        <i class="ri-arrow-down-s-line chevron" style="font-size: 24px; color: var(--text-dim); transition: transform 0.3s;"></i>
                      </div>
                    </summary>

                    <div style="background: rgba(0,0,0,0.25); border-top: 1px solid rgba(255,255,255,0.03); padding: 16px;">
                      <div style="display: flex; justify-content: flex-end; margin-bottom: 12px;">
                         <button class="teacher-btn teacher-btn--ghost teacher-btn--small" data-delete-assignment="${escapeHtml(item.id)}" style="color: var(--danger); opacity: 0.7;">
                           <i class="ri-delete-bin-line"></i> Видалити завдання
                         </button>
                      </div>
                      
                      ${renderAssignmentSubmissions(item, subs)}
                    </div>
                  </details>
                `;
  })
  .join("")}
            </div>
          `
          }
        </div>

        <style>
          .teacher-task-accordion > summary::-webkit-details-marker { display: none; }
          .teacher-task-accordion[open] .chevron { transform: rotate(180deg); color: var(--primary); }
          .teacher-task-accordion > summary:hover { background: rgba(255,255,255,0.02); }
          
          .student-sub-accordion > summary::-webkit-details-marker { display: none; }
          .student-sub-accordion[open] .sub-chevron { transform: rotate(180deg); }
          .student-sub-accordion[open] > summary { background: rgba(14,165,233,0.05); border-bottom: 1px solid rgba(255,255,255,0.03); }
          select.teacher-input option { background: #0f172a; color: #f8fafc; }
        </style>
      `;
    }

    function renderAssignmentSubmissions(item, rows) {
      if (!rows || !rows.length) {
        const safeStatus = String(item?.status || "active");
        const label =
          safeStatus === "closed"
            ? "Завдання закрите без здачі."
            : "Завдання видано, але учень ще нічого не відправив.";

        return `
    <div style="text-align: center; padding: 20px; background: rgba(255,255,255,0.01); border-radius: 12px; border: 1px dashed rgba(255,255,255,0.05);">
      <span style="color: var(--text-dim); font-size: 13px; font-style: italic;">${label}</span>
    </div>`;
      }

      return `
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${rows
            .map((submission) => {
              const isNew = submission.status === "submitted";
              const borderGlow = isNew
                ? "border-left: 3px solid var(--warn);"
                : "border-left: 3px solid transparent;";

              return `
            <details class="student-sub-accordion" style="background: rgba(30,41,59,0.4); border: 1px solid rgba(255,255,255,0.04); border-radius: 10px; overflow: hidden; ${borderGlow}">
              
              <summary style="padding: 10px 16px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; user-select: none; transition: background 0.2s;">
                <div style="display: flex; align-items: center; gap: 12px;">
                  <div style="width: 28px; height: 28px; border-radius: 8px; background: var(--primary); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; color: #fff;">
                    ${(submission.student_name || "У")[0].toUpperCase()}
                  </div>
                  <div style="display: flex; flex-direction: column;">
                    <span style="font-size: 14px; font-weight: 600; color: var(--text);">${escapeHtml(submission.student_name || "Учень")}</span>
                    <span style="font-size: 11px; color: var(--text-dim);">${escapeHtml(formatDate(submission.submitted_at))}</span>
                  </div>
                </div>
                
                <div style="display: flex; align-items: center; gap: 12px;">
                  ${renderSubmissionStatusBadge(submission.status)}
                  ${submission.points != null ? `<span style="background: rgba(34,197,94,0.1); color: var(--success); font-weight: 800; font-size: 13px; padding: 2px 8px; border-radius: 6px; border: 1px solid rgba(34,197,94,0.2);">${submission.points} б.</span>` : ""}
                  <i class="ri-arrow-down-s-line sub-chevron" style="color: var(--text-dim); transition: transform 0.2s; font-size: 18px;"></i>
                </div>
              </summary>

              <div style="padding: 16px; display: flex; flex-direction: column; gap: 16px;">
                
                <div style="background: #020617; border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; overflow: hidden;">
                  <div style="padding: 8px 12px; background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.04); display: flex; align-items: center; gap: 8px;">
                    <i class="ri-code-s-slash-line" style="color: var(--text-dim);"></i>
                    <span style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: var(--text-dim); letter-spacing: 0.05em;">Відповідь учня</span>
                  </div>
                  <div style="padding: 16px; font-family: var(--mono); font-size: 13px; color: var(--text); white-space: pre-wrap; max-height: 350px; overflow-y: auto; line-height: 1.5;">${submission.submission_text ? escapeHtml(submission.submission_text) : `<span style="color: var(--text-dim); font-style: italic; font-family: var(--font);">Учень нічого не написав.</span>`}</div>
                </div>

                <form data-review-submission-form="${escapeHtml(submission.id)}" style="display: flex; flex-direction: column; gap: 12px; background: rgba(255,255,255,0.02); padding: 16px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.05);">
                  
                  <div>
                    <label style="display: block; font-size: 12px; font-weight: 600; color: var(--text-dim); margin-bottom: 6px;">Коментар (бачить учень)</label>
                    <textarea name="teacherComment" rows="2" class="teacher-input" placeholder="Напиши фідбек або зауваження..." style="margin: 0; width: 100%; font-size: 13px; resize: vertical; background: rgba(0,0,0,0.2);"></textarea>
                  </div>

                  <div style="display: flex; gap: 12px; align-items: flex-end; flex-wrap: wrap;">
                    
                    <div style="flex: 0 0 100px;">
                      <label style="display: block; font-size: 11px; color: var(--text-dim); margin-bottom: 6px;">Бал (0-100)</label>
                      <input type="number" name="points" min="0" max="100" class="teacher-input" placeholder="0" value="${submission.points ?? ""}" style="width: 100%; margin: 0; text-align: center; font-weight: 700; font-size: 14px; color: var(--success); background: rgba(0,0,0,0.2);">
                    </div>
                    
                    <div style="flex: 1; min-width: 160px;">
                      <label style="display: block; font-size: 11px; color: var(--text-dim); margin-bottom: 6px;">Статус перевірки</label>
                      <select name="status" class="teacher-input" style="width: 100%; margin: 0; font-size: 13px; cursor: pointer; background: #0f172a; color: #f8fafc; border: 1px solid rgba(255,255,255,0.1);">
                         <option value="submitted" ${submission.status === "submitted" ? "selected" : ""}>⏳ На розгляді</option>
                         <option value="review" ${submission.status === "review" ? "selected" : ""}>👁 В процесі перевірки</option>
                         <option value="returned" ${submission.status === "returned" ? "selected" : ""}>↩️ Доопрацювати</option>
                         <option value="reviewed" ${submission.status === "reviewed" ? "selected" : ""}>✅ Оцінено</option>
                      </select>
                    </div>

                    <div style="display: flex; align-items: flex-end;">
                      <button type="submit" class="teacher-btn teacher-btn--primary" style="height: 42px; margin: 0; padding: 0 20px;">
                        <i class="ri-save-line"></i> Зберегти оцінку
                      </button>
                    </div>
                    
                  </div>
                </form>

              </div>
            </details>
            `;
            })
            .join("")}
        </div>
      `;
    }

    function renderSubmissionStatusBadge(status) {
      const s = String(status || "submitted");
      let bg = "",
        color = "",
        icon = "",
        lbl = "";

      if (s === "submitted") {
        bg = "rgba(251, 191, 36, 0.15)";
        color = "var(--warn)";
        icon = "ri-time-line";
        lbl = "Очікує перевірки";
      } else if (s === "review") {
        bg = "rgba(139, 92, 246, 0.15)";
        color = "var(--accent)";
        icon = "ri-eye-line";
        lbl = "Перевіряється";
      } else if (s === "reviewed") {
        bg = "rgba(34, 197, 94, 0.15)";
        color = "var(--success)";
        icon = "ri-check-double-line";
        lbl = "Оцінено";
      } else if (s === "returned") {
        bg = "rgba(244, 63, 94, 0.15)";
        color = "var(--danger)";
        icon = "ri-reply-line";
        lbl = "На доопрацюванні";
      }

      return `<span style="display: inline-flex; align-items: center; gap: 4px; background: ${bg}; color: ${color}; padding: 4px 10px; border-radius: 8px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; border: 1px solid ${color.replace("var(", "rgba(").replace(")", ", 0.3)")}">
        <i class="${icon}"></i> ${escapeHtml(lbl)}
      </span>`;
    }

    function renderAssignmentStatusBadge(status) {
      const s = String(status || "active");
      if (s === "closed") {
        return `<span style="background: rgba(255,255,255,0.05); color: var(--text-dim); padding: 4px 10px; border-radius: 8px; font-size: 11px; font-weight: 800; text-transform: uppercase; border: 1px solid rgba(255,255,255,0.1);"><i class="ri-lock-line"></i> Закрито</span>`;
      }
      return `<span style="background: rgba(14, 165, 233, 0.15); color: var(--primary); padding: 4px 10px; border-radius: 8px; font-size: 11px; font-weight: 800; text-transform: uppercase; border: 1px solid rgba(14, 165, 233, 0.3);"><i class="ri-radio-button-line" style="animation: pulse 2s infinite;"></i> Активне</span>`;
    }

    return { renderReviewTab };
  }

  return { create };
})();
