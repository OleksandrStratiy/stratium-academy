/* ===========================
   Python Academy LMS (Vanilla SPA) — Refactor 2026
   Fixes / Upgrades:
   - Robust stdout normalization (dash/apostrophe/quotes/NBSP/newlines)
   - Honest code checks (strip strings/comments)
   - Terminal report: Output + Tests + hints + whitespace visualization
   - Spoiled (no XP) only when user clicks "Show solution"
   - Attempts logic: after 10 fails -> solution becomes available (not auto-spoiled)
   - MiniPy: safer expression parsing + consistent stdout
=========================== */

(function () {
  "use strict";

    // ===========================
  // Supabase (Auth + Cloud Save)
  // ===========================
  // ВАЖЛИВО: тут має бути твій SUPABASE_URL і твій sb_publishable ключ
  const SUPABASE_URL = "https://jxupcqlidaozazbwxpxp.supabase.co";
  const SUPABASE_ANON_KEY = "sb_publishable_joFcOKBLVWXy3SVSkTHuXg_ZpezeivF";

  const supa = (window.supabase && SUPABASE_URL.includes("supabase.co"))
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

  async function signInWithGoogle() {
    if (!supa) throw new Error("Supabase client not configured");
    const redirectTo = window.location.origin + window.location.pathname;

    const { error } = await supa.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });

    if (error) throw error;
  }

  async function getSessionUser() {
    if (!supa) return null;
    const { data: { session } } = await supa.auth.getSession();
    return session?.user || null;
  }

  async function cloudLoadState(userId) {
    const { data, error } = await supa
      .from("progress")
      .select("state")
      .eq("user_id", userId)
      .maybeSingle();
    if (error) throw error;
    return data?.state ?? null;
  }

  async function cloudSaveState(userId, fullState) {
    const { error } = await supa
      .from("progress")
      .upsert({ user_id: userId, state: fullState, updated_at: new Date().toISOString() });
    if (error) throw error;
  }

  let cloudTimer = null;
  function scheduleCloudSync(getStateFn) {
    if (!supa) return;
    clearTimeout(cloudTimer);
    cloudTimer = setTimeout(async () => {
      try {
        const user = await getSessionUser();
        if (!user) return;
        await cloudSaveState(user.id, getStateFn());
      } catch (e) {
  console.error("Supabase load/save error:", e);
  // fallback: якщо Google user є — створимо локального юзера, щоб не показувало overlay
  if (!state.user) {
    const name =
      user.user_metadata?.full_name ||
      user.email?.split("@")?.[0] ||
      "User";
    state.user = { name, xp:0, streak:1, lastDay:null, completed:{}, attempts:{}, spoiled:{}, drafts:{} };
    save();
  }
}
    }, 900);
  }
  

  // ===========================
  // DOM helpers
  // ===========================
  const $ = (id) => document.getElementById(id);

  function on(el, evt, fn) {
    if (!el) return;
    el.addEventListener(evt, fn);
  }

  // ===========================
  // Toast
  // ===========================
  function toast(msg) {
    const el = $("toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove("show"), 2200);
  }

  // ===========================
  // Sound + confetti
  // ===========================
  let audioCtx = null;
  function playSuccessSound(enabled) {
    if (!enabled) return;
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const ac = audioCtx;
      const o = ac.createOscillator();
      const g = ac.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(520, ac.currentTime);
      o.frequency.exponentialRampToValueAtTime(980, ac.currentTime + 0.12);
      g.gain.setValueAtTime(0.001, ac.currentTime);
      g.gain.exponentialRampToValueAtTime(0.20, ac.currentTime + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.22);
      o.connect(g);
      g.connect(ac.destination);
      o.start();
      o.stop(ac.currentTime + 0.24);
    } catch {}
  }

  function fireConfetti() {
    if (typeof confetti === "function") {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.65 } });
    }
  }

  // ===========================
  // Dates / streak
  // ===========================
  function todayISO() {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  function updateStreak(user) {
    const t = todayISO();
    const last = user.lastDay || null;
    if (!last) {
      user.streak = 1;
      user.lastDay = t;
      return;
    }
    if (last === t) return;

    const lastDate = new Date(last + "T00:00:00");
    const nowDate = new Date(t + "T00:00:00");
    const diffDays = Math.round((nowDate - lastDate) / (1000 * 60 * 60 * 24));

    user.streak = diffDays === 1 ? (user.streak || 1) + 1 : 1;
    user.lastDay = t;
  }

  // ===========================
  // Level
  // ===========================
  function levelFromXp(xp) {
    let level = 1;
    let threshold = 200;
    let remaining = xp;
    while (remaining >= threshold) {
      remaining -= threshold;
      level += 1;
      threshold = Math.floor(threshold * 1.25);
    }
    return { level, inLevelXp: remaining, nextLevelXp: threshold };
  }

    // ===========================
    // Storage
    // ===========================
    const KEY = "py_lms_smart_v3_refactor";

    const defaultState = {
      user: null,
      settings: { sound: true, theme: "dark" },
      leaderboard: (typeof LEADERBOARD_SEED !== "undefined" ? LEADERBOARD_SEED.slice(0) : []),

      // NEW: обрані рівні для курсів
      courseLevels: {} // наприклад: { "python_basics": "rookie" }
    };

    function load() {
      try {
        const raw = localStorage.getItem(KEY);
        return raw ? JSON.parse(raw) : null;
      } catch {
        return null;
      }
    }

    let state = load() || structuredClone(defaultState);

  function save() {
    localStorage.setItem(KEY, JSON.stringify(state));
    // онлайн-синхронізація (тихо, з паузою)
    scheduleCloudSync(() => state);
  }

    function resetAll() {
      localStorage.removeItem(KEY);
    }

    function safeB64Encode(obj) {
      return btoa(encodeURIComponent(JSON.stringify(obj)));
    }
    function safeB64Decode(b64) {
      return JSON.parse(decodeURIComponent(atob((b64 || "").trim())));
    }

    // ===========================
    // Routing
    // ===========================
    function routeParse() {
      const raw = (location.hash || "#/home").slice(1);
      return raw.split("/").filter(Boolean);
    }
    function goto(hash) {
      location.hash = hash.startsWith("#") ? hash : ("#" + hash);
    }

    // ===========================
    // Theme
    // ===========================
  function applyTheme(theme) {
    const t = theme === "light" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", t);
    state.settings.theme = t;

    const icon = $("uiThemeIcon");
    if (icon) icon.className = (t === "light") ? "ri-moon-line" : "ri-sun-line";
  }

  function toggleTheme() {
    const next = (state.settings.theme === "light") ? "dark" : "light";
    applyTheme(next);
    save(); // ← ТУТ ЗБЕРІГАЄМО, бо користувач реально змінив тему
    toast(next === "light" ? "🌞 Світла тема" : "🌙 Темна тема");
  }

    // ===========================
    // Views refs
    // ===========================
    const authOverlay = $("authOverlay");
    const settingsOverlay = $("settingsOverlay");

    const viewHome = $("view-home");
    const viewModules = $("view-modules");
    const viewLesson = $("view-lesson");
    const viewLeaderboard = $("view-leaderboard");

    function setActiveView(which) {
      [viewHome, viewModules, viewLesson, viewLeaderboard].forEach(v => v && v.classList.remove("active"));
      if (which) which.classList.add("active");
    }

    // ===========================
    // Misc helpers
    // ===========================
    function escapeHtml(s) {
      return String(s).replace(/[&<>"']/g, (c) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }[c]));
    }

    // ===========================
  // Course difficulty (Rookie / Adept / Master)
  // ===========================
  const LEVELS = [
    { id: "rookie",  title: "🟢 Junior",  desc: "Легкий старт, базові задачі" },
    { id: "adept",   title: "🟡 Middle",  desc: "Середній рівень, більше логіки" },
    { id: "master",  title: "🔴 Senior",  desc: "Складні задачі та підводні камені" },
  ];

  function getCourseLevel(courseId) {
    return state.courseLevels?.[courseId] || null;
  }

  function setCourseLevel(courseId, levelId) {
    state.courseLevels = state.courseLevels || {};
    state.courseLevels[courseId] = levelId;
    save();
  }

  // task.difficulty: "rookie" | "adept" | "master" | "all"
  function visibleTaskRefs(courseId, moduleId) {
    const course = DB.find(c => c.id === courseId);
    const mod = course?.modules.find(m => m.id === moduleId);
    if (!course || !mod) return [];

    const lvl = getCourseLevel(courseId) || "rookie";

    return (mod.tasks || [])
      .map((t, idx) => ({ t, origIdx: idx }))
      .filter(r => {
        const d = r.t.difficulty || "rookie";
        return d === "all" || d === lvl;
      });
  }

  // ===========================
  // Current pointers
  // ===========================
  let currentCourse = null;
  let currentModule = null;
  let currentTaskIndex = 0;

  // ===========================
  // User UI
  // ===========================
  function showAuth() { authOverlay && authOverlay.classList.add("active"); }
  function hideAuth() { authOverlay && authOverlay.classList.remove("active"); }

function updateUserUI() {
  if (!state.user) return;

  // перевіримо, чи streak змінився
  const beforeLastDay = state.user.lastDay;
  const beforeStreak = state.user.streak;

  updateStreak(state.user);

  const streakChanged =
    beforeLastDay !== state.user.lastDay ||
    beforeStreak !== state.user.streak;

  $("uiName").innerText = state.user.name;
  $("uiAvatar").innerText = (state.user.name[0] || "U").toUpperCase();
  $("uiXP").innerText = `${state.user.xp} XP`;
  $("uiStreak").innerText = String(state.user.streak || 1);

  const lvl = levelFromXp(state.user.xp || 0);
  $("uiLevel").innerText = `Level ${lvl.level}`;
  $("uiLevelXP").innerText = `${lvl.inLevelXp}/${lvl.nextLevelXp} XP`;
  $("uiLevelFill").style.width = `${Math.round((lvl.inLevelXp / lvl.nextLevelXp) * 100)}%`;

  const hx = $("homeTotalXP"); if (hx) hx.textContent = String(state.user.xp || 0);
  const hs = $("homeStreak"); if (hs) hs.textContent = String(state.user.streak || 1);

  // зберігаємо тільки якщо streak реально змінився
  if (streakChanged) save();
}

  // ===========================
  // Progress helpers
  // ===========================
  function uid(courseId, moduleId, idx) {
    return `${courseId}_${moduleId}_${idx}`;
  }

  function completionState(id) {
    return state.user?.completed?.[id] || null; // "xp" | "no_xp"
  }

  function setCompleted(id, mode) {
    state.user.completed = state.user.completed || {};
    state.user.completed[id] = mode;
    save();
  }

  function isDone(courseId, moduleId, idx) {
    const id = uid(courseId, moduleId, idx);
    return !!completionState(id);
  }

  function getAttempts(id) {
    return Number(state.user?.attempts?.[id] || 0);
  }

  function incAttempts(id) {
    state.user.attempts = state.user.attempts || {};
    state.user.attempts[id] = getAttempts(id) + 1;
    save();
    return state.user.attempts[id];
  }

  function isSpoiled(id) { return !!state.user?.spoiled?.[id]; }
  function setSpoiled(id) {
    state.user.spoiled = state.user.spoiled || {};
    state.user.spoiled[id] = true;
    save();
  }

  function getDraft(id) { return state.user?.drafts?.[id] ?? ""; }
  function setDraft(id, code) {
    state.user.drafts = state.user.drafts || {};
    state.user.drafts[id] = code;
    save();
  }

  function courseProgress(course) {
    let total = 0, done = 0;
    const lvl = getCourseLevel(course.id) || "rookie";

    course.modules.forEach(m => {
      (m.tasks || []).forEach((t, idx) => {
        const d = t.difficulty || "rookie";
        if (!(d === "all" || d === lvl)) return;
        total++;
        if (isDone(course.id, m.id, idx)) done++;
      });
    });

    const pct = total ? Math.round((done / total) * 100) : 0;
    return { total, done, pct };
  }

  function moduleProgress(courseId, moduleId) {
    const tasks = getModuleTasks(courseId, moduleId);
    if (!tasks.length) return { done: 0, total: 0 };
  
    let done = 0;
    tasks.forEach((t, idx) => {
      if (isDone(courseId, moduleId, idx)) done++;
    });
    return { done, total: tasks.length };
  }

  function isModuleCompleted(courseId, moduleId) {
    const mp = moduleProgress(courseId, moduleId);
    return mp.total > 0 && mp.done === mp.total;
  }

  function getModuleTasks(courseId, moduleId) {
    const course = DB.find(c => c.id === courseId);
    const mod = course?.modules.find(m => m.id === moduleId);
    if (!course || !mod) return [];
  
    // Старий формат: tasks = [{...}, {...}]
    if (Array.isArray(mod.tasks)) return mod.tasks;
  
    // Новий формат приклад: taskRefs = ["t_print_1", "t_print_2"]
    // і глобальний словник TASKS = { id: taskObj }
    if (Array.isArray(mod.taskRefs) && typeof TASKS === "object") {
      return mod.taskRefs.map(id => TASKS[id]).filter(Boolean);
    }
  
    return [];
  }

  function calculateBonuses({ baseXp, attemptsBefore, taskId }) {
    let sniper = 0;
    let speed = 0;
    let streakBonus = 0;
  
    // 🎯 Sniper
    if (attemptsBefore === 0) {
      sniper = Math.round(baseXp * 0.2);
    }
  
    // ⚡ Speedrun
    const session = state.user.taskSession;
    if (session && session.id === taskId) {
      const elapsedSec = (Date.now() - session.startedAt) / 1000;
  
      let limit = 180; // rookie
      if (getCourseLevel && state.courseLevels) {
        const level = Object.values(state.courseLevels)[0];
        if (level === "adept") limit = 240;
        if (level === "master") limit = 360;
      }
  
      if (elapsedSec <= limit) {
        speed = Math.round(baseXp * 0.1);
      }
    }
  
    // 🔥 Streak
    const streak = state.user.streak || 1;
    streakBonus = Math.min(10, streak);
  
    return { sniper, speed, streakBonus };
  }

  // ===========================
  // Sidebar rendering
  // ===========================
  function isRoute(name) {
    const p = routeParse();
    return (p[0] || "home") === name;
  }

  function renderSidebarHome() {
    const sb = $("sidebarContent");
    if (!sb) return;
    sb.innerHTML = `
      <button class="menu-btn ${isRoute("home") ? "active" : ""}" data-nav="home"><i class="ri-home-4-line"></i> Головна</button>
      <button class="menu-btn ${isRoute("leaderboard") ? "active" : ""}" data-nav="leaderboard"><i class="ri-trophy-line"></i> Рейтинг</button>
      <button class="menu-btn" data-nav="settings"><i class="ri-settings-3-line"></i> Налаштування</button>
    `;
    sb.querySelectorAll("[data-nav]").forEach(btn => {
      btn.addEventListener("click", () => {
        const to = btn.getAttribute("data-nav");
        if (to === "settings") openSettings();
        else goto(`/${to}`);
      });
    });
  }

  function renderSidebarModulesOnly(courseId) {
    const sb = $("sidebarContent");
    if (!sb) return;
    const course = DB.find(c => c.id === courseId);
    if (!course) return renderSidebarHome();

    sb.innerHTML = `
      <button class="menu-btn" data-nav="home"><i class="ri-home-4-line"></i> Головна</button>
      <div style="margin:12px 0 8px; padding:0 10px; color:var(--text-dim); font-size:12px; font-weight:900;">МОДУЛІ</div>
        <button class="menu-btn" data-course-level="${course.id}">
        <i class="ri-equalizer-line"></i> Рівень курсу
      </button>
      
      ${course.modules.map(m => `
      <button class="menu-btn" data-open-module="${course.id}|${m.id}">
      <i class="${m.icon || 'ri-folder-line'}" 
      style="color:${m.color || 'var(--text-dim)'}"></i> ${escapeHtml(m.title)}
      </button>
    `).join("")}

      <button class="menu-btn" data-nav="leaderboard"><i class="ri-trophy-line"></i> Рейтинг</button>
      <button class="menu-btn" data-nav="settings"><i class="ri-settings-3-line"></i> Налаштування</button>
    `;

    sb.querySelectorAll("[data-course-level]").forEach(b => {
  b.onclick = () => {
    const cid = b.getAttribute("data-course-level");
    openLevelPicker(cid, () => renderCourseModules(cid));
  };
});

    sb.querySelectorAll("[data-nav]").forEach(b => {
      const to = b.getAttribute("data-nav");
      b.onclick = () => (to === "settings" ? openSettings() : goto(`/${to}`));
    });

    sb.querySelectorAll("[data-open-module]").forEach(b => {
      b.onclick = () => {
        const [cid, mid] = b.getAttribute("data-open-module").split("|");
        goto(`/lesson/${cid}/${mid}/0`);
      };
    });
  }

  function kindLabel(kind) {
    if (kind === "quiz") return "Контрольна";
    if (kind === "final") return "Підсумкова";
    return "Завдання";
  }

  function renderSidebarModuleTasks(courseId, moduleId, taskIdx) {
    const sb = $("sidebarContent");
    if (!sb) return;
  
    const course = DB.find(c => c.id === courseId);
    const mod = course?.modules.find(m => m.id === moduleId);
    if (!course || !mod) return renderSidebarHome();
  
    const tasks = getModuleTasks(courseId, moduleId);
  
    const tasksHtml = tasks.map((t, idx) => {
      const id = uid(courseId, moduleId, idx);
      const cs = completionState(id);
      const done = !!cs;
      const noxp = cs === "no_xp";
      const active = (idx === Number(taskIdx)) ? "active" : "";
      const icon = done ? "ri-checkbox-circle-fill" : "ri-checkbox-blank-circle-line";
      const extraCls = `${done ? "done" : ""} ${noxp ? "noxp" : ""}`;
  
      const tag = t.kind && t.kind !== "practice"
        ? `<span class="task-tag exam">${escapeHtml(kindLabel(t.kind))}</span>`
        : (noxp ? `<span class="task-tag noxp">Без XP</span>` : "");
  
      return `
        <div class="task-link ${active} ${extraCls}" data-open-task="${courseId}|${moduleId}|${idx}">
          <div class="left">
            <i class="${icon}"></i>
            <span>${idx + 1}. ${escapeHtml(t.title)}</span>
          </div>
          ${tag}
        </div>
      `;
    }).join("");
  
    // ... решту твого коду лишаємо як було
    // важливо: mp тепер коректний, бо moduleProgress вже через getModuleTasks
    const mp = moduleProgress(courseId, moduleId);
    const pct = mp.total ? Math.round((mp.done / mp.total) * 100) : 0;
  
    sb.innerHTML = `
      <button class="menu-btn" data-nav="modules"><i class="ri-arrow-left-line"></i> До модулів</button>
  
      <div style="margin:12px 0 8px; padding:0 10px; color:var(--text-dim); font-size:12px; font-weight:900;">
        ${escapeHtml(course.title.toUpperCase())} • ${escapeHtml(mod.title.toUpperCase())}
      </div>
  
      <div style="padding:0 10px 12px;">
        <div class="progress-line"><div class="progress-fill" style="width:${pct}%"></div></div>
        <div class="tiny mutedish" style="text-align:right;margin-top:6px;">${mp.done}/${mp.total} • ${pct}%</div>
      </div>
  
      <div class="task-list-container open" style="display:block;">
        ${tasksHtml || `<div style="padding:10px;color:var(--text-dim)">Немає завдань у цьому модулі (перевір taskRefs/tasks).</div>`}
      </div>
  
      <div style="margin-top:10px; padding:0 10px;">
        <button class="menu-btn" data-nav="leaderboard"><i class="ri-trophy-line"></i> Рейтинг</button>
        <button class="menu-btn" data-nav="settings"><i class="ri-settings-3-line"></i> Налаштування</button>
      </div>
    `;
  
    sb.querySelectorAll("[data-open-task]").forEach(el => {
      el.addEventListener("click", () => {
        const [cid, mid, idx] = el.getAttribute("data-open-task").split("|");
        goto(`/lesson/${cid}/${mid}/${idx}`);
      });
    });
  
    sb.querySelectorAll("[data-nav]").forEach(el => {
      const to = el.getAttribute("data-nav");
      if (to === "modules") el.onclick = () => goto(`/course/${courseId}`);
      else if (to === "settings") el.onclick = openSettings;
      else el.onclick = () => goto(`/${to}`);
    });
  }
  
function openCourseWithLevel(cid) {
  if (!getCourseLevel(cid)) {
    openLevelPicker(cid, () => goto(`/course/${cid}`));
  } else {
    goto(`/course/${cid}`);
  }
}

  // ===========================
  // Home / modules / leaderboard views
  // ===========================
  function renderCoursesGrid() {
    const grid = $("coursesList");
    if (!grid) return;

    grid.innerHTML = DB.map(c => {
      const p = courseProgress(c);
      return `
        <div class="card" data-open-course="${c.id}">
          <div style="font-size:34px; margin-bottom:10px">${c.icon}</div>
          <h3>${escapeHtml(c.title)}</h3>
          <p>${escapeHtml(c.desc)}</p>
          <div class="progress-line"><div class="progress-fill" style="width:${p.pct}%"></div></div>
          <div style="font-size:12px; margin-top:6px; color:var(--text-dim); text-align:right">${p.pct}%</div>
        </div>
      `;
    }).join("");

    grid.querySelectorAll("[data-open-course]").forEach(card => {
      card.addEventListener("click", () => {
        const cid = card.getAttribute("data-open-course");
        openCourseWithLevel(cid);
      });
    });
  }

  function renderHome() {
    setActiveView(viewHome);
    $("breadcrumbs").innerText = "Головна";
    renderSidebarHome();
    renderCoursesGrid();
  }

  function renderCourseModules(courseId) {
    const course = DB.find(c => c.id === courseId);
    if (!course) { toast("Курс не знайдено"); goto("/home"); return; }

    setActiveView(viewModules);
    $("breadcrumbs").innerHTML = `<span class="crumb" data-crumb-home style="cursor:pointer">Головна</span> / ${escapeHtml(course.title)}`;
    $("modulesTitle").textContent = course.title;

    // Отримуємо поточний рівень (за замовчуванням rookie)
    const currentLvl = (typeof getCourseLevel === "function" ? getCourseLevel(course.id) : null) || "rookie";

    // Генеруємо красиві картки рівнів
    const levelsHtml = LEVELS.map(l => {
      const isActive = l.id === currentLvl;
      const icon = l.title.split(" ")[0]; // Беремо смайлик (🟢, 🟡, 🔴)
      const name = l.title.split(" ")[1]; // Беремо назву (Rookie, Adept, Master)
      
      return `
        <button class="lvl-btn ${isActive ? 'active' : ''}" data-set-lvl="${l.id}">
          <div class="lvl-icon">${icon}</div>
          <div class="lvl-info">
            <div class="lvl-name">${name}</div>
            <div class="lvl-desc">${escapeHtml(l.desc)}</div>
          </div>
        </button>
      `;
    }).join("");

    // Вставляємо опис та новий віджет рівнів
    $("modulesDesc").innerHTML = `
      <p style="color: var(--text-dim); margin-bottom: 20px; font-size: 16px;">${escapeHtml(course.desc || "Обери модуль")}</p>
      
      <div class="level-selector-inline">
        <div class="level-selector-header">
          <span>🎚️ Обери складність курсу</span>
          <div class="info-tooltip">
            <i class="ri-question-line"></i>
            <div class="tooltip-text">Від рівня залежить складність завдань у модулях. Ти можеш змінити його будь-коли без втрати прогресу!</div>
          </div>
        </div>
        <div class="level-options">
          ${levelsHtml}
        </div>
      </div>
    `;

    // Вішаємо кліки на нові кнопки рівнів
    document.querySelectorAll("[data-set-lvl]").forEach(btn => {
      btn.onclick = () => {
        const newLvl = btn.getAttribute("data-set-lvl");
        if (newLvl !== currentLvl) {
          setCourseLevel(course.id, newLvl);
          renderCourseModules(course.id); // Перемальовуємо, щоб оновити прогрес-бари та активну кнопку
          toast(`Рівень змінено на ${LEVELS.find(x => x.id === newLvl).title}`);
        }
      };
    });

    // Рендер карток модулів зі збереженням твоїх іконок та кольорів
    const list = $("modulesList");
    list.innerHTML = course.modules.map(m => {
      const mp = moduleProgress(course.id, m.id);
      const pct = mp.total ? Math.round((mp.done / mp.total) * 100) : 0;
      return `
        <div class="card" data-open-module="${course.id}|${m.id}">
          <div style="font-size:28px;margin-bottom:8px">
            <i class="${m.icon || 'ri-folder-line'}" style="color:${m.color || 'var(--text-dim)'}"></i>
          </div>
          <h3>${escapeHtml(m.title)}</h3>
          <p>${escapeHtml(m.desc || "")}</p>
          <div class="progress-line"><div class="progress-fill" style="width:${pct}%"></div></div>
          <div style="font-size:12px; margin-top:6px; color:var(--text-dim); text-align:right">${pct}%</div>
        </div>
      `;
    }).join("");

    // Кліки по модулях
    list.querySelectorAll("[data-open-module]").forEach(el => {
      el.addEventListener("click", () => {
        const [cid, mid] = el.getAttribute("data-open-module").split("|");
        goto(`/lesson/${cid}/${mid}/0`);
      });
    });

    renderSidebarModulesOnly(course.id);
    document.querySelectorAll("[data-crumb-home]").forEach(el => el.onclick = () => goto("/home"));
  }

async function renderLeaderboard() {
    setActiveView(viewLeaderboard);
    $("breadcrumbs").innerText = "🏆 Рейтинг Академії";

    const listEl = $("leaderboardList");
    // Показуємо скелетон/завантаження, поки чекаємо дані з бази
    listEl.innerHTML = `<div style="text-align:center; padding: 40px 20px; color: var(--text-dim); font-weight: 700; font-size: 16px;">Завантаження рейтингу... ⏳</div>`;

    try {
      let rows = [];

      if (supa) {
        // Витягуємо весь збережений прогрес з Supabase
        const { data, error } = await supa
          .from("progress")
          .select("state");

        if (error) throw error;

        if (data) {
          // Дістаємо дані користувачів із JSON-стану
          rows = data
            .map(row => row.state?.user)
            .filter(u => u && typeof u.xp === 'number') // Відкидаємо пусті рядки
            .map(u => ({
              name: u.name || "Анонім",
              xp: u.xp || 0,
              streak: u.streak || 1
            }));
        }
      } else {
        // Fallback: якщо Supabase раптом відключений, показуємо локальні дані
        const me = state.user ? { name: state.user.name, xp: state.user.xp, streak: state.user.streak } : null;
        rows = state.leaderboard.concat(me ? [me] : []);
      }

      // Видаляємо дублікати за іменем (залишаємо той запис, де більше XP)
      const byName = new Map();
      rows.forEach(r => {
        const prev = byName.get(r.name);
        if (!prev || r.xp > prev.xp) byName.set(r.name, r);
      });

      // Сортуємо від найбільшого XP до найменшого і беремо ТОП-20
      const sortedRows = Array.from(byName.values())
        .sort((a, b) => b.xp - a.xp)
        .slice(0, 20);

      const myName = state.user?.name;

      if (sortedRows.length === 0) {
        listEl.innerHTML = `<div style="text-align:center; padding: 20px; color: var(--text-dim);">Ще немає жодного гравця. Будь першим!</div>`;
      } else {
        // Рендеримо список
        listEl.innerHTML = sortedRows.map((r, i) => {
          const isMe = r.name === myName;
          // Роздаємо медалі
          const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `<span style="color:var(--text-dim); font-size:14px;">${i + 1}.</span>`;
          
          return `
            <div class="rowBoard ${isMe ? "me" : ""}">
              <div style="display:flex; align-items:center; gap: 14px;">
                <div style="font-size: 24px; width: 34px; text-align: center;">${medal}</div>
                <div>
                  <div style="font-weight:900; font-size: 16px;">${escapeHtml(r.name)} ${isMe ? "<span style='font-size:12px; color:var(--primary);'>(Ти)</span>" : ""}</div>
                  <div class="tag">🔥 Стрік: ${r.streak} дн.</div>
                </div>
              </div>
              <div style="font-weight:900; color: ${i < 3 ? 'var(--warn)' : 'var(--primary)'}; font-size: 18px;">
                ${r.xp} XP
              </div>
            </div>
          `;
        }).join("");
      }

    } catch (err) {
      console.error("Помилка завантаження рейтингу:", err);
      listEl.innerHTML = `<div style="text-align:center; padding: 20px; color: var(--danger);">Не вдалося завантажити дані. Перевір з'єднання або налаштування Supabase.</div>`;
    }

    renderSidebarHome();
  }

  // ===========================
  // Gutter
  // ===========================
  function updateGutter() {
    const ta = $("codeEditor");
    const gutter = $("gutter");
    if (!ta || !gutter) return;
    const lines = ta.value.split("\n").length;
    let html = "";
    for (let i = 1; i <= lines; i++) html += `<div>${i}</div>`;
    gutter.innerHTML = html;
  }

  // ===========================
  // MiniPy + Smart Checker
  // ===========================
  function normalizeNewlines(s) { return String(s ?? "").replace(/\r\n/g, "\n").replace(/\r/g, "\n"); }
  function stripComment(line) { const i = line.indexOf("#"); return i >= 0 ? line.slice(0, i) : line; }
  function rstrip(s) { return s.replace(/\s+$/g, ""); }
  function lcountSpaces(s) { const m = s.match(/^ */); return m ? m[0].length : 0; }

  function splitTopLevelComma(s) {
    const out = [];
    let cur = "";
    let depth = 0;
    let q = null;
    for (let i = 0; i < s.length; i++) {
      const ch = s[i];
      if (q) {
        cur += ch;
        if (ch === q && s[i - 1] !== "\\") q = null;
        continue;
      }
      if (ch === "'" || ch === '"') { q = ch; cur += ch; continue; }
      if (ch === "(") { depth++; cur += ch; continue; }
      if (ch === ")") { depth = Math.max(0, depth - 1); cur += ch; continue; }
      if (ch === "," && depth === 0) { out.push(cur.trim()); cur = ""; continue; }
      cur += ch;
    }
    if (cur.trim()) out.push(cur.trim());
    return out;
  }

  function parseStringLiteral(tok){
  tok = tok.trim();
  const m = tok.match(/^(['"])([\s\S]*)\1$/);
  if(!m) return null;
  return m[2]
    .replace(/\\n/g,"\n")
    .replace(/\\t/g,"\t")
    .replace(/\\"/g,'"')
    .replace(/\\'/g,"'")
    .replace(/\\\\/g,"\\"); // ✅ ОЦЕ ДОДАТИ
}


  function isNumber(tok) {
    return /^-?\d+(\.\d+)?$/.test(tok.trim());
  }

  function evalExpr(expr, env) {
    expr = expr.trim();
    if (expr === "") return "";

    const s = parseStringLiteral(expr);
    if (s !== null) return s;

    if (isNumber(expr)) return Number(expr);

    if (expr === "True") return true;
    if (expr === "False") return false;

    if (/^[A-Za-z_]\w*$/.test(expr) && Object.prototype.hasOwnProperty.call(env, expr)) return env[expr];

    // comparisons
    const cmpOps = ["==", "!=", ">=", "<=", "<", ">"];
    for (const op of cmpOps) {
      const idx = expr.indexOf(op);
      if (idx > 0) {
        const a = evalExpr(expr.slice(0, idx), env);
        const b = evalExpr(expr.slice(idx + op.length), env);
        switch (op) {
          case "==": return a == b; // eslint-disable-line eqeqeq
          case "!=": return a != b; // eslint-disable-line eqeqeq
          case ">=": return a >= b;
          case "<=": return a <= b;
          case ">": return a > b;
          case "<": return a < b;
        }
      }
    }

    // safety: allow only a small set
    if (!/^[\w\s\+\-\*\/\%\(\)\.'"]+$/.test(expr)) {
      throw new Error("Недозволені символи у виразі");
    }

    // tokenization
    const tokens = [];
    let i = 0;
    while (i < expr.length) {
      const ch = expr[i];
      if (ch === " ") { i++; continue; }
      if ("()+-*/%".includes(ch)) { tokens.push(ch); i++; continue; }

      if (ch === "'" || ch === '"') {
        let j = i + 1;
        while (j < expr.length) {
          if (expr[j] === ch && expr[j - 1] !== "\\") break;
          j++;
        }
        if (j >= expr.length) throw new Error("Незакриті лапки");
        tokens.push(expr.slice(i, j + 1));
        i = j + 1;
        continue;
      }

      let j = i;
      while (j < expr.length && /[\w\.]/.test(expr[j])) j++;
      tokens.push(expr.slice(i, j));
      i = j;
    }

    const prec = { "+": 1, "-": 1, "*": 2, "/": 2, "%": 2 };
    const out = [];
    const ops = [];

    function applyOp() {
      const op = ops.pop();
      const b = out.pop();
      const a = out.pop();
      if (op === "+") {
        return out.push((typeof a === "string" || typeof b === "string") ? String(a) + String(b) : (a + b));
      }
      if (op === "-") return out.push(a - b);
      if (op === "*") return out.push(a * b);
      if (op === "/") return out.push(a / b);
      if (op === "%") return out.push(a % b);
    }

    for (let t of tokens) {
      t = t.trim();
      if (!t) continue;

      if (t === "(") { ops.push(t); continue; }
      if (t === ")") {
        while (ops.length && ops[ops.length - 1] !== "(") applyOp();
        if (!ops.length) throw new Error("Зайва )");
        ops.pop();
        continue;
      }
      if (prec[t]) {
        while (ops.length && prec[ops[ops.length - 1]] >= prec[t]) applyOp();
        ops.push(t);
        continue;
      }

      const sv = parseStringLiteral(t);
      if (sv !== null) out.push(sv);
      else if (isNumber(t)) out.push(Number(t));
      else if (/^[A-Za-z_]\w*$/.test(t)) {
        if (!Object.prototype.hasOwnProperty.call(env, t)) throw new Error(`Невідома змінна: ${t}`);
        out.push(env[t]);
      } else {
        throw new Error(`Не можу розпізнати: ${t}`);
      }
    }

    while (ops.length) {
      if (ops[ops.length - 1] === "(") throw new Error("Незакрита (");
      applyOp();
    }
    if (out.length !== 1) throw new Error("Помилка виразу");
    return out[0];
  }

  class MiniPy {
    run(code) {
      code = normalizeNewlines(code);
      const rawLines = code.split("\n").map(stripComment).map(rstrip);
      while (rawLines.length && rawLines[rawLines.length - 1].trim() === "") rawLines.pop();

      const env = {};
      let stdout = "";
      let safetySteps = 0;

      const printFn = (args, kwargs) => {
        const sep = (kwargs.sep !== undefined) ? String(kwargs.sep) : " ";
        const end = (kwargs.end !== undefined) ? String(kwargs.end) : "\n";
        const text = args.map(a => String(a)).join(sep);
        stdout += text + end;
      };

      const execBlockSimple = (start, indent, endExclusive) => {
        let i = start;
        while (i < endExclusive) {
          const line = rawLines[i];
          if (line.trim() === "") { i++; continue; }
          const ind = lcountSpaces(line);
          if (ind !== indent) throw new Error("Неправильний відступ у блоці");
          i = execStatement(i, indent);
        }
      };

      const execStatement = (i, baseIndent) => {
        if (++safetySteps > 5000) throw new Error("Занадто багато кроків (safety limit)");
        const line = rawLines[i];
        const stmt = line.trim();

        // if/else
        if (/^if\s+/.test(stmt)) {
          if (!stmt.endsWith(":")) throw new Error("if має закінчуватись ':'");
          const condExpr = stmt.slice(3, -1).trim();
          const cond = !!evalExpr(condExpr, env);

          const thenIndent = baseIndent + 4;
          const thenStart = i + 1;

          let j = thenStart;
          while (j < rawLines.length) {
            const ln = rawLines[j];
            if (ln.trim() === "") { j++; continue; }
            const ind = lcountSpaces(ln);
            if (ind < thenIndent) break;
            j++;
          }
          const thenEnd = j;

          let hasElse = false;
          let elseStart = -1;
          let elseEnd = -1;

          if (thenEnd < rawLines.length) {
            const ln = rawLines[thenEnd];
            if (lcountSpaces(ln) === baseIndent && ln.trim() === "else:") {
              hasElse = true;
              elseStart = thenEnd + 1;
              let k = elseStart;
              while (k < rawLines.length) {
                const ln2 = rawLines[k];
                if (ln2.trim() === "") { k++; continue; }
                const ind2 = lcountSpaces(ln2);
                if (ind2 < thenIndent) break;
                k++;
              }
              elseEnd = k;
            }
          }

          if (cond) execBlockSimple(thenStart, thenIndent, thenEnd);
          else if (hasElse) execBlockSimple(elseStart, thenIndent, elseEnd);

          return hasElse ? elseEnd : thenEnd;
        }

        // for in range(a,b)
        const fm = stmt.match(/^for\s+([A-Za-z_]\w*)\s+in\s+range\s*\(\s*([^,]+)\s*,\s*([^)]+)\s*\)\s*:\s*$/);
        if (fm) {
          const varName = fm[1];
          const a = Number(evalExpr(fm[2], env));
          const b = Number(evalExpr(fm[3], env));
          if (!Number.isFinite(a) || !Number.isFinite(b)) throw new Error("range(a,b): a/b мають бути числами");

          const bodyIndent = baseIndent + 4;
          const bodyStart = i + 1;

          let j = bodyStart;
          while (j < rawLines.length) {
            const ln = rawLines[j];
            if (ln.trim() === "") { j++; continue; }
            const ind = lcountSpaces(ln);
            if (ind < bodyIndent) break;
            j++;
          }
          const bodyEnd = j;

          for (let v = a; v < b; v++) {
            env[varName] = v;
            execBlockSimple(bodyStart, bodyIndent, bodyEnd);
          }
          return bodyEnd;
        }

        // assignment
        const am = stmt.match(/^([A-Za-z_]\w*)\s*=\s*(.+)$/);
        if (am) {
          env[am[1]] = evalExpr(am[2], env);
          return i + 1;
        }

        // print(...)
        const pm = stmt.match(/^print\s*\(([\s\S]*)\)\s*$/);
        if (pm) {
          const inner = pm[1].trim();
          const args = [];
          const kwargs = {};

          if (inner !== "") {
            const parts = splitTopLevelComma(inner);
            for (const part of parts) {
              const km = part.match(/^([A-Za-z_]\w*)\s*=\s*(.+)$/);
              if (km) kwargs[km[1]] = evalExpr(km[2], env);
              else args.push(evalExpr(part, env));
            }
          }
          printFn(args, kwargs);
          return i + 1;
        }

        // ignore imports
        if (/^import\s+/.test(stmt) || /^from\s+/.test(stmt)) return i + 1;

        if (stmt === "") return i + 1;
        throw new Error(`Невідома команда: ${stmt}`);
      };

      try {
        let i = 0;
        while (i < rawLines.length) {
          const line = rawLines[i];
          if (line.trim() === "") { i++; continue; }
          const ind = lcountSpaces(line);
          if (ind !== 0) throw new Error("На верхньому рівні очікується відступ 0");
          i = execStatement(i, 0);
        }
        const norm = stdout.replace(/\s+$/g, "");
        return { ok: true, stdout: norm };
      } catch (e) {
        return { ok: false, error: e.message || String(e), stdout: stdout.replace(/\s+$/g, "") };
      }
    }
  }

  // ===========================
  // Smart checker — normalization
  // ===========================
  function normalizeText(text, preset = "friendly") {
    let s = String(text ?? "");
    s = s.replace(/\r\n?/g, "\n");       // newlines
    s = s.replace(/\u00A0/g, " ");       // NBSP

    if (preset !== "strict") {
      // quotes
      s = s.replace(/[“”«»„]/g, '"').replace(/[‚]/g, "'");
      // apostrophes
      s = s.replace(/[ʼ’‘`´]/g, "'");
      // dashes/minus
      s = s.replace(/[–—−]/g, "-");
    }

    if (preset === "strict") return s;

    // trim line endings
    s = s.split("\n").map(line => line.replace(/[ \t]+$/g, "")).join("\n");

    if (preset === "soft") return s.trim();

    if (preset === "friendly") {
      s = s.split("\n").map(line => line.replace(/[ \t]{2,}/g, " ").trim()).join("\n");
      return s.trim();
    }

    if (preset === "loose") return s.replace(/\s+/g, " ").trim();
    return s.trim();
  }

  function regexTest(text, pattern, flags = "") {
    try { return new RegExp(pattern, flags).test(text); }
    catch { return false; }
  }

  function approxEqual(a, b, eps = 1e-6) {
    const na = Number(a), nb = Number(b);
    if (!Number.isFinite(na) || !Number.isFinite(nb)) return false;
    return Math.abs(na - nb) <= eps;
  }

  function countRegexMatches(text, pattern) {
    try {
      const re = new RegExp(pattern, "g");
      const m = text.match(re);
      return m ? m.length : 0;
    } catch {
      return 0;
    }
  }

  // strip strings/comments so codeIncludes/codeRegex cannot be faked
  function stripStringsAndComments(code) {
    let s = String(code ?? "");
    s = s.replace(/#.*$/gm, "");
    s = s.replace(/("""|''')[\s\S]*?\1/g, "");
    s = s.replace(/("([^"\\]|\\.)*")|('([^'\\]|\\.)*')/g, "''");
    return s;
  }

  function detectOutputIssues(gotRaw, expRaw) {
    const hints = [];
    gotRaw = String(gotRaw ?? "");
    expRaw = String(expRaw ?? "");

    const dashVariant = /[–—−]/.test(expRaw) || /[–—−]/.test(gotRaw);
    const aposVariant = /[ʼ’]/.test(expRaw) || /[ʼ’]/.test(gotRaw);
    const nbsp = expRaw.includes("\u00A0") || gotRaw.includes("\u00A0");

    // if friendly matches but raw differs -> typography issue
    if (dashVariant && normalizeText(gotRaw, "friendly") === normalizeText(expRaw, "friendly") && gotRaw !== expRaw) {
      hints.push("⚠️ Різниця лише в тире/мінусі: '-' vs '—/–'. Скопіюй символ з умови або використовуй '-' якщо дозволено.");
    }
    if (aposVariant && normalizeText(gotRaw, "friendly") === normalizeText(expRaw, "friendly") && gotRaw !== expRaw) {
      hints.push("⚠️ Різниця лише в апострофі: \"'\" vs \"ʼ/’\". Скопіюй апостроф з умови або набери інший.");
    }
    if (nbsp) {
      hints.push("⚠️ Є невидимий пробіл (NBSP). Видали пробіли й набери заново.");
    }
    return hints;
  }

  function visualizeWhitespace(s) {
    return String(s ?? "")
      .replace(/\r\n?/g, "\n")
      .replace(/ /g, "·")
      .replace(/\t/g, "⇥")
      .replace(/\n/g, "↵\n");
  }

  function runTaskTestsSmart(task, code) {
    const py = new MiniPy();
    const exec = py.run(code);
    const results = [];
    const tests = task.tests || [];
    const rawStdout = String(exec.stdout ?? "");
    const safeCode = stripStringsAndComments(code);

    for (const t of tests) {
      const type = t.type || "stdoutEquals";
      const name = t.name || type;

      // codeRegex count (global)
      if (type === "codeRegex" && t.flags === "g") {
        const cnt = countRegexMatches(safeCode, t.pattern);
        const need = t.min ?? 2;
        const pass = cnt >= need;
        results.push({ name, pass, reason: pass ? "OK" : `Потрібно мінімум ${need} співпадінь`, want: `${need}+ matches`, got: String(cnt) });
        continue;
      }

      const stdoutTypes = new Set(["stdoutEquals","stdoutOneOf","stdoutRegex","stdoutContainsLines","stdoutUnorderedLines","stdoutNumber"]);
      if (!exec.ok && stdoutTypes.has(type)) {
        results.push({ name, pass: false, reason: `Помилка виконання: ${exec.error}`, want: t.value ?? (t.values ? t.values.join(" | ") : ""), got: rawStdout });
        continue;
      }

      if (type === "stdoutEquals") {
        const normalize = t.normalize || "friendly";
        const got = normalizeText(rawStdout, normalize);
        const want = normalizeText(t.value, normalize);
        const pass = got === want;
        const hints = pass ? [] : detectOutputIssues(rawStdout, String(t.value ?? ""));
        results.push({ name, pass, reason: pass ? "OK" : "Вивід не збігається", want, got, meta: { normalize, hints, gotRaw: rawStdout, wantRaw: String(t.value ?? "") } });
        continue;
      }

      if (type === "stdoutOneOf") {
        const normalize = t.normalize || "friendly";
        const got = normalizeText(rawStdout, normalize);
        const wants = (t.values || []).map(v => normalizeText(v, normalize));
        const pass = wants.includes(got);
        results.push({ name, pass, reason: pass ? "OK" : "Вивід має бути одним із варіантів", want: wants.join(" | "), got });
        continue;
      }

      if (type === "stdoutRegex") {
        const normalize = t.normalize || "friendly";
        const got = normalizeText(rawStdout, normalize);
        const pass = regexTest(got, t.pattern, t.flags || "");
        results.push({ name, pass, reason: pass ? "OK" : "Вивід не відповідає шаблону", want: `/${t.pattern}/${t.flags || ""}`, got });
        continue;
      }

      if (type === "stdoutContainsLines") {
        const normalize = t.normalize || "friendly";
        const gotLines = (normalizeText(rawStdout, normalize) || "").split("\n").filter(Boolean);
        const need = (t.lines || []).map(x => normalizeText(x, normalize));
        const pass = need.every(line => gotLines.includes(line));
        results.push({ name, pass, reason: pass ? "OK" : "Не всі потрібні рядки знайдені", want: need.join("\\n"), got: gotLines.join("\\n") });
        continue;
      }

      if (type === "stdoutUnorderedLines") {
        const normalize = t.normalize || "friendly";
        const got = (normalizeText(rawStdout, normalize) || "").split("\n").filter(Boolean).sort();
        const want = (normalizeText(t.value, normalize) || "").split("\n").filter(Boolean).sort();
        const pass = got.length === want.length && got.every((x, i) => x === want[i]);
        results.push({ name, pass, reason: pass ? "OK" : "Рядки не збігаються (порядок не важливий)", want: want.join("\\n"), got: got.join("\\n") });
        continue;
      }

      if (type === "stdoutNumber") {
        const got = normalizeText(rawStdout, "loose");
        const pass = approxEqual(got, t.value, t.eps ?? 1e-6);
        results.push({ name, pass, reason: pass ? "OK" : "Число не збігається", want: String(t.value), got });
        continue;
      }

      // code checks (sanitized)
      if (type === "codeIncludes") {
        const pass = safeCode.includes(t.value);
        results.push({ name, pass, reason: pass ? "OK" : `У коді має бути: ${t.value}`, want: t.value, got: "" });
        continue;
      }

      if (type === "codeAll") {
        const miss = (t.values || []).filter(v => !safeCode.includes(v));
        const pass = miss.length === 0;
        results.push({ name, pass, reason: pass ? "OK" : `Додай у код: ${miss.join(", ")}`, want: (t.values || []).join(", "), got: "" });
        continue;
      }

      if (type === "codeRegex") {
        const pass = regexTest(safeCode, t.pattern, t.flags || "m");
        results.push({ name, pass, reason: pass ? "OK" : "Код не відповідає шаблону", want: `/${t.pattern}/${t.flags || "m"}`, got: "" });
        continue;
      }

      if (type === "requireIfElse") {
        const pass = /\bif\b/.test(safeCode) && /\belse\b/.test(safeCode);
        results.push({ name, pass, reason: pass ? "OK" : "Потрібно використати if та else", want: "if + else", got: "" });
        continue;
      }

      if (type === "requireForRange") {
        const pass = new RegExp(`\\brange\\s*\\(\\s*${t.start}\\s*,\\s*${t.end}\\s*\\)`).test(safeCode);
        results.push({ name, pass, reason: pass ? "OK" : `Потрібно range(${t.start}, ${t.end})`, want: `range(${t.start},${t.end})`, got: "" });
        continue;
      }

      results.push({ name, pass: true, reason: "OK", want: "", got: "" });
    }

    const allPass = results.length ? results.every(r => r.pass) : true;
    return { allPass, results, exec };
  }

  function buildTerminalReport(runResult) {
    const { exec, results } = runResult;
    const out = [];

    out.push("Python Academy • Smart Checker");
    out.push("──────────────────────────────");

    if (!exec.ok) {
      out.push("❌ Помилка виконання:");
      out.push(exec.error);
      out.push("");
    } else {
      out.push("Output:");
      out.push(exec.stdout ? exec.stdout : "(empty)");
      out.push("");
    }

    out.push("Tests:");
    for (const r of results) {
      out.push(`${r.pass ? "✅" : "❌"} ${r.name}`);
      if (!r.pass) {
        if (r.reason) out.push(`   Reason: ${r.reason}`);
        if (r.want !== undefined && String(r.want) !== "") out.push(`   Expected: ${String(r.want).slice(0, 400)}`);
        if (r.got !== undefined && String(r.got) !== "") out.push(`   Got: ${String(r.got).slice(0, 400)}`);

        const hints = r.meta?.hints || [];
        for (const h of hints) out.push(`   ${h}`);
      }
    }

    const firstStdFail = results.find(r => !r.pass && r.meta && r.meta.gotRaw !== undefined);
    if (firstStdFail) {
      out.push("");
      out.push("Diff (whitespace visible):");
      out.push("Expected:");
      out.push(visualizeWhitespace(firstStdFail.meta.wantRaw));
      out.push("Got:");
      out.push(visualizeWhitespace(firstStdFail.meta.gotRaw));
      out.push("");
      out.push(`Normalize mode: ${firstStdFail.meta.normalize}`);
    }

    return out.join("\n");
  }

  // ===========================
  // Settings modal
  // ===========================
  function openSettings() {
    if (!$("soundToggle")) return;
    $("soundToggle").checked = !!state.settings.sound;
    $("exportData").value = safeB64Encode(state);
    $("importData").value = "";
    settingsOverlay && settingsOverlay.classList.add("active");
  }

  function closeSettings() {
    settingsOverlay && settingsOverlay.classList.remove("active");
  }

function openLevelPicker(courseId, onDone) {
  const existing = document.getElementById("levelOverlay");
  if (existing) existing.remove();

  const course = DB.find(c => c.id === courseId);
  const ov = document.createElement("div");
  ov.id = "levelOverlay";
  ov.className = "overlay active";

  ov.innerHTML = `
    <div class="modal settings-modal">
      <div class="modal-head">
        <h3>🎚️ Рівень курсу: ${escapeHtml(course?.title || courseId)}</h3>
        <button class="btn-close" id="lvlClose">✕</button>
      </div>

      <div class="set-block">
        <p class="mutedish">Обери один рівень. Він визначає, які задачі відкриються у всіх модулях цього курсу.</p>
        <div class="level-grid">
          ${LEVELS.map(l => `
            <button class="level-card" data-level="${l.id}">
              <div class="level-title">${l.title}</div>
              <div class="mutedish tiny">${escapeHtml(l.desc)}</div>
            </button>
          `).join("")}
        </div>
        <div class="tiny mutedish" style="margin-top:10px;">
          Порада: задачі без поля <code>difficulty</code> автоматично вважаються <b>rookie</b>.
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(ov);

  ov.querySelector("#lvlClose").onclick = () => ov.remove();

  ov.querySelectorAll("[data-level]").forEach(btn => {
    btn.onclick = () => {
      const lvl = btn.getAttribute("data-level");
      setCourseLevel(courseId, lvl);
      toast(`Рівень: ${LEVELS.find(x => x.id === lvl)?.title || lvl}`);
      ov.remove();
      if (typeof onDone === "function") onDone();
    };
  });
}
  
  // ===========================
  // Typing effect (home)
  // ===========================
  const typingWords = [
    'print("Hello, Python Academy!")',
    'for i in range(1, 4): print(i)',
    'if x > 5: print("big")',
    'name="Оля"; print(f"Привіт, {name}!")'
  ];
  let tIndex = 0, tDir = 1, tSub = "";
  function typingTick() {
    const el = $("typedText");
    if (!el) return;
    const w = typingWords[tIndex % typingWords.length];

    if (tDir === 1) {
      tSub = w.slice(0, tSub.length + 1);
      el.textContent = tSub;
      if (tSub.length === w.length) {
        tDir = -1;
        setTimeout(typingTick, 900);
        return;
      }
      setTimeout(typingTick, 34);
    } else {
      tSub = w.slice(0, tSub.length - 1);
      el.textContent = tSub;
      if (tSub.length === 0) { tDir = 1; tIndex++; }
      setTimeout(typingTick, 20);
    }
  }

  // ===========================
  // Lesson render
  // ===========================
  function renderLesson(courseId, moduleId, taskIdx) {
    const course = DB.find(c => c.id === courseId);
    const mod = course?.modules.find(m => m.id === moduleId);
    const idx = Number(taskIdx);

    const refs = visibleTaskRefs(courseId, moduleId);
    const ref = refs[idx];

    if (!course || !mod || !ref) {
      toast("Урок не знайдено (можливо, рівень не вибрано або в цьому рівні немає задач)");
      goto(`/course/${courseId}`);
      return;
    }

    const task = ref.t;
    const origIdx = ref.origIdx;

    currentCourse = course;
    currentModule = mod;
    currentTaskIndex = idx;

    setActiveView(viewLesson);
    // Запускаємо таймер для бонусу "Швидкість"
    window.currentTaskStartTime = Date.now();

    $("breadcrumbs").innerHTML =
      `<span class="crumb" data-crumb-home style="cursor:pointer">Головна</span> / ` +
      `<span class="crumb" data-crumb-course style="cursor:pointer">${escapeHtml(course.title)}</span> / ` +
      `${escapeHtml(mod.title)}`;

    $("lessonTitle").innerText = task.title;
    $("lessonContent").innerHTML = task.theory || "";
    $("lessonTask").innerText = task.desc || "";
    $("lessonExpected").textContent = task.expected || "(немає)";

    const kind = task.kind || "practice";
    $("badgeKind").textContent = kindLabel(kind);

    const id = uid(course.id, mod.id, origIdx);
    const tries = getAttempts(id);
    $("badgeAttempts").textContent = `Спроби: ${Math.min(tries, 10)}/10`;

    $("badgeNoXP").style.display = isSpoiled(id) ? "inline-flex" : "none";

    // Запуск сесії задачі (таймер)
    state.user.taskSession = {
      id,
      startedAt: Date.now()
    };
    save();
    // hint
    $("hintBox").innerText = task.hint || "";
    $("hintBox").style.display = "none";
    $("btnHint").style.opacity = task.hint ? "1" : "0.5";
    $("btnHint").style.pointerEvents = task.hint ? "auto" : "none";

    // solution availability + button behavior
    const solBox = $("solutionBox");
    const solPre = $("solutionPre");
    const btnShowSol = $("btnShowSolution");

    const available = tries >= 10;
    const spoiled = isSpoiled(id);

    if (spoiled) {
      solBox.style.display = "block";
      solPre.textContent = task.solution || task.hint || "# (немає рішення)";
      if (btnShowSol) btnShowSol.style.display = "none";
    } else if (available) {
      solBox.style.display = "block";
      solPre.textContent = "Рішення доступне після 10 спроб. Натисни кнопку нижче, щоб відкрити (буде без XP).";
      if (btnShowSol) btnShowSol.style.display = "inline-flex";
    } else {
      solBox.style.display = "none";
      if (btnShowSol) btnShowSol.style.display = "none";
    }

    if (btnShowSol) {
      btnShowSol.onclick = () => {
        setSpoiled(id);
        $("badgeNoXP").style.display = "inline-flex";
        solPre.textContent = task.solution || task.hint || "# (немає рішення)";
        btnShowSol.style.display = "none";
        toast("🧩 Рішення відкрито — ця задача буде без XP");
      };
    }

    // exam warning (no locks)
    const warn = $("examWarnBox");
    const isExam = (kind === "quiz" || kind === "final");
    const moduleDone = isModuleCompleted(courseId, moduleId);
    if (isExam && !moduleDone) {
      const mp = moduleProgress(courseId, moduleId);
      warn.style.display = "block";
      warn.innerHTML = `⚠️ <b>${escapeHtml(kindLabel(kind))}</b>: у модулі ще не виконані всі завдання (${mp.done}/${mp.total}). 
      Ти можеш проходити зараз, але рекомендовано спочатку завершити модуль.`;
    } else {
      warn.style.display = "none";
    }

    // editor / terminal init
    const editor = $("codeEditor");
    const terminal = $("terminal");
    const status = $("termStatus");
    if (status) status.textContent = "Ready";
    if (terminal) terminal.textContent = ">>> Ready...";

    // draft load + saved badge
    const draft = getDraft(id);
    editor.value = draft || "";
    updateGutter();

    const savedBadge = $("badgeSaved");
    if (savedBadge) {
      savedBadge.textContent = draft ? "Saved" : "Not saved";
      savedBadge.style.opacity = draft ? "1" : ".75";
    }

    // autosave debounce
    clearTimeout(editor._autosaveTimer);
    editor.oninput = () => {
      updateGutter();
      if (savedBadge) { savedBadge.textContent = "Saving..."; savedBadge.style.opacity = "1"; }
      clearTimeout(editor._autosaveTimer);
      editor._autosaveTimer = setTimeout(() => {
        setDraft(id, editor.value);
        if (savedBadge) { savedBadge.textContent = "Saved"; savedBadge.style.opacity = "1"; }
      }, 350);
    };

    // Tab + Ctrl/Meta+Enter
    editor.onkeydown = function (e) {
      if (e.key === "Tab") {
        e.preventDefault();
        const s = editor.selectionStart;
        editor.value = editor.value.substring(0, s) + "    " + editor.value.substring(editor.selectionEnd);
        editor.selectionEnd = s + 4;
        updateGutter();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        $("btnRun").click();
      }
    };

    // buttons
    $("btnClear").onclick = () => {
      if (!confirm("Очистити редактор?")) return;
      editor.value = "";
      updateGutter();
      setDraft(id, "");
      if (savedBadge) savedBadge.textContent = "Not saved";
      if (terminal) terminal.textContent = ">>> Cleared.";
      toast("🧼 Очищено");
    };

    $("btnHint").onclick = () => {
      const hb = $("hintBox");
      hb.style.display = hb.style.display === "block" ? "none" : "block";
    };

    $("btnPrev").onclick = () => {
      if (idx > 0) goto(`/lesson/${course.id}/${mod.id}/${idx - 1}`);
      else goto(`/course/${course.id}`);
    };

    $("btnNext").onclick = () => {
      if (!$("btnNext").classList.contains("unlocked")) return;
      if (idx < refs.length - 1) goto(`/lesson/${course.id}/${mod.id}/${idx + 1}`);
      else goto(`/course/${course.id}`);
    };

    // unlock next if already completed
    $("btnNext").classList.remove("unlocked");
    if (completionState(id)) $("btnNext").classList.add("unlocked");

    // RUN
    $("btnRun").onclick = () => {
      const code = editor.value;
      const run = runTaskTestsSmart(task, code);

      if (terminal) terminal.textContent = buildTerminalReport(run);

      // ==============================
      // FAIL (Помилка виконання або не пройдені тести)
      // ==============================
      if (!run.allPass) {
        const alreadyDone = !!completionState(id);
        if (!alreadyDone) {
          const n = incAttempts(id);
          $("badgeAttempts").textContent = `Спроби: ${Math.min(n, 10)}/10`;

          if (n >= 10 && !isSpoiled(id)) {
            // solution becomes available, but NOT spoiled until click
            if (solBox) {
              solBox.style.display = "block";
              solPre.textContent = "Рішення доступне після 10 спроб. Натисни кнопку, щоб відкрити (буде без XP).";
              if (btnShowSol) btnShowSol.style.display = "inline-flex";
            }
            toast("🧩 Рішення стало доступним після 10 спроб");
          } else {
            toast("❌ Не всі тести пройдені");
          }
        } else {
          toast("❌ Не всі тести пройдені");
        }
        
        // Тут ми ПЕРЕРИВАЄМО виконання функції, якщо є помилка, щоб не йти в SUCCESS
        return; 
      }

      // ==============================
      // SUCCESS (Всі тести пройдені)
      // ==============================
      // SUCCESS
      const already = !!completionState(id);
      if (!already) {
        const spoiledNow = isSpoiled(id);
        if (!spoiledNow) {
          
          // ==============================
          // РОЗРАХУНОК БОНУСІВ
          // ==============================
          const attemptsBefore = getAttempts(id); // Скільки разів запускали код до успіху (0 = з першої спроби)
          const timeTakenSec = (Date.now() - window.currentTaskStartTime) / 1000; // Час в секундах
          
          const baseXP = task.xp || 10;
          
          // "Снайпер": +20% XP, якщо вирішено з першої спроби
          const sniperXP = (attemptsBefore === 0) ? Math.ceil(baseXP * 0.2) : 0; 
          
          // "Швидкість": +10% XP, якщо вирішено швидше ніж за 2 хвилини (120 сек)
          const speedXP = (timeTakenSec < 120) ? Math.ceil(baseXP * 0.1) : 0; 
          
          // "Стрік": +1 XP за кожен день безперервного навчання (максимум +10 XP)
          const streakXP = Math.min(state.user.streak || 1, 10); 
          
          const totalXP = baseXP + sniperXP + speedXP + streakXP;

          // Зберігаємо прогрес
          setCompleted(id, "xp");
          state.user.xp += totalXP;
          updateStreak(state.user);
          save();
          updateUserUI();
          playSuccessSound(!!state.settings.sound);
          fireConfetti();

          // ЗАПОВНЮЄМО ТА ПОКАЗУЄМО ВІКНО БОНУСІВ
          $("successTaskName").textContent = task.title;
          $("xpBase").textContent = `+${baseXP}`;
          $("xpSniper").textContent = sniperXP > 0 ? `+${sniperXP}` : "0";
          $("xpSpeed").textContent = speedXP > 0 ? `+${speedXP}` : "0";
          $("xpStreak").textContent = streakXP > 0 ? `+${streakXP}` : "0";
          $("xpTotal").textContent = `+${totalXP} XP`;
          
          const successOverlay = $("successOverlay");
          if (successOverlay) {
            successOverlay.classList.add("active");
            
            // Кнопка "Далі" у модалці успіху
            $("btnSuccessNext").onclick = () => {
              successOverlay.classList.remove("active");
              if (idx < refs.length - 1) goto(`/lesson/${course.id}/${mod.id}/${idx + 1}`);
              else goto(`/course/${course.id}`);
            };
          } else {
             toast(`✅ SUCCESS! +${totalXP} XP`);
          }

        } else {
          setCompleted(id, "no_xp");
          updateStreak(state.user);
          save();
          updateUserUI();
          toast("✅ Зараховано, але без XP (було відкрито рішення)");
        }
      } else {
        toast("✅ Уже зараховано");
        $("btnNext").classList.add("unlocked");
      }

      // Перевірка, чи це була остання задача в модулі
      const mp = moduleProgress(course.id, mod.id);
      if (mp.done === mp.total) {
        setTimeout(() => fireConfetti(), 160);
        toast("🎉 Модуль завершено!");
      }

      renderSidebarModuleTasks(course.id, mod.id, idx);
    };

    // breadcrumbs
    document.querySelectorAll("[data-crumb-home]").forEach(el => el.onclick = () => goto("/home"));
    document.querySelectorAll("[data-crumb-course]").forEach(el => el.onclick = () => goto(`/course/${course.id}`));

    renderSidebarModuleTasks(course.id, mod.id, idx);
  }

  // ===========================
  // Routes
  // ===========================
  function renderByRoute() {
    if (!location.hash) goto("/home");

    if (!state.user) {
      showAuth();
      renderHome();
      return;
    } else {
      hideAuth();
    }

    applyTheme(state.settings.theme || "dark");
    updateUserUI();

    const parts = routeParse();
    const root = parts[0] || "home";

    if (root === "home") return renderHome();
    if ((root === "course" || root === "modules") && parts[1]) return renderCourseModules(parts[1]);
    if (root === "lesson" && parts.length === 4) return renderLesson(parts[1], parts[2], parts[3]);
    if (root === "leaderboard") return renderLeaderboard();

    goto("/home");
  }

  // ===========================
  // Events bind
  // ===========================
  function bindEvents() {
    on($("btnGoHome"), "click", () => goto("/home"));

    on($("loginForm"), "submit", (e) => {
      e.preventDefault();
      const name = $("usernameInput").value.trim();
      const err = $("loginErr");
      if (name.length < 2) {
        err.style.display = "block";
        err.textContent = "Нікнейм має бути хоча б 2 символи.";
        return;
      }
      err.style.display = "none";

      state.user = {
        name,
        xp: 0,
        streak: 1,
        lastDay: null,
        completed: {},
        attempts: {},
        spoiled: {},
        drafts: {},
      };
      updateStreak(state.user);
      save();

      toast("✅ Вхід виконано");
      hideAuth();
      goto("/home");
      renderByRoute();
    });



    on($("btnOpenSettings"), "click", openSettings);
    on($("btnCloseSettings"), "click", closeSettings);

    on(settingsOverlay, "click", (e) => {
      if (e.target === settingsOverlay) closeSettings();
    });

    on($("soundToggle"), "change", (e) => {
      state.settings.sound = !!e.target.checked;
      save();
      toast("✅ Збережено");
    });

    on($("btnTheme"), "click", toggleTheme);
    on($("btnThemeModal"), "click", toggleTheme);

    on($("btnCopyExport"), "click", async () => {
      $("exportData").value = safeB64Encode(state);
      try {
        await navigator.clipboard.writeText($("exportData").value);
        toast("📋 Скопійовано");
      } catch {
        $("exportData").select();
        document.execCommand("copy");
        toast("📋 Скопійовано");
      }
    });

    on($("btnDoImport"), "click", () => {
      try {
        const imported = safeB64Decode($("importData").value);
        if (!imported || !imported.user || typeof imported.user.name !== "string") throw new Error("bad");
        state = imported;
        save();
        toast("✅ Імпорт успішний");
        closeSettings();
        renderByRoute();
      } catch {
        toast("❌ Невірний код імпорту");
      }
    });

    on($("btnResetAll"), "click", () => {
      if (!confirm("Точно очистити прогрес?")) return;
      resetAll();
      state = structuredClone(defaultState);
      toast("🧼 Reset done");
      closeSettings();
      showAuth();
      goto("/home");
      renderByRoute();
    });

on($("btnLogout"), "click", async () => {
  if (!confirm("Вийти з акаунту?")) return;

  try { if (supa) await supa.auth.signOut(); } catch {}

  state.user = null;
  save();
  closeSettings();
  showAuth();
  toast("👋 Вийшов");
  goto("/home");
  renderByRoute();
});

on($("btnGoogle"), "click", async () => {
  try {
    await signInWithGoogle();
  } catch {
    toast("❌ Не вдалося увійти через Google");
  }
});

    window.addEventListener("hashchange", renderByRoute);
  }

  // ===========================
  // Start
  // ===========================
bindEvents();
typingTick();
applyTheme(state.settings.theme || "dark");

(async () => {
  // якщо користувач уже увійшов через Google — підтягуємо прогрес
  if (supa) {
    const user = await getSessionUser();
    if (user) {
      try {
        const cloud = await cloudLoadState(user.id);
        if (cloud) {
          state = cloud;
          save();
        } else {
          // перший вхід: якщо локально вже є user — заливаємо, якщо ні — створимо
          if (!state.user) {
            const name =
              user.user_metadata?.full_name ||
              user.email?.split("@")?.[0] ||
              "User";

            state.user = {
              name,
              xp: 0,
              streak: 1,
              lastDay: null,
              completed: {},
              attempts: {},
              spoiled: {},
              drafts: {},
            };
          }
          save();
          await cloudSaveState(user.id, state);
        }
      } catch {
        // якщо щось з хмарою не так — просто працюємо локально
      }
    }
  }

  renderByRoute();
})();
})();
