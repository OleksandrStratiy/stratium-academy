window.App = window.App || {};

window.App.teacherClassesRender = (function () {
  "use strict";

  function create(deps) {
const {
  getStudentXP = () => 0,
  getStudentAttempts = () => 0,
  getStudentCompletedCount = () => 0,
  getActiveStudents = () => [],

  getCourseAccessTree = () => [],
  getModuleAccessState = () => "inherit",
  getTaskAccessState = () => "inherit",
  isStudentTaskDone = () => false,

  getClassModuleAccessState = () => "inherit",
  getClassTaskAccessState = () => "inherit",
  isClassFullyUnlocked = () => false
} = deps;
    function escapeHtml(str) {
      return String(str || "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    }

    function formatDate(dateValue) {
      if (!dateValue) return "Немає даних";
      const d = new Date(dateValue);
      return d.toLocaleDateString("uk-UA") + " о " + d.toLocaleTimeString("uk-UA", {
        hour: "2-digit",
        minute: "2-digit"
      });
    }









    function calcClassStats(students) {
      const count = students.length;
      const totalXp = students.reduce((sum, s) => sum + getStudentXP(s), 0);
      const avgXp = count ? Math.round(totalXp / count) : 0;

      let topStudent = null;
      students.forEach(s => {
        if (!topStudent || getStudentXP(s) > getStudentXP(topStudent)) {
          topStudent = s;
        }
      });

      const needHelp = students.filter(s => getStudentAttempts(s) >= 5).length;

      return {
        count,
        avgXp,
        topName: topStudent?.full_name || "—",
        needHelp
      };
    }
function renderStudentModuleAccessGroup(student, course, module) {
  const tasks = module.tasks || [];
  if (!tasks.length) return "";

  const moduleState = getModuleAccessState(student, course.courseId, module.moduleId);
  let moduleSelectClass = "teacher-access-select custom-select";
  if (moduleState === "unlocked") moduleSelectClass += " custom-select--unlocked";
  if (moduleState === "locked") moduleSelectClass += " custom-select--locked";

  const groups = {};
  tasks.forEach((task, index) => {
    const diff = task.taskDifficulty || "Junior"; 
    if (!groups[diff]) groups[diff] = [];
    groups[diff].push({ task, originalIndex: index }); 
  });

  // Жорсткий порядок від найлегшого до найскладнішого
  const order = ["Junior", "Middle", "Senior"];
  const sortedKeys = Object.keys(groups).sort((a, b) => {
    let ia = order.indexOf(a);
    let ib = order.indexOf(b);
    if (ia === -1) ia = 99; 
    if (ib === -1) ib = 99;
    return ia - ib;
  });

  return `
    <details class="module-accordion">
      <summary class="module-summary">
        <div class="module-summary-left">
          <div class="module-icon"><i class="ri-folder-user-fill"></i></div>
          <div>
            <h5 style="margin: 0; font-size: 15px; font-weight: 700; color: var(--text);">${escapeHtml(module.moduleTitle || module.moduleId)}</h5>
            <div style="font-size: 12px; color: var(--text-dim); margin-top: 2px;">Завдань: ${tasks.length}</div>
          </div>
        </div>
        
        <div class="module-summary-right">
          <select 
            class="${moduleSelectClass}" 
            data-access-type="module"
            data-course-id="${escapeHtml(course.courseId)}"
            data-module-id="${escapeHtml(module.moduleId)}"
            onclick="event.stopPropagation();" 
          >
            <option value="auto" ${moduleState === "auto" ? "selected" : ""}>Авто (за класом)</option>
            <option value="unlocked" ${moduleState === "unlocked" ? "selected" : ""}>🔓 Відкрито персонально</option>
            <option value="locked" ${moduleState === "locked" ? "selected" : ""}>🔒 Закрито персонально</option>
          </select>
          <i class="ri-arrow-down-s-line" style="font-size: 20px; color: var(--text-dim);"></i>
        </div>
      </summary>

      <div class="module-body">
        ${sortedKeys.map(diff => {
          const groupTasks = groups[diff];
          let textColor = "var(--primary)";
          if (diff === "Middle") textColor = "var(--warn)";
          if (diff === "Senior") textColor = "var(--danger)";

          return `
            <details style="margin-bottom: 8px; border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; overflow: hidden;">
              <summary class="level-summary" style="display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; cursor: pointer; list-style: none; border-bottom: 1px solid rgba(255,255,255,0.03);">
                <div style="display: flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: ${textColor};">
                  <span>${escapeHtml(diff)}</span>
                  <span style="opacity: 0.5; font-weight: 400;">(${groupTasks.length})</span>
                </div>
                <i class="ri-arrow-down-s-line level-chevron" style="color: var(--text-dim);"></i>
              </summary>
              
              <div style="padding: 4px 12px; background: rgba(0,0,0,0.1);">
                ${groupTasks.map(({ task, originalIndex }) => {
                  const taskState = getTaskAccessState(student, course.courseId, module.moduleId, originalIndex);
                  let taskSelectClass = "teacher-access-select custom-select custom-select--small";
                  if (taskState === "unlocked") taskSelectClass += " custom-select--unlocked";
                  if (taskState === "locked") taskSelectClass += " custom-select--locked";

                  // Перевіряємо, чи виконане завдання
                  const isDone = (typeof isStudentTaskDone === "function") ? isStudentTaskDone(student, course.courseId, module.moduleId, originalIndex) : false;
                  const doneIcon = isDone 
                    ? `<i class="ri-checkbox-circle-fill" style="color: var(--success); font-size: 16px;" title="Виконано"></i>` 
                    : `<i class="ri-checkbox-blank-circle-line" style="color: var(--text-dim); font-size: 16px; opacity: 0.3;" title="Ще не виконано"></i>`;

                  return `
                    <div class="task-access-row">
                      <div class="task-name">
                        ${doneIcon}
                        <span class="task-num">${originalIndex + 1}</span>
                        <span>${escapeHtml(task.taskTitle || 'Завдання')}</span>
                      </div>
                      
                      <select 
                        class="${taskSelectClass}" 
                        data-access-type="task"
                        data-course-id="${escapeHtml(course.courseId)}"
                        data-module-id="${escapeHtml(module.moduleId)}"
                        data-task-index="${originalIndex}"
                      >
                        <option value="auto" ${taskState === "auto" ? "selected" : ""}>Авто</option>
                        <option value="unlocked" ${taskState === "unlocked" ? "selected" : ""}>Відкрито</option>
                        <option value="locked" ${taskState === "locked" ? "selected" : ""}>Закрито</option>
                      </select>
                    </div>
                  `;
                }).join("")}
              </div>
            </details>
          `;
        }).join("")}
      </div>
    </details>
  `;
}



function renderClassModuleAccessGroup(classRow, course, module) {
  const tasks = module.tasks || [];
  if (!tasks.length) return "";

  const moduleState = getClassModuleAccessState(classRow, course.courseId, module.moduleId);
  let moduleSelectClass = "teacher-access-select custom-select";
  if (moduleState === "unlocked") moduleSelectClass += " custom-select--unlocked";
  if (moduleState === "locked") moduleSelectClass += " custom-select--locked";

  const groups = {};
  tasks.forEach((task, index) => {
    const diff = task.taskDifficulty || "Junior"; 
    if (!groups[diff]) groups[diff] = [];
    groups[diff].push({ task, originalIndex: index }); 
  });

  const order = ["Junior", "Middle", "Senior"];
const sortedKeys = Object.keys(groups).sort((a, b) => {
  const aIndex = order.includes(a) ? order.indexOf(a) : 99;
  const bIndex = order.includes(b) ? order.indexOf(b) : 99;
  return aIndex - bIndex;
});

  return `
    <details class="module-accordion">
      <summary class="module-summary">
        <div class="module-summary-left">
          <div class="module-icon"><i class="ri-folder-open-fill"></i></div>
          <div>
            <h5 style="margin: 0; font-size: 15px; font-weight: 700;">${escapeHtml(module.moduleTitle || module.moduleId)}</h5>
            <div style="font-size: 12px; color: var(--text-dim);">Завдань: ${tasks.length}</div>
          </div>
        </div>
        <div class="module-summary-right">
          <select class="${moduleSelectClass}" data-class-access-type="module" data-course-id="${escapeHtml(course.courseId)}" data-module-id="${escapeHtml(module.moduleId)}" onclick="event.stopPropagation();">
            <option value="auto" ${moduleState === "auto" ? "selected" : ""}>Авто</option>
            <option value="unlocked" ${moduleState === "unlocked" ? "selected" : ""}>🔓 Відкрито</option>
            <option value="locked" ${moduleState === "locked" ? "selected" : ""}>🔒 Закрито</option>
          </select>
          <i class="ri-arrow-down-s-line" style="font-size: 20px; color: var(--text-dim);"></i>
        </div>
      </summary>

      <div class="module-body" style="padding: 8px 16px;">
        ${sortedKeys.map(diff => {
          const groupTasks = groups[diff];
          let textColor = "var(--primary)";
          if (diff === "Middle") textColor = "var(--warn)";
          if (diff === "Senior") textColor = "var(--danger)";

          // Прибрали open (згорнуто за замовчуванням) та прибрали background (без заливки)
          return `
            <details style="margin-bottom: 8px; border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; overflow: hidden;">
              <summary class="level-summary" style="display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; cursor: pointer; list-style: none; border-bottom: 1px solid rgba(255,255,255,0.03);">
                <div style="display: flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: ${textColor};">
                  <span>${escapeHtml(diff)}</span>
                  <span style="opacity: 0.5; font-weight: 400;">(${groupTasks.length})</span>
                </div>
                <i class="ri-arrow-down-s-line level-chevron" style="color: var(--text-dim);"></i>
              </summary>
              
              <div style="padding: 4px 12px; background: rgba(0,0,0,0.1);">
                ${groupTasks.map(({ task, originalIndex }) => {
                  const taskState = getClassTaskAccessState(classRow, course.courseId, module.moduleId, originalIndex);
                  let taskSelectClass = "teacher-access-select custom-select custom-select--small";
                  if (taskState === "unlocked") taskSelectClass += " custom-select--unlocked";
                  if (taskState === "locked") taskSelectClass += " custom-select--locked";

                  return `
                    <div class="task-access-row">
                      <div class="task-name">
                        <span class="task-num">${originalIndex + 1}</span>
                        <span>${escapeHtml(task.taskTitle || 'Завдання')}</span>
                      </div>
                      <select class="${taskSelectClass}" data-class-access-type="task" data-course-id="${escapeHtml(course.courseId)}" data-module-id="${escapeHtml(module.moduleId)}" data-task-index="${originalIndex}">
                        <option value="auto" ${taskState === "auto" ? "selected" : ""}>Авто</option>
                        <option value="unlocked" ${taskState === "unlocked" ? "selected" : ""}>Відкрито</option>
                        <option value="locked" ${taskState === "locked" ? "selected" : ""}>Закрито</option>
                      </select>
                    </div>
                  `;
                }).join("")}
              </div>
            </details>
          `;
        }).join("")}
      </div>
    </details>
  `;
}

function renderClassAccessBlock(classRow) {
  const courses = getCourseAccessTree();
  if (!courses.length) return "";

  return `
    <style>
      .access-course-title { 
        font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; 
        color: var(--primary); margin: 20px 0 10px 0; font-weight: 800; 
        border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 8px; 
      }
      
      /* Верхній рядок керування */
      .access-topbar{
        display:flex;
        justify-content:space-between;
        align-items:center;
        gap:12px;
        margin: 6px 0 14px 0;
        padding: 10px 12px;
        background: rgba(30,41,59,0.22);
        border: 1px solid rgba(255,255,255,0.05);
        border-radius: 12px;
      }
      .access-topbar__title{
        font-size: 13px;
        font-weight: 700;
        color: var(--text);
      }
      .access-topbar__sub{
        font-size: 12px;
        color: var(--text-dim);
        margin-top: 2px;
      }
      .access-toggle{
        display:flex;
        align-items:center;
        gap:8px;
        cursor:pointer;
        user-select:none;
        white-space:nowrap;
      }
      .access-toggle input{
        accent-color: var(--primary);
        width: 16px;
        height: 16px;
        cursor:pointer;
      }
      .access-toggle span{
        font-size: 13px;
        font-weight: 600;
        color: var(--text);
      }
      
      /* Стилі красивих акордеонів */
      .module-accordion { 
        background: rgba(30,41,59,0.3); border: 1px solid rgba(255,255,255,0.05); 
        border-radius: 12px; margin-bottom: 10px; overflow: hidden; transition: border-color 0.2s; 
      }
      .module-accordion[open] { 
        border-color: rgba(14, 165, 233, 0.3); background: rgba(30,41,59,0.5); 
      }
      .module-summary { 
        display: flex; justify-content: space-between; align-items: center; 
        padding: 12px 16px; cursor: pointer; list-style: none; gap: 16px; 
      }
      .module-summary::-webkit-details-marker { display: none; }
      .module-summary:hover { background: rgba(255,255,255,0.03); }
      
      .module-summary-left { display: flex; align-items: center; gap: 14px; }
      .module-icon { 
        background: rgba(14, 165, 233, 0.1); color: var(--primary); 
        width: 38px; height: 38px; border-radius: 10px; display: flex; 
        align-items: center; justify-content: center; font-size: 20px; 
      }
      
      .module-summary-right { display: flex; align-items: center; gap: 12px; }
      .module-summary-right i { transition: transform 0.3s ease; }
      .module-accordion[open] .module-summary-right i { 
        transform: rotate(180deg); color: var(--primary); 
      }
      
      /* КАСТОМНІ СЕЛЕКТИ */
      .custom-select {
        appearance: none; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); 
        color: var(--text); padding: 8px 32px 8px 12px; border-radius: 8px; 
        font-size: 13px; font-weight: 600; font-family: var(--font); cursor: pointer;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2394a3b8'%3E%3Cpath d='M12 15l-5-5h10z'/%3E%3C/svg%3E");
        background-repeat: no-repeat; background-position: right 8px center; background-size: 18px; 
        transition: 0.2s;
      }
      .custom-select:hover { border-color: rgba(255,255,255,0.3); }
      .custom-select:focus { border-color: var(--primary); outline: none; }
      
      .custom-select--unlocked { color: #4ade80; background-color: rgba(34, 197, 94, 0.05); border-color: rgba(34, 197, 94, 0.3); }
      .custom-select--locked { color: #fb7185; background-color: rgba(244, 63, 94, 0.05); border-color: rgba(244, 63, 94, 0.3); }
      .custom-select--small { padding: 4px 28px 4px 10px; font-size: 12px; border-radius: 6px; }
      
      /* Внутрішній список завдань */
      .module-body { 
        background: rgba(0,0,0,0.15); border-top: 1px solid rgba(255,255,255,0.05); 
        padding: 8px 16px; 
      }
      .task-access-row { 
        display: flex; justify-content: space-between; align-items: center; 
        padding: 10px 0; border-bottom: 1px dashed rgba(255,255,255,0.05); 
      }
      .task-access-row:last-child { border-bottom: none; }
      .task-name { font-size: 13px; color: var(--text-dim); display: flex; align-items: center; gap: 10px; }
      .task-num { 
        color: var(--text); font-family: var(--mono); font-size: 11px; 
        background: rgba(255,255,255,0.1); width: 20px; height: 20px; 
        display: flex; align-items: center; justify-content: center; border-radius: 4px; 
      }
    </style>

    <div style="margin-top: 10px;">
      <div class="access-topbar">
        <div>
          <div class="access-topbar__title">Швидке керування доступом</div>
          <div class="access-topbar__sub">Можна одразу відкрити всі модулі без проходження попередніх.</div>
        </div>

        <label class="access-toggle">
          <input
            type="checkbox"
            data-class-open-all="1"
            ${isClassFullyUnlocked(classRow) ? "checked" : ""}
          >
          <span>Відкрити все</span>
        </label>
      </div>

      ${courses.map(course => `
        <div class="access-course-title">${escapeHtml(course.courseTitle)}</div>
        <div>
          ${course.modules.map(module => renderClassModuleAccessGroup(classRow, course, module)).join("")}
        </div>
      `).join("")}
    </div>
  `;
}
function renderNeedHelpBlock(options = {}) {
  const { compact = false, limit = 5 } = options;
  const students = getActiveStudents();

  if (!Array.isArray(students) || !students.length) {
    return compact
      ? `<div class="teacher-empty">Поки немає учнів із явними ризиками.</div>`
      : `
        <section class="teacher-card">
          <div class="teacher-card__head">
            <h4>Кому може знадобитися допомога</h4>
          </div>
          <div class="teacher-empty">Поки немає учнів із явними ризиками.</div>
        </section>
      `;
  }

  const struggling = students
    .map((student) => {
      const attempts = getStudentAttempts(student);
      const completed = getStudentCompletedCount(student);
      const xp = getStudentXP(student);

const reason =
  completed === 0
    ? "Ще не починав"
    : attempts >= 10
    ? "Багато спроб"
    : xp < 100
    ? "Низький XP"
    : "Потрібна увага";

return {
  student,
  attempts,
  completed,
  xp,
  reason
};
    })
    .filter((item) => item.attempts >= 10 || item.completed === 0)
    .sort((a, b) => b.attempts - a.attempts)
    .slice(0, limit);

  if (!struggling.length) {
    return compact
      ? `<div class="teacher-empty">Поки немає учнів із явними ризиками.</div>`
      : `
        <section class="teacher-card">
          <div class="teacher-card__head">
            <h4>Кому може знадобитися допомога</h4>
          </div>
          <div class="teacher-empty">Поки немає учнів із явними ризиками.</div>
        </section>
      `;
  }

  const inner = `
    <div class="teacher-help-compact-list">
      ${struggling.map((item) => `
        <article
          class="teacher-help-compact-item"
          data-open-student="${escapeHtml(item.student.id)}"
          tabindex="0"
          role="button"
        >
          <div class="teacher-help-compact-item__main">
            <div class="teacher-help-compact-item__name">
              ${escapeHtml(item.student.full_name || "Без імені")}
            </div>

            <div class="teacher-help-compact-item__meta">
              XP: ${item.xp} · Виконано: ${item.completed} · Спроб: ${item.attempts}
            </div>
          </div>

<div class="teacher-help-compact-item__badge">
  ${escapeHtml(item.reason)}
</div>
        </article>
      `).join("")}
    </div>
  `;

  if (compact) return inner;

  return `
    <section class="teacher-card">
      <div class="teacher-card__head">
        <h4>Кому може знадобитися допомога</h4>
      </div>
      ${inner}
    </section>
  `;
}

    // СЮДИ МИ ПОСТУПОВО ДОДАМО ІНШІ render-функції

    return {
      escapeHtml,
      formatDate,
      calcClassStats,
      renderStudentModuleAccessGroup,
      renderClassAccessBlock,
      renderNeedHelpBlock
    };
  }

  return { create };
})();
