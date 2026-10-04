// Вкладка видачі завдань і форма створення/редагування завдання.
window.App = window.App || {};

window.App.teacherAssignmentsIssueView = (function () {
  "use strict";

  function create(deps) {
    const {
      ensureUiState,
      getFilteredTaskBank,
      getManualThemes,
      getManualTasksByTheme,
      getAutoModules,
      renderBankSourcePanel,
      renderAutoSourcePanel,
      ctx,
      escapeHtml
    } = deps;

    // ==================================================
    // 5. Вкладка 2: ВИДАЧА ТА ПЕРЕВІРКА (Grading)
    // ==================================================
    function renderIssueTab() {
      const ui = ensureUiState();

      if (ui.isCreatingTask) {
        return `
          <div style="width: 100%; max-width: 800px; margin: 0 auto; animation: fadeIn 0.3s;">
            ${renderCreateTaskForm()}
          </div>
        `;
      }

      ui.issueSource = ui.issueSource || "bank";

      // --- ДАНІ ДЛЯ РУЧНИХ ЗАВДАНЬ ---
      const allManualTasks = getFilteredTaskBank();
      const manualThemes = getManualThemes();
      const filteredManualTasks = getManualTasksByTheme(ui.issueThemeFilter || "all");

      // --- ДАНІ ДЛЯ АВТО-ПРАКТИКУМІВ ---
      const autoModules = getAutoModules();

      // 1. Фільтр по Рівню (Junior, Middle, Senior)
      const currentAutoLevel = String(ui.issueAutoLevelFilter || "all").toLowerCase();

      let levelFilteredModules = autoModules.map((mod) => ({
        ...mod,
        tasks: Array.isArray(mod.tasks) ? [...mod.tasks] : []
      }));

      if (currentAutoLevel !== "all") {
        levelFilteredModules = levelFilteredModules
          .map((mod) => ({
            ...mod,
            tasks: (mod.tasks || []).filter(
              (task) => String(task.difficulty || "").toLowerCase() === currentAutoLevel
            )
          }))
          .filter((mod) => Array.isArray(mod.tasks) && mod.tasks.length > 0);
      }

      // 2. Фільтр по конкретному модулю (з випадаючого списку)
      const currentAutoFilter = ui.issueAutoModuleFilter || "all";
      const filteredAutoModules =
        currentAutoFilter === "all"
          ? levelFilteredModules
          : levelFilteredModules.filter((m) => String(m.id) === String(currentAutoFilter));

      // 3. Знаходимо вибрані авто-завдання для сайдбару
      const selectedAutoItems = (ui.selectedAutoTaskIds || [])
        .map((raw) => {
          const [, courseId, moduleId, taskIndex] = String(raw || "").split("|");
          const mod = autoModules.find((m) => String(m.id) === String(moduleId));
          const taskObj = mod?.tasks?.[Number(taskIndex)];
          if (!mod || !taskObj) return null;

          return {
            courseId,
            moduleId,
            taskIndex: Number(taskIndex),
            title: taskObj.title || `Завдання ${Number(taskIndex) + 1}`,
            moduleTitle: mod.title || "Авто-практикум"
          };
        })
        .filter(Boolean);

      // 4. Підготовка сайдбару для Ручних завдань (Генерується за тим же принципом)
      const selectedManualItems = (ui.selectedTaskIds || [])
        .map((id) => allManualTasks.find((t) => String(t.id) === String(id)))
        .filter(Boolean);

      return `
      <div class="teacher-issue-container" style="width: 100%; display: flex; flex-direction: column; max-width: 1100px; margin: 0 auto;">
        <section class="teacher-card" style="padding: 0; overflow: hidden; border: 1px solid var(--border); border-radius: 16px; background: rgba(30,41,59,0.5);">

          <div style="background: rgba(15,23,42,0.8); border-bottom: 1px solid rgba(255,255,255,0.05); padding: 24px 32px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
               <h3 style="margin: 0; font-size: 24px; color: var(--text); display: flex; align-items: center; gap: 12px;">
                 <div style="width: 48px; height: 48px; border-radius: 14px; background: linear-gradient(135deg, var(--primary) 0%, #3b82f6 100%); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 24px; box-shadow: 0 4px 15px rgba(14,165,233,0.3);">
                   <i class="ri-send-plane-fill"></i>
                 </div>
                 Видача завдання
               </h3>
            </div>

            <div style="display: flex; gap: 8px; background: rgba(0,0,0,0.3); padding: 8px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.05); overflow-x: auto;">
              <button type="button" class="source-tab-btn" data-source="bank" style="flex: 1; min-width: 150px; border: none; background: ${ui.issueSource === "bank" ? "var(--primary)" : "transparent"}; color: ${ui.issueSource === "bank" ? "#fff" : "var(--text-dim)"}; padding: 12px; border-radius: 10px; cursor: pointer; font-weight: 700; font-size: 14px; transition: all 0.3s; display: flex; align-items: center; justify-content: center; gap: 8px; ${ui.issueSource === "bank" ? "box-shadow: 0 4px 15px rgba(14,165,233,0.3);" : ""}">
                <i class="ri-book-read-line"></i> Мої ручні
              </button>
              <button type="button" class="source-tab-btn" data-source="auto" style="flex: 1; min-width: 150px; border: none; background: ${ui.issueSource === "auto" ? "var(--accent)" : "transparent"}; color: ${ui.issueSource === "auto" ? "#fff" : "var(--text-dim)"}; padding: 12px; border-radius: 10px; cursor: pointer; font-weight: 700; font-size: 14px; transition: all 0.3s; display: flex; align-items: center; justify-content: center; gap: 8px; ${ui.issueSource === "auto" ? "box-shadow: 0 4px 15px rgba(139,92,246,0.3);" : ""}">
                <i class="ri-robot-2-line"></i> Авто-практикуми
              </button>
              <button type="button" class="source-tab-btn" data-source="quick" style="flex: 1; min-width: 150px; border: none; background: ${ui.issueSource === "quick" ? "var(--success)" : "transparent"}; color: ${ui.issueSource === "quick" ? "#fff" : "var(--text-dim)"}; padding: 12px; border-radius: 10px; cursor: pointer; font-weight: 700; font-size: 14px; transition: all 0.3s; display: flex; align-items: center; justify-content: center; gap: 8px; ${ui.issueSource === "quick" ? "box-shadow: 0 4px 15px rgba(34,197,94,0.3);" : ""}">
                <i class="ri-flashlight-fill"></i> Швидке завдання
              </button>
            </div>
          </div>

          <form id="teacherIssueForm" style="padding: 32px;">
            <input type="hidden" name="taskSource" id="hiddenTaskSource" value="${ui.issueSource}">

            <div style="margin-bottom: 40px; min-height: ${ui.issueSource === "quick" ? "250px" : "0"};">

              ${renderBankSourcePanel({ ui, allManualTasks, manualThemes, filteredManualTasks, selectedManualItems })}

              ${renderAutoSourcePanel({ ui, autoModules, currentAutoLevel, levelFilteredModules, currentAutoFilter, filteredAutoModules, selectedAutoItems })}

              <div style="display: ${ui.issueSource === "quick" ? "block" : "none"};">
                <div style="background: rgba(0,0,0,0.2); padding: 24px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
                  <div style="margin-bottom: 20px;">
                    <label style="display: block; font-size: 12px; font-weight: 700; color: var(--text-dim); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">Назва завдання (Тема)</label>
                    <input type="text" class="teacher-input" name="quickTitle" placeholder="Наприклад: Робота зі списками Python" style="width: 100%; margin: 0; font-size: 15px; background: rgba(255,255,255,0.03);">
                  </div>
                  <div>
                    <label style="display: block; font-size: 12px; font-weight: 700; color: var(--text-dim); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">Коротка умова (Що зробити)</label>
                    <textarea class="teacher-input" name="quickDesc" rows="4" placeholder="Опишіть, що саме повинен зробити учень..." style="width: 100%; margin: 0; font-size: 15px; resize: vertical; background: rgba(255,255,255,0.03);"></textarea>
                  </div>
                </div>
              </div>

            </div> 

            ${
              ui.issueSource === "auto" || ui.issueSource === "bank"
                ? ""
                : `
              <div style="height: 1px; background: var(--border); margin-bottom: 32px;"></div>
              
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px; margin-bottom: 24px;">
                <div>
                  <label style="display: block; font-size: 12px; font-weight: 700; color: var(--text-dim); margin-bottom: 8px; text-transform: uppercase;">1. Оберіть клас</label>
                  <select id="assignmentClassCode" class="teacher-input" name="classCode" style="width: 100%; margin: 0;">
                    ${ctx.teacherClasses.map((cls) => `<option value="${escapeHtml(cls.code)}" ${String(ui.issueClassCode || "") === String(cls.code) ? "selected" : ""}>${escapeHtml(cls.name || cls.code)}</option>`).join("")}
                  </select>
                </div>
                <div>
                  <label style="display: block; font-size: 12px; font-weight: 700; color: var(--text-dim); margin-bottom: 8px; text-transform: uppercase;">2. Кому призначити?</label>
                  <select id="assignmentTargetType" class="teacher-input" name="targetType" style="width: 100%; margin: 0;">
                    <option value="class" ${ui.issueTargetType === "class" ? "selected" : ""}>👨‍👩‍👧‍👦 Усьому класу</option>
                    <option value="student" ${ui.issueTargetType === "student" ? "selected" : ""}>👤 Окремому учню</option>
                  </select>
                </div>
              </div>

              ${
                ui.issueTargetType === "student"
                  ? `
                <div style="margin-bottom: 24px; padding: 16px 20px; background: rgba(139, 92, 246, 0.1); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 12px; animation: fadeIn 0.3s;">
                  <label style="display: block; font-size: 12px; font-weight: 700; color: var(--accent); margin-bottom: 8px; text-transform: uppercase;">Оберіть учня</label>
                  <select id="assignmentStudentId" class="teacher-input" name="studentId" style="width: 100%; margin: 0;">
                    ${ctx.classStudents.length ? ctx.classStudents.map((s) => `<option value="${escapeHtml(s.id)}" ${String(ui.issueStudentId || "") === String(s.id) ? "selected" : ""}>${escapeHtml(s.full_name || "Без імені")}</option>`).join("") : `<option value="">У класі ще немає учнів</option>`}
                  </select>
                </div>
              `
                  : ""
              }

              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px; margin-bottom: 40px;">
                <div>
                  <label style="display: block; font-size: 12px; font-weight: 700; color: var(--text-dim); margin-bottom: 8px; text-transform: uppercase;">Дедлайн (необов'язково)</label>
                  <input class="teacher-input" name="dueAt" type="datetime-local" style="width: 100%; margin: 0;">
                </div>
                <div>
                  <label style="display: block; font-size: 12px; font-weight: 700; color: var(--text-dim); margin-bottom: 8px; text-transform: uppercase;">Примітка / Підказка</label>
                  <input class="teacher-input" name="noteForStudent" placeholder="Напишіть щось учням..." style="width: 100%; margin: 0;">
                </div>
              </div>

              <div style="display: flex; justify-content: center;">
                <button class="teacher-btn teacher-btn--primary" type="submit" style="min-width: 300px; padding: 16px; margin: 0 auto; display: flex; justify-content: center;">
                  <i class="ri-send-plane-fill"></i> Видати завдання
                </button>
              </div>
            `
            }

          </form>
        </section>

        <style>
          .teacher-radio-card.is-selected .radio-card-body{ border-color: var(--primary) !important; background: rgba(14,165,233,0.1) !important; }
          .teacher-radio-card.is-selected .radio-check-dot{ opacity: 1 !important; transform: scale(1) !important; }
          .auto-task-card.is-selected .radio-card-body{ border-color: var(--primary) !important; background: rgba(14,165,233,0.1) !important; }
          .auto-task-card.is-selected .radio-check-dot{ background: var(--primary) !important; opacity: 1 !important; transform: scale(1) !important; }
          .teacher-radio-card.auto-task.is-selected .radio-card-body{ border-color: var(--accent) !important; background: rgba(139,92,246,0.1) !important; }
          .teacher-radio-card.auto-task.is-selected .radio-check-dot{ background: var(--accent) !important; opacity: 1 !important; transform: scale(1) !important; }
          @keyframes fadeIn{ from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
        </style>
      </div>
      `;
    }

    // ==================================================
    // 4. Вкладка 1: БАЗА ЗАВДАНЬ (Task Bank)
    // ==================================================
    function renderCreateTaskForm() {
      const ui = ensureUiState();

      const editingTask = ui.isEditingTask
        ? ctx.taskBank.find((item) => String(item.id) === String(ui.editingTaskId || ""))
        : null;

      const isEdit = !!editingTask;

      return `
    <section class="teacher-card" style="border-color: rgba(14, 165, 233, 0.28); background: rgba(14, 165, 233, 0.03);">
      <div class="teacher-card__head" style="margin-bottom: 16px; align-items: flex-start;">
        <div>
          <h4 style="margin: 0; color: var(--primary);">
            <i class="ri-${isEdit ? "edit-2-line" : "add-box-line"}"></i>
            ${isEdit ? "Редагувати завдання" : "Створити нове завдання"}
          </h4>
          <p class="teacher-muted" style="margin-top: 4px;">
            ${isEdit ? "Зміни поля й збережи оновлену версію завдання" : "Додай ручне завдання у свою базу вчителя"}
          </p>
        </div>

        <button
          type="button"
          class="teacher-btn teacher-btn--ghost teacher-btn--small"
          data-close-create-task="1"
          style="margin: 0;"
        >
          <i class="ri-close-line"></i> Закрити
        </button>
      </div>

      <form id="teacherTaskBankForm" style="display: flex; flex-direction: column; gap: 12px;">
        <input
          class="teacher-input"
          name="title"
          placeholder="Назва завдання"
          required
          style="margin: 0;"
          value="${escapeHtml(editingTask?.title || "")}"
        >

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <input
            class="teacher-input"
            name="subject"
            placeholder="Розділ / курс (необов'язково)"
            style="margin: 0;"
            value="${escapeHtml(editingTask?.subject || "")}"
          >
          <input
            class="teacher-input"
            name="category"
            placeholder="Тема, наприклад: Цикли"
            style="margin: 0;"
            value="${escapeHtml(editingTask?.category || "")}"
          >
        </div>

        <textarea
          class="teacher-input"
          name="description"
          rows="5"
          placeholder="Умова завдання"
          required
          style="margin: 0;"
        >${escapeHtml(editingTask?.description || "")}</textarea>

        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <select class="teacher-input" name="solutionFormat" style="margin: 0; flex: 1 1 220px;">
            <option value="code" ${String(editingTask?.solution_format || "code") === "code" ? "selected" : ""}>Формат здачі: Код</option>
            <option value="text" ${String(editingTask?.solution_format || "") === "text" ? "selected" : ""}>Формат здачі: Текст</option>
          </select>

          <input
            class="teacher-input"
            name="maxScore"
            type="number"
            min="1"
            max="100"
            value="${escapeHtml(String(editingTask?.max_score ?? 12))}"
            placeholder="Макс. бал"
            style="margin: 0; width: 140px;"
          >
        </div>

        <textarea
          class="teacher-input"
          name="starterCode"
          rows="4"
          placeholder="Стартовий код (необов'язково)"
          style="margin: 0; font-family: var(--mono); font-size: 12px;"
        >${escapeHtml(editingTask?.starter_code || "")}</textarea>

        <label class="teacher-check" style="margin: 4px 0;">
          <input type="checkbox" name="isPublic" ${editingTask?.is_public ? "checked" : ""}>
          <span>Зробити доступним для інших вчителів</span>
        </label>

        <div style="display: flex; gap: 10px; justify-content: flex-end; flex-wrap: wrap;">
          <button type="button" class="teacher-btn teacher-btn--ghost" data-close-create-task="1" style="margin: 0;">
            Скасувати
          </button>

          <button class="teacher-btn teacher-btn--primary" type="submit" style="margin: 0;">
            <i class="ri-save-line"></i>
            ${isEdit ? "Зберегти зміни" : "Зберегти в базу"}
          </button>
        </div>
      </form>
    </section>
  `;
    }

    return { renderIssueTab };
  }

  return { create };
})();
