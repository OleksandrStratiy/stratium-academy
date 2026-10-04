window.App = window.App || {};

window.App.sidebar = (function () {
  "use strict";

  function create(deps) {
    const {
      $,
      DB,
      goto,
      routeParse,
      openSettings,
      visibleTaskRefs,
      uid,
      completionState,
      moduleProgress,
      escapeHtml,
      state,
      canOpenModule,
      canOpenTask,
      toast
    } = deps;

    function isRoute(name) {
      const p = routeParse();
      return (p[0] || "home") === name;
    }

    function renderSidebarHome() {
      const sb = $("sidebarContent");
      if (!sb) return;

      // 1. Генеруємо бейдж ролі та кнопку вчителя
      let roleBadge = "";
      let teacherBtn = "";
      
      if (state && state.user) {
        if (state.user.role === "teacher") {
          roleBadge = `<div style="background: rgba(139,92,246,0.15); color: #c4b5fd; border: 1px solid rgba(139,92,246,0.3); padding: 4px 10px; border-radius: 8px; font-size: 11px; font-weight: 800; display: inline-block; margin-bottom: 16px;">👨‍🏫 Вчитель</div>`;
          teacherBtn = `
            <button class="menu-btn ${isRoute("teacher") ? "active" : ""}" data-nav="teacher" style="color: #c4b5fd;">
              <i class="ri-dashboard-3-line"></i> Кабінет Вчителя
            </button>
          `;
        } else if (state.user.role === "student") {
          roleBadge = `<div style="background: rgba(14,165,233,0.15); color: #bae6fd; border: 1px solid rgba(14,165,233,0.3); padding: 4px 10px; border-radius: 8px; font-size: 11px; font-weight: 800; display: inline-block; margin-bottom: 16px;">🎒 Учень ${state.user.class_code ? `(${escapeHtml(state.user.class_code)})` : ""}</div>`;
        } else {
          roleBadge = `<div style="background: rgba(255,255,255,0.05); color: var(--text-dim); border: 1px solid var(--border); padding: 4px 10px; border-radius: 8px; font-size: 11px; font-weight: 800; display: inline-block; margin-bottom: 16px;">💻 Локально</div>`;
        }
      }

      // 2. Рендеримо HTML сайдбару
      sb.innerHTML = `
        <div style="padding: 0 10px; text-align: center;">
          <div style="font-size: 16px; font-weight: 900; color: var(--text); margin-bottom: 4px;">${escapeHtml(state?.user?.name || "Гість")}</div>
          ${roleBadge}
        </div>

        <button class="menu-btn ${isRoute("home") ? "active" : ""}" data-nav="home">
          <i class="ri-home-4-line"></i> Головна
        </button>
        ${teacherBtn}
        <button class="menu-btn ${isRoute("leaderboard") ? "active" : ""}" data-nav="leaderboard">
          <i class="ri-trophy-line"></i> Рейтинг
        </button>
        <button class="menu-btn" data-nav="settings">
          <i class="ri-settings-3-line"></i> Налаштування
        </button>
      `;

      // 3. Вішаємо обробники подій
      sb.querySelectorAll("[data-nav]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const to = btn.getAttribute("data-nav");
          if (to === "home") goto("/home");
          if (to === "leaderboard") goto("/leaderboard");
          if (to === "teacher") goto("/teacher");
          if (to === "settings") if(openSettings) openSettings();
        });
      });
    }

// ... далі твій старий код (renderSidebarModulesOnly і т.д.)

    function renderSidebarModulesOnly(courseId) {
      const sb = $("sidebarContent");
      if (!sb) return;

      const course = DB.find((c) => c.id === courseId);
      if (!course) {
        renderSidebarHome();
        return;
      }

      const sortedModules = [...(course.modules || [])].sort((a, b) => (a.order || 999) - (b.order || 999));

      sb.innerHTML = `
        <button class="menu-btn" data-nav="home">
          <i class="ri-home-4-line"></i> Головна
        </button>

        <div style="margin:12px 0 8px; padding:0 10px; color:var(--text-dim); font-size:12px; font-weight:900;">
          МОДУЛІ
        </div>

        <button class="menu-btn" data-course-level="${course.id}">
          <i class="ri-equalizer-line"></i> Рівень курсу
        </button>

        ${sortedModules.map((m) => {
          const unlocked = typeof canOpenModule === "function" ? canOpenModule(course.id, m.id) : true;
          return `
            <button class="menu-btn ${unlocked ? "" : "locked"}" data-open-module="${course.id}|${m.id}" data-locked="${unlocked ? "0" : "1"}" style="${unlocked ? "" : "opacity:.55;"}">
              <i class="${m.icon || "ri-folder-line"}" style="color:${m.color || "var(--text-dim)"}"></i>
              ${escapeHtml(m.title)}
              ${unlocked ? "" : `<span style="margin-left:auto;">🔒</span>`}
            </button>
          `;
        }).join("")}

        <button class="menu-btn" data-nav="leaderboard">
          <i class="ri-trophy-line"></i> Рейтинг
        </button>
        <button class="menu-btn" data-nav="settings">
          <i class="ri-settings-3-line"></i> Налаштування
        </button>
      `;

      sb.querySelectorAll("[data-course-level]").forEach((b) => {
        b.onclick = () => {
          const cid = b.getAttribute("data-course-level");
          goto(`/course/${cid}`);

          setTimeout(() => {
            document.getElementById("levelCards")
              ?.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 50);
        };
      });

      sb.querySelectorAll("[data-nav]").forEach((b) => {
        const to = b.getAttribute("data-nav");
        b.onclick = () => (to === "settings" ? openSettings() : goto(`/${to}`));
      });

      sb.querySelectorAll("[data-open-module]").forEach((b) => {
        b.onclick = () => {
          if (b.getAttribute("data-locked") === "1") {
            if (toast) toast("🔒 Спочатку відкрий попередній модуль");
            return;
          }
          const [cid, mid] = b.getAttribute("data-open-module").split("|");
          goto(`/lesson/${cid}/${mid}/0`);
        };
      });
    }

    function renderSidebarModuleTasks(courseId, moduleId, taskIdx, kindLabel) {
      const sb = $("sidebarContent");
      if (!sb) return;

      const course = DB.find((c) => c.id === courseId);
      const mod = course?.modules.find((m) => m.id === moduleId);
      if (!course || !mod) {
        renderSidebarHome();
        return;
      }

      const refs = visibleTaskRefs(courseId, moduleId);

      const tasksHtml = refs.map((ref, idx) => {
        const t = ref.t;
        const origIdx = ref.origIdx;
        const id = uid(courseId, moduleId, origIdx);

        const cs = completionState(id);
        const done = !!cs;
        const noxp = cs === "no_xp";
        const active = idx === Number(taskIdx) ? "active" : "";
        const locked = typeof canOpenTask === "function" ? !canOpenTask(courseId, moduleId, origIdx) : false;
        const icon = locked
          ? "ri-lock-line"
          : (done ? "ri-checkbox-circle-fill" : "ri-checkbox-blank-circle-line");
        const extraCls = `${done ? "done" : ""} ${noxp ? "noxp" : ""}`;

        const tag = locked
          ? `<span class="task-tag" style="background:rgba(239,68,68,.14); color:#fca5a5;">Закрито</span>`
          : (t.kind && t.kind !== "practice"
              ? `<span class="task-tag exam">${escapeHtml(kindLabel(t.kind))}</span>`
              : (noxp ? `<span class="task-tag noxp">Без XP</span>` : ""));

        return `
          <div class="task-link ${active} ${extraCls}" data-open-task="${courseId}|${moduleId}|${idx}" data-locked="${locked ? "1" : "0"}" style="${locked ? "opacity:.55;" : ""}">
            <div class="left">
              <i class="${icon}"></i>
              <span>${escapeHtml(t.title)}</span>
            </div>
            ${tag}
          </div>
        `;
      }).join("");

      const mp = moduleProgress(courseId, moduleId);
      const pct = mp.total ? Math.round((mp.done / mp.total) * 100) : 0;

      sb.innerHTML = `
        <button class="menu-btn" data-nav="modules">
          <i class="ri-arrow-left-line"></i> До модулів
        </button>

        <div style="margin:12px 0 8px; padding:0 10px; color:var(--text-dim); font-size:12px; font-weight:900;">
          ${escapeHtml(course.title.toUpperCase())} • ${escapeHtml(mod.title.toUpperCase())}
        </div>

        <div style="padding:0 10px 12px;">
          <div class="progress-line"><div class="progress-fill" style="width:${pct}%"></div></div>
          <div class="tiny mutedish" style="text-align:right;margin-top:6px;">
            ${mp.done}/${mp.total} • ${pct}%
          </div>
        </div>

        <div class="task-list-container open" style="display:block;">
          ${tasksHtml || `<div style="padding:10px;color:var(--text-dim)">Немає завдань для цього рівня.</div>`}
        </div>

        <div style="margin-top:10px; padding:0 10px;">
          <button class="menu-btn" data-nav="leaderboard">
            <i class="ri-trophy-line"></i> Рейтинг
          </button>
          <button class="menu-btn" data-nav="settings">
            <i class="ri-settings-3-line"></i> Налаштування
          </button>
        </div>
      `;

      sb.querySelectorAll("[data-open-task]").forEach((el) => {
        el.addEventListener("click", () => {
          if (el.getAttribute("data-locked") === "1") {
            if (toast) toast("🔒 Це завдання тимчасово заблоковане");
            return;
          }
          const [cid, mid, i] = el.getAttribute("data-open-task").split("|");
          goto(`/lesson/${cid}/${mid}/${i}`);
        });
      });

      sb.querySelectorAll("[data-nav]").forEach((el) => {
        const to = el.getAttribute("data-nav");
        if (to === "modules") el.onclick = () => goto(`/course/${courseId}`);
        else if (to === "settings") el.onclick = openSettings;
        else el.onclick = () => goto(`/${to}`);
      });
    }

    return {
      isRoute,
      renderSidebarHome,
      renderSidebarModulesOnly,
      renderSidebarModuleTasks
    };
  }

  return { create };
})();
