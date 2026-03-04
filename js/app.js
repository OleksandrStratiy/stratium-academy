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
        const user = await getSessionUser();
        console.error("Supabase load/save error:", e);
      
        // fallback: якщо state.user ще не створений — створимо мінімального локального
        if (!state.user) {
          state.user = { name: "User", xp:0, streak:1, lastDay:null, completed:{}, attempts:{}, spoiled:{}, drafts:{} };
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
      courseLevels: {} // наприклад: { "python_basics": "Junior" }
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
    if (myCodeMirror) myCodeMirror.setOption("theme", t === "light" ? "default" : "dracula");

    // ДОДАЙ ЦЕЙ БЛОК:
    const themeClass = t === "light" ? "default" : "dracula";
    document.querySelectorAll('.code-box').forEach(box => {
      box.classList.remove('cm-s-default', 'cm-s-dracula');
      box.classList.add(`cm-s-${themeClass}`);
    });
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
  // Course difficulty (Junior / Middle / Senior)
  // ===========================
  const LEVELS = [
    { id: "Junior",  title: "🟢 Junior",  desc: "Легкий старт, базові задачі" },
    { id: "Middle",   title: "🟡 Middle",  desc: "Середній рівень, більше логіки" },
    { id: "Senior",  title: "🔴 Senior",  desc: "Складні задачі та підводні камені" },
  ];

  function getCourseLevel(courseId) {
    return state.courseLevels?.[courseId] || null;
  }

  function setCourseLevel(courseId, levelId) {
    state.courseLevels = state.courseLevels || {};
    state.courseLevels[courseId] = levelId;
    save();
  }

  // task.difficulty: "Junior" | "Middle" | "Senior" | "all"
  function visibleTaskRefs(courseId, moduleId) {
    const course = DB.find(c => c.id === courseId);
    const mod = course?.modules.find(m => m.id === moduleId);
    if (!course || !mod) return [];

    const lvl = getCourseLevel(courseId) || "Junior";

    return (mod.tasks || [])
      .map((t, idx) => ({ t, origIdx: idx }))
      .filter(r => {
        const d = r.t.difficulty || "Junior";
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
    const lvl = getCourseLevel(course.id) || "Junior";

    course.modules.forEach(m => {
      (m.tasks || []).forEach((t, idx) => {
        const d = t.difficulty || "Junior";
        if (!(d === "all" || d === lvl)) return;
        total++;
        if (isDone(course.id, m.id, idx)) done++;
      });
    });

    const pct = total ? Math.round((done / total) * 100) : 0;
    return { total, done, pct };
  }

  function moduleProgress(courseId, moduleId) {
    // Тепер беремо тільки завдання поточного рівня!
    const refs = visibleTaskRefs(courseId, moduleId);
    if (!refs.length) return { done: 0, total: 0 };

    let done = 0;
    refs.forEach(r => {
      // Звертаємося по оригінальному індексу для збереження
      if (isDone(courseId, moduleId, r.origIdx)) done++;
    });
    return { done, total: refs.length };
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

  function calculateBonuses({ baseXp, attemptsBefore, taskId, courseId }) {
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
  
      const level = (typeof getCourseLevel === "function" ? getCourseLevel(courseId) : null) || "Junior";
      let limit = (level === "Senior") ? 360 : (level === "Middle") ? 240 : 180;
  
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
    
        // просто відкриваємо сторінку курсу (там уже є твої картки рівнів)
        goto(`/course/${cid}`);
    
        // і мʼяко скролимо до блоку рівнів (додамо id в розмітку)
        setTimeout(() => {
          document.getElementById("levelCards")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
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
  
    // ГОЛОВНЕ ВИПРАВЛЕННЯ: Беремо відфільтровані завдання!
    const refs = visibleTaskRefs(courseId, moduleId);
  
    const tasksHtml = refs.map((ref, idx) => {
      const t = ref.t;
      const origIdx = ref.origIdx; // Індекс для бази даних
      const id = uid(courseId, moduleId, origIdx);
      
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
        ${tasksHtml || `<div style="padding:10px;color:var(--text-dim)">Немає завдань для цього рівня.</div>`}
      </div>
      <div style="margin-top:10px; padding:0 10px;">
        <button class="menu-btn" data-nav="leaderboard"><i class="ri-trophy-line"></i> Рейтинг</button>
        <button class="menu-btn" data-nav="settings"><i class="ri-settings-3-line"></i> Налаштування</button>
      </div>
    `;
  
    sb.querySelectorAll("[data-open-task]").forEach(el => {
      el.addEventListener("click", () => {
        const [cid, mid, i] = el.getAttribute("data-open-task").split("|");
        goto(`/lesson/${cid}/${mid}/${i}`);
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
    goto(`/course/${cid}`);
  
    // якщо рівень ще не обраний — просто підкажемо (без попапа)
    if (!getCourseLevel(cid)) {
      toast("🎚️ Обери складність курсу (Junior / Middle / Senior) — це впливає на задачі.");
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

    // Отримуємо поточний рівень (за замовчуванням Junior)
    const currentLvl = (typeof getCourseLevel === "function" ? getCourseLevel(course.id) : null) || "Junior";
    if (!getCourseLevel(course.id)) {
      toast("👋 Спочатку обери складність зверху — потім відкривай модулі 🙂");
    }
    // Генеруємо красиві картки рівнів
    const levelsHtml = LEVELS.map(l => {
      const isActive = l.id === currentLvl;
      const icon = l.title.split(" ")[0]; // Беремо смайлик (🟢, 🟡, 🔴)
      const name = l.title.split(" ")[1]; // Беремо назву (Junior, Middle, Senior)
      
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
      
      <div class="level-selector-inline" id="levelCards">
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
  // SKULPT PYTHON ENGINE
  // ===========================
  function runPythonSkulpt(code) {
    return new Promise((resolve) => {
      let output = "";
      
      // Функція для збору виводу print()
      function outf(text) { 
        output += text; 
      }
      
      // Функція для читання вбудованих файлів Skulpt
      function builtinRead(x) {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined) {
          throw "File not found: '" + x + "'";
        }
        return Sk.builtinFiles["files"][x];
      }

      Sk.configure({
        output: outf,
        read: builtinRead,
        execLimit: 5000, // Захист від нескінченних циклів (5 секунд)
        __future__: Sk.python3, // <--- ВМИКАЄМО СУЧАСНИЙ PYTHON 3 🚀
        inputfun: function (promptMsg) {
          return new Promise((resolveInput) => {
            // Використовуємо браузерний prompt для input()
            let val = window.prompt(promptMsg || "");
            resolveInput(val !== null ? val : "");
          });
        }
      });

      // Асинхронний запуск коду
      let myPromise = Sk.misceval.asyncToPromise(function() {
        return Sk.importMainWithBody("<stdin>", false, code, true);
      });

      myPromise.then(
        function() {
          resolve({ ok: true, stdout: output.replace(/\s+$/g, "") });
        },
        function(err) {
          resolve({ ok: false, error: err.toString(), stdout: output.replace(/\s+$/g, "") });
        }
      );
    });
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

  function compactWS(s) {
    return String(s ?? "").replace(/\s+/g, "");
  }

  async function runTaskTestsSmart(task, code) {
    const exec = await runPythonSkulpt(code);
    const results = [];
    const tests = task.tests || [];
    const rawStdout = String(exec.stdout ?? "");
    const safeCode = stripStringsAndComments(code);

    for (const t of tests) {
      const type = t.type || "stdoutEquals";
      const name = t.name || type;

      // ДОЗВІЛ ЗАЗИРАТИ В ЛАПКИ (для перевірки \n, \t тощо)
      const targetCode = t.checkRaw ? String(code ?? "") : safeCode;
      const targetCodeCompact = compactWS(targetCode);

      if (type === "codeRegex" && t.flags === "g") {
        const cnt = countRegexMatches(targetCode, t.pattern);
        
        // ВАЖЛИВО: Виправлена логіка для max: 1
        const min = t.min !== undefined ? t.min : (t.max !== undefined ? 0 : 2);
        const max = t.max !== undefined ? t.max : Infinity;
        const pass = cnt >= min && cnt <= max;
        
        let reason = "OK";
        if (!pass) {
          if (cnt < min) reason = `Потрібно мінімум ${min} співпадінь`;
          else reason = `Забагато співпадінь (максимум ${max})`;
        }
        
        results.push({ 
          name, pass, reason, 
          want: min === max ? `${min} matches` : (max === Infinity ? `${min}+ matches` : `від ${min} до ${max} matches`), 
          got: String(cnt) 
        });
        continue;
      }

      const stdoutTypes = new Set(["stdoutEquals","stdoutOneOf","stdoutRegex","stdoutContainsLines","stdoutUnorderedLines","stdoutNumber"]);
      if (!exec.ok && stdoutTypes.has(type)) {
        results.push({ name, pass: false, reason: `Помилка виконання: ${exec.error}`, want: t.value ?? "", got: rawStdout });
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

      if (type === "codeIncludes") {
        const needle = String(t.value ?? "");
        const pass = targetCodeCompact.includes(compactWS(needle));
        continue;
      }

      if (type === "codeRegex") {
        const pass = regexTest(targetCode, t.pattern, t.flags || "m");
        results.push({ name, pass, reason: pass ? "OK" : "Код не відповідає шаблону", want: `/${t.pattern}/${t.flags || "m"}`, got: "" });
        continue;
      }

      results.push({ name, pass: true, reason: "OK", want: "", got: "" });
    }

    const allPass = results.length ? results.every(r => r.pass) : true;
    return { allPass, results, exec };
  }

function buildTerminalReport(runResult) {
    const { exec, results } = runResult;
    
    // Починаємо формувати HTML-рядок
    let html = `<div style="font-weight:900; color:var(--text-dim); margin-bottom:14px; text-transform:uppercase; font-size:11px; letter-spacing:1px;">Python Academy • Terminal</div>`;

    // ==========================================
    // БЛОК 1: ЩО НАДРУКУВАЛА ПРОГРАМА (ВИВІД)
    // ==========================================
    html += `<div style="margin-bottom: 20px;">`;
    html += `<div style="font-size:12px; color:var(--primary); font-weight:900; margin-bottom:6px;">📺 Твій вивід:</div>`;
    
    if (!exec.ok) {
      // Якщо синтаксична помилка (Python впав) - робимо червоний фон
      html += `<div style="color: #fca5a5; background: rgba(239, 68, 68, 0.15); border-left: 3px solid #ef4444; padding: 10px 14px; border-radius: 6px; font-family: var(--mono); font-size: 14px; white-space: pre-wrap;">${escapeHtml(exec.error)}</div>`;
    } else {
      // Якщо програма відпрацювала нормально - нейтральний фон
      const outText = exec.stdout ? escapeHtml(exec.stdout) : "<i style='color: rgba(255,255,255,0.3);'>(нічого не виведено)</i>";
      html += `<div style="color: var(--text); background: rgba(255, 255, 255, 0.05); border-left: 3px solid var(--text-dim); padding: 10px 14px; border-radius: 6px; font-family: var(--mono); font-size: 14px; white-space: pre-wrap; min-height: 42px;">${outText}</div>`;
    }
    html += `</div>`;

    // ==========================================
    // БЛОК 2: ПЕРЕВІРКА ТЕСТІВ (ЗВІТ)
    // ==========================================
    html += `<div>`;
    html += `<div style="font-size:12px; color:var(--primary); font-weight:900; margin-bottom:6px;">🎯 Результат перевірки:</div>`;

    // Визначаємо загальний колір блоку перевірки
    const allPass = results.length ? results.every(r => r.pass) : true;
    const testBg = allPass ? "rgba(34, 197, 94, 0.1)" : "rgba(251, 191, 36, 0.1)"; // Зелений або Жовтий
    const testBorder = allPass ? "var(--success)" : "var(--warn)";

    html += `<div style="background: ${testBg}; border-left: 3px solid ${testBorder}; padding: 12px 14px; border-radius: 6px;">`;

    for (const r of results) {
      const icon = r.pass ? "✅" : "❌";
      const color = r.pass ? "var(--success)" : "var(--warn)";
      
      html += `<div style="margin-bottom: 8px;">`;
      html += `<strong style="color:${color}; font-size:14px;">${icon} ${escapeHtml(r.name)}</strong>`;

      if (!r.pass) {
        // Якщо тест впав, показуємо деталі з відступом
        html += `<div style="margin-left: 24px; margin-top: 6px; font-size: 13px; color: rgba(255,255,255,0.85); background: rgba(0,0,0,0.25); padding: 8px 12px; border-radius: 8px;">`;
        if (r.reason) html += `<div style="margin-bottom:4px;"><span style="color:var(--danger); font-weight:700;">Помилка:</span> ${escapeHtml(r.reason)}</div>`;
        if (r.want !== undefined && String(r.want) !== "") html += `<div style="margin-bottom:2px;"><span style="color:var(--text-dim);">Очікувалось:</span> <code style="color:var(--success); font-weight:900;">${escapeHtml(String(r.want))}</code></div>`;
        if (r.got !== undefined && String(r.got) !== "") html += `<div><span style="color:var(--text-dim);">Отримано:</span> <code style="color:var(--danger); font-weight:900;">${escapeHtml(String(r.got))}</code></div>`;

        // Розумні підказки (якщо є проблеми з пробілами чи апострофами)
        const hints = r.meta?.hints || [];
        for (const h of hints) {
           html += `<div style="margin-top:6px; color: #fbbf24; font-weight:700;">💡 ${escapeHtml(h)}</div>`;
        }
        html += `</div>`;
      }
      html += `</div>`;
    }

    // Блок для візуалізації невидимих пробілів (якщо потрібно)
    const firstStdFail = results.find(r => !r.pass && r.meta && r.meta.gotRaw !== undefined);
    if (firstStdFail) {
      html += `<hr style="border:none; border-top:1px dashed rgba(255,255,255,0.2); margin: 12px 0;">`;
      html += `<div style="font-size: 12px; color: var(--text-dim); margin-bottom: 6px;">🔎 Аналіз невидимих символів (пробіли, переноси):</div>`;
      html += `<div style="font-size: 13px; background: rgba(0,0,0,0.4); padding: 10px; border-radius: 6px; font-family: var(--mono);">`;
      html += `<div style="color: var(--success); margin-bottom:4px;">[Твоя мета]➔ ${escapeHtml(visualizeWhitespace(firstStdFail.meta.wantRaw))}</div>`;
      html += `<div style="color: #fca5a5;">[Твій код] ➔ ${escapeHtml(visualizeWhitespace(firstStdFail.meta.gotRaw))}</div>`;
      html += `</div>`;
    }

    html += `</div></div>`; // Закриваємо тест-блок
    return html;
  }

  // ===========================
  // Settings modal
  // ===========================
  function openSettings() {
    if (!$("soundToggle")) return;
    $("soundToggle").checked = !!state.settings.sound;

   
    settingsOverlay && settingsOverlay.classList.add("active");
  }

  function closeSettings() {
    settingsOverlay && settingsOverlay.classList.remove("active");
  }

  function openLevelPicker(courseId, onDone) {
    // Попап більше не показуємо — у тебе вже є вбудовані картки на цій сторінці
    toast("🎚️ Рівень обирається у блоці «Обери складність курсу».");
  
    // якщо ми вже на сторінці курсу — просто скролимо до блоку
    setTimeout(() => {
      const el = document.querySelector(".level-selector-inline");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  
    // щоб не ламати стару логіку викликів
    if (typeof onDone === "function") onDone();
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




let myCodeMirror = null;
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
 // === ПІДСВІТКА КОДУ В ТЕОРІЇ ===
    const currentTheme = state.settings.theme === "light" ? "default" : "dracula";
    
    $("lessonContent").querySelectorAll('.code-box').forEach(box => {
      // 1. Правильно дістаємо текст (зберігаємо твої <br> як нові рядки)
      let codeText = box.innerHTML.replace(/<br\s*\/?>/gi, '\n');
      let temp = document.createElement("div");
      temp.innerHTML = codeText;
      codeText = (temp.textContent || temp.innerText || "").trim();

      // 2. Очищаємо блок і вішаємо клас теми
      box.innerHTML = "";
      box.classList.add(`cm-s-${currentTheme}`); // Додаємо тему для синтаксису

      // 3. Фарбуємо код
      if (window.CodeMirror && typeof CodeMirror.runMode === "function") {
        CodeMirror.runMode(codeText, "python", box);
      } else {
        box.textContent = codeText;
      }
    });
    $("lessonTask").innerHTML = task.desc || "";
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
    // ===========================
    // EDITOR INIT (CodeMirror)
    // ===========================
    const terminal = $("terminal");
    const status = $("termStatus");
    if (status) status.textContent = "Ready";
    if (terminal) terminal.textContent = ">>> Ready...";

    // Якщо редактор ще не створено - створюємо
    if (!myCodeMirror) {
      myCodeMirror = CodeMirror.fromTextArea($("codeEditor"), {
        mode: "python",
        theme: state.settings.theme === "light" ? "default" : "dracula",
        lineNumbers: true,
        indentUnit: 4,
        autoCloseBrackets: true,
        extraKeys: {
          "Ctrl-Enter": () => $("btnRun").click(),
          "Cmd-Enter": () => $("btnRun").click()
        }
      });
    }

// Завантажуємо фінальне рішення (якщо є), або чернетку
// 1. Формуємо код, який треба показати
    const pastSolution = state.user?.solutions?.[id];
    const draft = getDraft(id);
    const codeToShow = pastSolution !== undefined ? pastSolution : (draft || "");

    // 2. Якщо вже був обробник автозбереження — правильно його видаляємо!
    if (myCodeMirror._currentChangeHandler) {
      myCodeMirror.off("change", myCodeMirror._currentChangeHandler);
    }

    // 3. Вставляємо код завдання у редактор
    myCodeMirror.setValue(codeToShow);

    const savedBadge = $("badgeSaved");
    if (savedBadge) {
      savedBadge.textContent = draft ? "Saved" : "Not saved";
      savedBadge.style.opacity = draft ? "1" : ".75";
    }

    // 4. Створюємо іменований обробник (щоб потім його можна було видалити)
    myCodeMirror._currentChangeHandler = (cm, changeObj) => {
      // Ігноруємо штучну зміну (коли код просто підвантажується через setValue)
      if (changeObj.origin === "setValue") return; 

      if (savedBadge) { savedBadge.textContent = "Saving..."; savedBadge.style.opacity = "1"; }
      clearTimeout(myCodeMirror._autosaveTimer);
      myCodeMirror._autosaveTimer = setTimeout(() => {
        setDraft(id, myCodeMirror.getValue());
        if (savedBadge) { savedBadge.textContent = "Saved"; savedBadge.style.opacity = "1"; }
      }, 350);
    };

    // 5. Вішаємо новий правильний обробник
    myCodeMirror.on("change", myCodeMirror._currentChangeHandler);

    // buttons
    $("btnClear").onclick = () => {
      if (!confirm("Очистити редактор?")) return;
      myCodeMirror.setValue(""); // Замість editor.value = ""
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
    $("btnRun").onclick = async () => {
      const code = myCodeMirror.getValue();
      
      // Показуємо користувачу, що код виконується
      if (terminal) terminal.textContent = ">>> Виконання коду...";
      
      // Чекаємо результатів від Skulpt
      const run = await runTaskTestsSmart(task, code);

      if (terminal) terminal.innerHTML = buildTerminalReport(run);

      // ==============================
      // FAIL (Помилка виконання або не пройдені тести)
      // ==============================
      if (!run.allPass) {
        // ... (ДАЛІ ВЕСЬ ТВІЙ КОД ЗАЛИШАЄТЬСЯ БЕЗ ЗМІН)
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
      const already = !!completionState(id);
      
      if (!already) {
        const spoiledNow = isSpoiled(id);
        
        if (!spoiledNow) {
          // --- ВАРІАНТ 1: Пройдено чесно, вперше (Даємо XP і Бонуси) ---
          
          setCompleted(id, "xp");

          // Зберігаємо переможний код назавжди!
          state.user.solutions = state.user.solutions || {};
          state.user.solutions[id] = myCodeMirror.getValue();

          // 1) рахуємо бонуси
          const baseXp = task.xp || 0;
          const attemptsBefore = getAttempts(id);
          const bonuses = calculateBonuses({
            baseXp,
            attemptsBefore,
            taskId: id,
            courseId: course.id
          });

          const totalXP = baseXp + bonuses.sniper + bonuses.speed + bonuses.streakBonus;

          // 2) нараховуємо XP
          state.user.xp += totalXP;

          updateStreak(state.user);
          save();
          updateUserUI();

          playSuccessSound(!!state.settings.sound);
          fireConfetti();

          // 3) модалка
          $("successTaskName").textContent = task.title;
          $("xpBase").textContent   = `+${baseXp}`;
          $("xpSniper").textContent = bonuses.sniper ? `+${bonuses.sniper}` : "0";
          $("xpSpeed").textContent  = bonuses.speed ? `+${bonuses.speed}` : "0";
          $("xpStreak").textContent = bonuses.streakBonus ? `+${bonuses.streakBonus}` : "0";
          $("xpTotal").textContent  = `+${totalXP} XP`;

          const successOverlay = $("successOverlay");
          if (successOverlay) {
            successOverlay.classList.add("active");

            // Кнопка "Далі"
            $("btnSuccessNext").onclick = () => {
              successOverlay.classList.remove("active");
              if (idx < refs.length - 1) goto(`/lesson/${course.id}/${mod.id}/${idx + 1}`);
              else goto(`/course/${course.id}`);
            };

            // Кнопка "Переглянути мій код"
            const btnStay = $("btnSuccessStay");
            if (btnStay) {
              btnStay.onclick = () => {
                successOverlay.classList.remove("active");
                $("btnNext").classList.add("unlocked"); // Розблоковуємо кнопку далі внизу екрана
              };
            }
          } else {
            toast(`✅ SUCCESS! +${totalXP} XP`);
            $("btnNext").classList.add("unlocked");
          }

        } else {
          // --- ВАРІАНТ 2: Пройдено вперше, але відкрив рішення (Без XP) ---
          setCompleted(id, "no_xp");
          
          // Теж зберігаємо його варіант коду
          state.user.solutions = state.user.solutions || {};
          state.user.solutions[id] = myCodeMirror.getValue();
          
          updateStreak(state.user);
          save();
          updateUserUI();
          toast("✅ Зараховано, але без XP (було відкрито рішення)");
          $("btnNext").classList.add("unlocked");
        }
        
      } else {
        // --- ВАРІАНТ 3: Задача вже була пройдена раніше ---
        
        // Дозволяємо перезаписати збережене рішення на нове (раптом учень написав краще)
        state.user.solutions = state.user.solutions || {};
        state.user.solutions[id] = myCodeMirror.getValue();
        save();
        
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
    document.querySelectorAll("[data-crumb-home]").forEach(el => el.onclick = () => goto("/home"));    document.querySelectorAll("[data-crumb-course]").forEach(el => el.onclick = () => goto(`/course/${course.id}`));

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

   // Закриваємо мобільне меню при будь-якому переході
    document.querySelector(".sidebar")?.classList.remove("open");
    document.querySelector(".sidebar-overlay")?.classList.remove("active");
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
   // Створення затемнення для мобільного меню
    const sbOverlay = document.createElement("div");
    sbOverlay.className = "sidebar-overlay";
    document.body.appendChild(sbOverlay);

    const btnMobileMenu = $("btnMobileMenu");
    const sidebar = document.querySelector(".sidebar");

    if (btnMobileMenu) {
      btnMobileMenu.onclick = () => {
        sidebar.classList.add("open");
        sbOverlay.classList.add("active");
      };
    }

    // Закриття по кліку на темний фон
    sbOverlay.onclick = () => {
      sidebar.classList.remove("open");
      sbOverlay.classList.remove("active");
    };
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



