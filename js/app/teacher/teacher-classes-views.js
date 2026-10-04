// Розмітка списку класів і сторінки окремого класу.
window.App = window.App || {};

window.App.teacherClassesViews = (function () {
  "use strict";

  function create(deps) {
    const {
      ctx,
      state,
      getClassesUi,
      getStudentAttempts,
      getStudentXP,
      escapeHtml,
      formatDate,
      getActiveClass,
      calcClassStats,
      renderClassAccessBlock,
      renderNeedHelpBlock
    } = deps;

    function getStudentCountForClass(classCode) {
      if (!classCode) return 0;
      if (classCode === ctx.activeClassCode) return ctx.activeStudents.length;

      const cls = ctx.teacherClasses.find((item) => item.code === classCode);
      if (!cls || !Array.isArray(state.user?.teacherClasses)) return 0;

      return Number(cls.student_count || 0);
    }

    function getFilteredClasses() {
      const ui = getClassesUi();
      const q = String(ui.classSearch || "")
        .trim()
        .toLowerCase();

      let list = [...ctx.teacherClasses];

      if (q) {
        list = list.filter(
          (cls) =>
            String(cls.name || "")
              .toLowerCase()
              .includes(q) ||
            String(cls.code || "")
              .toLowerCase()
              .includes(q) ||
            String(cls.school_name || "")
              .toLowerCase()
              .includes(q)
        );
      }

      if (ui.classSort === "name") {
        list.sort((a, b) => String(a.name || "").localeCompare(String(b.name || ""), "uk"));
      } else {
        list.sort((a, b) => {
          const aTime = new Date(a.updated_at || 0).getTime();
          const bTime = new Date(b.updated_at || 0).getTime();
          return bTime - aTime;
        });
      }

      return list;
    }

    function getFilteredStudents() {
      const ui = getClassesUi();
      const q = String(ui.studentSearch || "")
        .trim()
        .toLowerCase();

      let list = [...ctx.activeStudents];

      if (q) {
        list = list.filter((student) =>
          String(student.full_name || "")
            .toLowerCase()
            .includes(q)
        );
      }

      if (ui.showOnlyRisky) {
        list = list.filter((student) => getStudentAttempts(student) >= 5 || getStudentXP(student) < 100);
      }

      return list;
    }

    function renderClassesList() {
      const ui = getClassesUi();
      const classesToRender = getFilteredClasses();

      return `
    <style>
      .premium-class-card {
        background: linear-gradient(145deg, rgba(30,41,59,0.4), rgba(15,23,42,0.8));
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 18px;
        padding: 20px;
        transition: all 0.3s ease;
        display: flex;
        flex-direction: column;
        gap: 16px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .premium-class-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 35px -10px rgba(14, 165, 233, 0.25);
        border-color: rgba(14, 165, 233, 0.3);
      }
      .premium-class-card::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0; height: 4px;
        background: var(--primary);
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      .premium-class-card:hover::before {
        opacity: 1;
      }
      .class-icon-bg {
        background: rgba(255,255,255,0.05);
        padding: 10px;
        border-radius: 12px;
        color: var(--primary);
        transition: all 0.3s ease;
      }
      .premium-class-card:hover .class-icon-bg {
        background: var(--primary);
        color: #fff;
        transform: scale(1.1);
      }
      .class-code-badge {
        font-family: var(--mono);
        font-size: 13px;
        background: rgba(0,0,0,0.3);
        padding: 6px 12px;
        border-radius: 8px;
        border: 1px solid rgba(255,255,255,0.05);
        letter-spacing: 0.05em;
      }
    </style>

    <div class="teacher-toolbar teacher-toolbar--classes">
      <input
        type="text"
        id="teacherClassSearchInput"
        class="teacher-input"
        placeholder="Пошук класу, коду або школи"
        value="${escapeHtml(ui.classSearch || "")}"
      />

      <select id="teacherClassSortSelect" class="teacher-input">
        <option value="updated" ${ui.classSort === "updated" ? "selected" : ""}>Сортувати: за активністю</option>
        <option value="name" ${ui.classSort === "name" ? "selected" : ""}>Сортувати: за назвою (А-Я)</option>
      </select>
    </div>

    ${
      !classesToRender.length
        ? `<div class="teacher-empty">Нічого не знайдено. Спробуй змінити пошук або додати новий клас.</div>`
        : `
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; margin-top: 10px;">
            ${classesToRender
              .map(
                (cls) => `
              <article
                class="premium-class-card"
                data-class-open="${escapeHtml(cls.code)}"
                tabindex="0"
                role="button"
              >
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                  <div>
                    <div style="font-size: 11px; font-weight: 800; color: var(--primary); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 6px;">Клас</div>
                    <h3 style="margin: 0; font-size: 20px; line-height: 1.2;">${escapeHtml(cls.name)}</h3>
                  </div>
                  <div class="class-icon-bg">
                    <i class="ri-group-line" style="font-size: 20px;"></i>
                  </div>
                </div>

                <div style="font-size: 13px; color: var(--text-dim); display: flex; flex-direction: column; gap: 8px;">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <i class="ri-user-smile-line" style="font-size: 16px;"></i> 
                    <span>Учнів: <b style="color: var(--text); font-size: 14px;">${getStudentCountForClass(cls.code)}</b></span>
                  </div>
                  ${
                    cls.school_name
                      ? `
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <i class="ri-building-4-line" style="font-size: 16px;"></i> 
                    <span>Школа: <b style="color: var(--text);">${escapeHtml(cls.school_name)}</b></span>
                  </div>`
                      : ""
                  }
                </div>

                <div style="margin-top: auto; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between; align-items: center;">
                  
                  <div class="class-code-badge" title="Унікальний код класу">
                    ${escapeHtml(cls.code)}
                  </div>

                  <div style="display: flex; gap: 6px;" class="teacher-class-card__actions">
                    <button
                      type="button"
                      class="teacher-btn teacher-btn--ghost teacher-btn--small"
                      data-class-copy="${escapeHtml(cls.code)}"
                      title="Копіювати код"
                    >
                      <i class="ri-file-copy-line"></i>
                    </button>

                    <button
                      type="button"
                      class="teacher-btn teacher-btn--ghost teacher-btn--small teacher-btn--danger"
                      data-class-delete="${escapeHtml(cls.code)}"
                      title="Видалити клас"
                    >
                      <i class="ri-delete-bin-line"></i>
                    </button>
                  </div>

                </div>
              </article>
            `
              )
              .join("")}
          </div>
        `
    }
  `;
    }

    function renderStudentsTable() {
      const ui = getClassesUi();
      const studentsToRender = getFilteredStudents();

      if (!ctx.activeStudents.length) {
        return `<div class="teacher-empty">У цьому класі ще немає учнів.</div>`;
      }

      return `
    <style>
      .compact-student-row {
        display: grid; 
        grid-template-columns: minmax(150px, 3fr) 70px 120px 100px 130px 40px; 
        gap: 12px; align-items: center; padding: 10px 16px; 
        background: rgba(30,41,59,0.3); border: 1px solid rgba(255,255,255,0.03); 
        border-radius: 10px; transition: all 0.2s ease; cursor: pointer;
      }
      .compact-student-row:hover {
        background: rgba(30,41,59,0.8); border-color: rgba(14, 165, 233, 0.4); transform: translateX(4px);
      }
    </style>

    <div class="teacher-toolbar" style="margin-bottom: 16px; display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">
      <input
        type="text"
        id="teacherStudentSearchInput"
        class="teacher-input teacher-input--small"
        placeholder="Пошук учня..."
        value="${escapeHtml(ui.studentSearch || "")}"
        style="max-width: 220px; margin: 0;"
      />
      
      <label class="teacher-check" style="margin: 0; white-space: nowrap; font-size: 13px; display: flex; align-items: center; gap: 8px; cursor: pointer;">
        <input type="checkbox" id="teacherOnlyRiskyInput" ${ui.showOnlyRisky ? "checked" : ""} style="margin: 0;">
        <span style="color: var(--text-dim);">Тільки ті, хто відстає</span>
      </label>
    </div>

    ${
      !studentsToRender.length
        ? `<div class="teacher-empty" style="padding: 20px;">Нікого не знайдено.</div>`
        : `
          <div style="display: grid; grid-template-columns: minmax(150px, 3fr) 70px 120px 100px 130px 40px; gap: 12px; padding: 0 16px 8px 16px; border-bottom: 1px solid rgba(255,255,255,0.05);">
            <div class="student-col-header">Учень</div>
            <div class="student-col-header">Рівень</div>
            <div class="student-col-header">Прогрес</div>
            <div class="student-col-header">Спроби</div>
            <div class="student-col-header">Останній візит</div>
            <div class="student-col-header"></div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 8px;">
            ${studentsToRender
              .map((student) => {
                const xp = getStudentXP(student);
                const attempts = getStudentAttempts(student);
                const risky = attempts >= 5 || xp < 100;
                const lvl = window.App?.helpers?.levelFromXp
                  ? window.App.helpers.levelFromXp(xp).level
                  : Math.floor(xp / 200) + 1;

                return `
                <article class="compact-student-row" data-open-student="${escapeHtml(student.id)}" tabindex="0" role="button">
                  <div style="display: flex; align-items: center; gap: 10px; overflow: hidden;">
                    <div style="min-width: 32px; height: 32px; border-radius: 50%; background: var(--primary); display: flex; align-items: center; justify-content: center; font-weight: bold; color: #fff;">
                      ${(student.full_name || "Б")[0].toUpperCase()}
                    </div>
                    <div style="font-weight: 600; font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                      ${escapeHtml(student.full_name || "Без імені")}
                    </div>
                  </div>
                  <div style="font-size: 13px; font-weight: 800; color: var(--accent);">LVL ${lvl}</div>
                  <div style="font-size: 13px;"><b style="color: var(--primary);">${xp}</b> <span style="color: var(--text-dim); font-size: 11px;">XP</span></div>
                  <div><span class="teacher-pill ${attempts >= 5 ? "teacher-pill--danger" : "teacher-pill--ghost"}" style="padding: 2px 6px; font-size: 11px;">${attempts} спроб</span></div>
                  <div style="font-size: 12px; color: var(--text-dim);">${escapeHtml(formatDate(student.updated_at)).replace(" ", "<br>")}</div>
                  <div style="display:flex; justify-content:flex-end; align-items:center; gap:8px;">
  ${risky ? `<i class="ri-alarm-warning-fill" style="color: var(--warn); font-size: 18px;"></i>` : `<i class="ri-arrow-right-s-line" style="color: var(--text-dim); font-size: 20px;"></i>`}

  <button
    type="button"
    class="teacher-btn teacher-btn--ghost teacher-btn--small teacher-btn--danger"
    data-student-remove="${escapeHtml(student.id)}"
    title="Видалити учня з класу"
    style="padding: 4px 8px;"
  >
    <i class="ri-user-unfollow-line"></i>
  </button>
</div>
                </article>
              `;
              })
              .join("")}
          </div>
        `
    }
  `;
    }

    function renderListView() {
      const classesCount = ctx.teacherClasses.length;

      return `
    <section class="teacher-panel">
      <section class="teacher-card teacher-classes-hero">
        <div class="teacher-classes-hero__main">
         <div class="teacher-classes-hero__eyebrow">КЛАСИ</div>
<h3 class="teacher-classes-hero__title">Керування класами</h3>
<p class="teacher-classes-hero__sub">
  Створи новий клас або відкрий існуючий, щоб працювати з учнями.
</p>
        </div>

        <div class="teacher-classes-hero__actions">
          <div class="teacher-classes-hero__stat">
            <span>Класів</span>
            <b>${classesCount}</b>
          </div>

          <button
            type="button"
            id="teacherOpenCreateClassBtn"
            class="teacher-btn teacher-btn--primary"
          >
            <i class="ri-add-line"></i>
            Створити новий клас
          </button>
        </div>
      </section>

      <section class="teacher-card">
        <div class="teacher-card__head">
          <div>
            <h4>Список класів</h4>
            <p class="teacher-muted">Натисни на клас, щоб відкрити його сторінку</p>
          </div>
        </div>

        ${renderClassesList()}
      </section>

    </section>
  `;
    }

    function renderDetailsView() {
      const cls = getActiveClass();
      const stats = calcClassStats(ctx.activeStudents);

      if (!cls) {
        return `
      <section class="teacher-panel">
        <section class="teacher-card">
          <div class="teacher-empty">Клас не знайдено.</div>
        </section>
      </section>
    `;
      }

      // Перевіряємо, чи є учні, яким потрібна допомога
      const hasRiskyStudents = stats.needHelp > 0;

      return `
  <div class="teacher-shell">
    
    <div class="teacher-dashboard-hero" style="margin-bottom: 20px;">
      <div class="teacher-dashboard-hero__main">
        <button class="teacher-btn teacher-btn--ghost teacher-btn--small" id="teacherBackToClassesBtn" style="margin-bottom: 16px; padding-left: 0; color: var(--text-dim);">
          <i class="ri-arrow-left-line"></i> Назад до списку
        </button>
        
        <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 12px;">
          <div class="class-icon-bg" style="background: rgba(14, 165, 233, 0.15); color: var(--primary); padding: 14px; border-radius: 14px;">
            <i class="ri-group-fill" style="font-size: 28px;"></i>
          </div>
          <div>
            <div class="teacher-shell__eyebrow">КЕРУВАННЯ КЛАСОМ</div>
            <h2 class="teacher-dashboard-hero__title" style="margin: 0;">${escapeHtml(cls.name)}</h2>
          </div>
        </div>
        
        <div class="teacher-dashboard-hero__actions">
          <button class="teacher-btn teacher-btn--primary" data-open-assignments-class="${escapeHtml(cls.code)}">
            <i class="ri-add-line"></i> Видати завдання
          </button>
          <button type="button" id="teacherOpenClassSettingsBtn" class="teacher-btn teacher-btn--ghost">
            <i class="ri-settings-3-line"></i> Налаштування
          </button>
        </div>
      </div>

      <div class="teacher-dashboard-hero__side" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; align-content: center;">
        <div class="teacher-dashboard-mini-stat">
          <div class="teacher-dashboard-mini-stat__label" style="font-size: 11px;">Учнів</div>
          <div class="teacher-dashboard-mini-stat__value" style="font-size: 20px;">${stats.count}</div>
        </div>
        <div class="teacher-dashboard-mini-stat">
          <div class="teacher-dashboard-mini-stat__label" style="font-size: 11px;">Середній XP</div>
          <div class="teacher-dashboard-mini-stat__value" style="font-size: 20px;">${stats.avgXp}</div>
        </div>
        <div class="teacher-dashboard-mini-stat" style="border-left-color: var(--accent);">
          <div class="teacher-dashboard-mini-stat__label" style="font-size: 11px;">Лідер класу</div>
          <div class="teacher-dashboard-mini-stat__value" style="font-size: 14px; color: var(--accent); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${escapeHtml(stats.topName)}">
            ${escapeHtml(stats.topName) || "—"}
          </div>
        </div>
        <div class="teacher-dashboard-mini-stat ${stats.needHelp > 0 ? "teacher-dashboard-mini-stat--warn" : ""}">
          <div class="teacher-dashboard-mini-stat__label" style="font-size: 11px;">Відстають</div>
          <div class="teacher-dashboard-mini-stat__value" style="font-size: 20px;">${stats.needHelp}</div>
        </div>
      </div>
    </div>

    <details class="premium-access-details" style="margin-bottom: 20px; border: 1px solid rgba(139, 92, 246, 0.2); background: rgba(139, 92, 246, 0.05); border-radius: 14px;">
      <summary style="padding: 12px 20px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; list-style: none; font-weight: 600; color: var(--accent);">
        <div style="display: flex; align-items: center; gap: 10px;">
          <i class="ri-lock-unlock-line"></i>
          <span>Швидке керування доступами (для всього класу)</span>
        </div>
        <i class="ri-arrow-down-s-line chevron"></i>
      </summary>
      <div id="teacherClassAccessBlock" style="padding: 0 20px 20px;">
        ${renderClassAccessBlock(cls)}
      </div>
    </details>

    ${
      hasRiskyStudents
        ? `
      <section class="teacher-card" style="margin-bottom: 20px; border-color: rgba(245, 158, 11, 0.3);">
        <div class="teacher-card__head" style="margin-bottom: 12px;">
          <h4 style="margin: 0; color: var(--warn); display: flex; align-items: center; gap: 8px;">
            <i class="ri-alarm-warning-line"></i> Потребують уваги
          </h4>
          <p class="teacher-muted" style="margin-top: 4px;">Учні, що відстають або мають багато невдалих спроб</p>
        </div>
        
        <style>
          #horizontalHelpList .teacher-help-compact-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
            gap: 12px;
          }
        </style>
        
        <div id="horizontalHelpList">
          ${renderNeedHelpBlock({ compact: true, limit: 6 })}
        </div>
      </section>
    `
        : ""
    }

    <section class="teacher-card" style="width: 100%;">
      <div class="teacher-card__head" style="margin-bottom: 10px;">
        <h4 style="margin: 0; display: flex; align-items: center; gap: 8px;">
          <i class="ri-group-line" style="color: var(--primary);"></i> Всі учні класу
        </h4>
      </div>
      ${renderStudentsTable()}
    </section>

  </div>
  `;
    }

    return { renderListView, renderDetailsView };
  }

  return { create };
})();
