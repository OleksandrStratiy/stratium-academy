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

  const supa =
    window.supabase && SUPABASE_URL.includes("supabase.co")
      ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true
          }
        })
      : null;

  // ===========================
  // DOM helpers
  // ===========================
  const { $, on, escapeHtml, todayISO, levelFromXp } = window.App.helpers;

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
      g.gain.exponentialRampToValueAtTime(0.2, ac.currentTime + 0.01);
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
  // Storage
  // ===========================
  const { defaultState, load, resetAll } = window.App.storage;

  let state = load() || structuredClone(defaultState);

  const cloudSyncApi = window.App.cloudSync.create({ supa, state, save });
  const { getSessionUser, cloudLoadState, loadClassAccessForStudent, cloudSaveState, scheduleCloudSync } =
    cloudSyncApi;

  function replaceState(nextState) {
    const safeState = structuredClone(nextState || defaultState);

    Object.keys(state).forEach((key) => {
      delete state[key];
    });

    Object.assign(state, safeState);
  }

  function save() {
    window.App.storage.save(state);
    scheduleCloudSync(() => state);
  }

  // ===========================
  // Routing
  // ===========================
  function routeParse() {
    const raw = (location.hash || "#/home").slice(1);
    return raw.split("/").filter(Boolean);
  }
  function goto(hash) {
    location.hash = hash.startsWith("#") ? hash : "#" + hash;
  }

  // ===========================
  // Theme
  // ===========================
  function applyTheme(theme) {
    return window.App.theme.applyTheme(theme, state, getCodeMirror());
  }

  function toggleTheme() {
    return window.App.theme.toggleTheme(state, getCodeMirror(), save, toast);
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
  const viewTeacher = $("viewTeacher"); // <-- Додали змінну

  function setActiveView(which) {
    // <-- Додали viewTeacher у масив для очищення
    [viewHome, viewModules, viewLesson, viewLeaderboard, viewTeacher].forEach(
      (v) => v && v.classList.remove("active")
    );
    if (which) which.classList.add("active");
  }

  // ===========================
  // Course difficulty (Junior / Middle / Senior)
  // ===========================
  const LEVELS = [
    { id: "Junior", title: "🟢 Junior", desc: "Легкий старт, базові задачі" },
    { id: "Middle", title: "🟡 Middle", desc: "Середній рівень, більше логіки" },
    { id: "Senior", title: "🔴 Senior", desc: "Складні задачі та підводні камені" }
  ];

  function getCourseLevel(courseId) {
    return state.courseLevels?.[courseId] || null;
  }

  function setCourseLevel(courseId, levelId) {
    state.courseLevels = state.courseLevels || {};
    state.courseLevels[courseId] = levelId;
    save();
  }

  function canOpenModule(courseId, moduleId) {
    const course = DB.find((c) => c.id === courseId);
    if (!course) return false;

    const modules = [...(course.modules || [])].sort((a, b) => (a.order || 999) - (b.order || 999));
    const index = modules.findIndex((m) => m.id === moduleId);
    if (index === -1) return false;

    if ((state?.user?.role || "student") === "teacher") return true;

    const studentForced = state?.user?.moduleAccess?.[courseId]?.[moduleId] || null;
    if (studentForced === "unlocked") return true;
    if (studentForced === "locked") return false;

    const classForced = state?.user?.classModuleAccess?.[courseId]?.[moduleId] || null;
    if (classForced === "unlocked") return true;
    if (classForced === "locked") return false;

    // якщо хоч одне завдання в модулі примусово відкрите — сам модуль теж відкритий
    const studentTaskMap = state?.user?.taskAccess?.[courseId]?.[moduleId] || {};
    if (Object.values(studentTaskMap).some((v) => v === "unlocked")) return true;

    const classTaskMap = state?.user?.classTaskAccess?.[courseId]?.[moduleId] || {};
    if (Object.values(classTaskMap).some((v) => v === "unlocked")) return true;

    if (index === 0) return true;

    const prev = modules[index - 1];
    return isModuleCompleted(courseId, prev.id);
  }

  function canOpenTask(courseId, moduleId, origIdx) {
    if ((state?.user?.role || "student") === "teacher") return true;

    const studentTaskForced = state?.user?.taskAccess?.[courseId]?.[moduleId]?.[origIdx] || null;
    if (studentTaskForced === "unlocked") return true;
    if (studentTaskForced === "locked") return false;

    const classTaskForced = state?.user?.classTaskAccess?.[courseId]?.[moduleId]?.[origIdx] || null;
    if (classTaskForced === "unlocked") return true;
    if (classTaskForced === "locked") return false;

    const studentModuleForced = state?.user?.moduleAccess?.[courseId]?.[moduleId] || null;
    if (studentModuleForced === "unlocked") return true;
    if (studentModuleForced === "locked") return false;

    const classModuleForced = state?.user?.classModuleAccess?.[courseId]?.[moduleId] || null;
    if (classModuleForced === "unlocked") return true;
    if (classModuleForced === "locked") return false;

    return true;
  }

  // ===========================
  // User UI
  // ===========================
  function showAuth() {
    authOverlay && authOverlay.classList.add("active");
  }
  function hideAuth() {
    authOverlay && authOverlay.classList.remove("active");
  }

  function updateUserUI() {
    if (!state.user) return;

    // перевіримо, чи streak змінився
    const beforeLastDay = state.user.lastDay;
    const beforeStreak = state.user.streak;

    updateStreak(state.user);

    const streakChanged = beforeLastDay !== state.user.lastDay || beforeStreak !== state.user.streak;

    $("uiName").innerText = state.user.name;
    $("uiAvatar").innerText = (state.user.name[0] || "U").toUpperCase();
    $("uiXP").innerText = `${state.user.xp} XP`;
    $("uiStreak").innerText = String(state.user.streak || 1);

    const lvl = levelFromXp(state.user.xp || 0);
    $("uiLevel").innerText = `Level ${lvl.level}`;
    $("uiLevelXP").innerText = `${lvl.inLevelXp}/${lvl.nextLevelXp} XP`;
    $("uiLevelFill").style.width = `${Math.round((lvl.inLevelXp / lvl.nextLevelXp) * 100)}%`;

    const hx = $("homeTotalXP");
    if (hx) hx.textContent = String(state.user.xp || 0);
    const hs = $("homeStreak");
    if (hs) hs.textContent = String(state.user.streak || 1);

    // зберігаємо тільки якщо streak реально змінився
    if (streakChanged) save();
  }
  function setTeacherModeChrome(enabled) {
    document.body.classList.toggle("teacher-mode", !!enabled);
  }
  // ===========================
  // Progress helpers
  // ===========================

  // Перевіряємо, чи завантажився файл з курсами (core.js)
  if (typeof DB === "undefined") {
    console.error("Критична помилка: Базу даних курсів (DB) не знайдено!");
    alert("Помилка завантаження даних курсу. Спробуйте оновити сторінку.");
    window.DB = []; // Створюємо порожній масив, щоб уникнути подальшого падіння скрипта
  }

  const progressApi = window.App.progress.create({
    state,
    save,
    DB,
    TASKS: typeof TASKS !== "undefined" ? TASKS : undefined,
    getCourseLevel
  });

  const uid = progressApi.uid;
  const completionState = progressApi.completionState;
  const setCompleted = progressApi.setCompleted;
  const getAttempts = progressApi.getAttempts;
  const incAttempts = progressApi.incAttempts;
  const isSpoiled = progressApi.isSpoiled;
  const setSpoiled = progressApi.setSpoiled;
  const getDraft = progressApi.getDraft;
  const setDraft = progressApi.setDraft;
  const addErrorLog = progressApi.addErrorLog;
  const visibleTaskRefs = progressApi.visibleTaskRefs;
  const courseProgress = progressApi.courseProgress;
  const moduleProgress = progressApi.moduleProgress;
  const isModuleCompleted = progressApi.isModuleCompleted;
  const calculateBonuses = progressApi.calculateBonuses;

  const autoAssignmentApi = window.App.autoAssignment.create({
    supa,
    state,
    uid,
    completionState,
    getAttempts,
    save,
    toast,
    $,
    goto
  });
  const {
    calculateAssignedAutoPoints,
    finalizeActiveAutoAssignment,
    restoreSuccessOverlayXpMode,
    showAssignedAutoSuccessOverlay
  } = autoAssignmentApi;

  // ===========================
  // Sidebar rendering
  // ===========================

  function kindLabel(kind) {
    if (kind === "quiz") return "Контрольна";
    if (kind === "final") return "Підсумкова";
    return "Завдання";
  }

  const sidebarApi = window.App.sidebar.create({
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
  });

  const renderSidebarHome = sidebarApi.renderSidebarHome;
  const renderSidebarModulesOnly = sidebarApi.renderSidebarModulesOnly;

  function renderSidebarModuleTasks(courseId, moduleId, taskIdx) {
    return sidebarApi.renderSidebarModuleTasks(courseId, moduleId, taskIdx, kindLabel);
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
  const uiHomeApi = window.App.uiHome.create({
    $,
    DB,
    escapeHtml,
    courseProgress,
    openCourseWithLevel,
    setActiveView,
    viewHome,
    renderSidebarHome,
    state,
    supa
  });

  const renderHome = uiHomeApi.renderHome;

  const uiCourseApi = window.App.uiCourse.create({
    $,
    DB,
    LEVELS,
    escapeHtml,
    state,
    moduleProgress,
    isModuleCompleted,
    getCourseLevel,
    setCourseLevel,
    setActiveView,
    viewModules,
    renderSidebarModulesOnly,
    goto,
    toast,
    canOpenModule
  });

  const renderCourseModules = uiCourseApi.renderCourseModules;

  const uiLeaderboardApi = window.App.uiLeaderboard.create({
    $,
    state,
    supa,
    toast,
    setActiveView,
    viewLeaderboard,
    renderSidebarHome
  });

  const renderLeaderboard = uiLeaderboardApi.renderLeaderboard;

  const pythonRunner = window.App.pythonRunner.create();
  const { setTerminalPromptLabel, setTermStatus, enableTermInput, runPythonSkulpt, cancelPendingInput } =
    pythonRunner;

  const checkerApi = window.App.checker.create({ runPythonSkulpt, escapeHtml });
  const { runTaskTestsSmart, explainPythonError, buildTerminalReport } = checkerApi;

  const lessonRunApi = window.App.lessonRun.create({
    $,
    getCodeMirror: (...args) => getCodeMirror(...args),
    setTerminalPromptLabel,
    runTaskTestsSmart,
    buildTerminalReport,
    enableTermInput,
    cancelPendingInput,
    addErrorLog,
    completionState,
    incAttempts,
    explainPythonError,
    isSpoiled,
    toast,
    playSuccessSound,
    state,
    fireConfetti,
    setCompleted,
    updateStreak,
    save,
    updateUserUI,
    finalizeActiveAutoAssignment,
    uid,
    calculateAssignedAutoPoints,
    getAttempts,
    showAssignedAutoSuccessOverlay,
    calculateBonuses,
    restoreSuccessOverlayXpMode,
    goto,
    moduleProgress,
    renderSidebarHome,
    renderSidebarModuleTasks
  });
  const { runLessonCode } = lessonRunApi;

  const uiLessonApi = window.App.uiLesson.create({
    visibleTaskRefs,
    canOpenModule,
    toast,
    goto,
    state,
    canOpenTask,
    setActiveView,
    viewLesson,
    $,
    escapeHtml,
    kindLabel,
    uid,
    getAttempts,
    isSpoiled,
    save,
    setSpoiled,
    isModuleCompleted,
    moduleProgress,
    getDraft,
    setDraft,
    completionState,
    enableTermInput,
    cancelPendingInput,
    setTermStatus,
    runLessonCode,
    renderSidebarHome,
    renderSidebarModuleTasks,
    setTerminalPromptLabel
  });
  const { getCodeMirror, renderLesson } = uiLessonApi;

  const uiSettingsApi = window.App.uiSettings.create({
    $,
    state,
    getCodeMirror,
    save,
    toast,
    supa,
    sidebarApi,
    goto
  });
  const { showSettings } = uiSettingsApi;

  // ===========================
  // Settings modal
  // ===========================
  function openSettings() {
    showSettings();
  }

  function closeSettings() {
    const overlay = $("settingsOverlay");
    overlay && overlay.classList.remove("active");
  }

  // ===========================
  // Typing effect (home)
  // ===========================
  const typingWords = [
    'print("Hello, Python Academy!")',
    "for i in range(1, 4): print(i)",
    'if x > 5: print("big")',
    'name="Оля"; print(f"Привіт, {name}!")'
  ];
  let tIndex = 0,
    tDir = 1,
    tSub = "";
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
      if (tSub.length === 0) {
        tDir = 1;
        tIndex++;
      }
      setTimeout(typingTick, 20);
    }
  }

  // ===========================
  // Routes
  // ===========================
  function renderTeacher() {
    // 1. Перевіряємо, чи це дійсно вчитель
    if (state?.user?.role !== "teacher") {
      toast("⛔ Доступ заборонено. Ця сторінка лише для вчителів.");
      return goto("/home");
    }

    // 2. Показуємо потрібний HTML-блок
    setActiveView($("viewTeacher"));

    // 3. Оновлюємо ліве меню
    sidebarApi.renderSidebarHome();

    // 4. Запускаємо логіку модуля вчителя (його ми створимо наступним кроком)
    if (window.App.uiTeacher) {
      window.App.uiTeacher
        .create({
          $,
          supa,
          state,
          toast,
          save,
          refreshSidebar: () => sidebarApi.renderSidebarHome()
        })
        .renderDashboard();
    } else {
      $("teacherContent").innerHTML =
        `<div style="color:var(--danger); padding: 20px;">Модуль ui-teacher.js не підключено!</div>`;
    }
  }
  function closeMobileMenu() {
    document.querySelector(".sidebar")?.classList.remove("open");
    document.querySelector(".sidebar-overlay")?.classList.remove("active");
  }
  function renderByRoute() {
    closeMobileMenu();

    if (!location.hash) goto("/home");

    if (!state.user) {
      setTeacherModeChrome(false);
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

    setTeacherModeChrome(root === "teacher");
    if (root === "home") return renderHome();
    if ((root === "course" || root === "modules") && parts[1]) return renderCourseModules(parts[1]);
    if (root === "lesson" && parts.length === 4) return renderLesson(parts[1], parts[2], parts[3]);
    if (root === "leaderboard") return renderLeaderboard();
    if (root === "teacher") return renderTeacher(); // <--- ДОДАЛИ ЦЕЙ РЯДОК

    goto("/home");
  }

  // ===========================
  // Events bind
  // ===========================
  function bindEvents() {
    on($("btnGoHome"), "click", () => goto("/home"));
    on($("btnOpenSettings"), "click", showSettings);

    // on($("btnOpenSettings"), "click", openSettings);
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

    on($("btnResetAll"), "click", () => {
      if (!confirm("Точно очистити прогрес?")) return;
      resetAll();
      replaceState(defaultState);
      toast("🧼 Reset done");
      closeSettings();
      showAuth();
      goto("/home");
      renderByRoute();
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

  // --- 1. Ініціалізація нового модуля авторизації ---
  const authUI = window.App.authUI.create({
    $,
    on,
    supa,
    state,
    save,
    toast,
    updateStreak,
    onAuthSuccess: async () => {
      try {
        const user = await getSessionUser();

        if (user) {
          const cloud = await cloudLoadState(user.id);
          if (cloud) {
            replaceState(cloud);
            save();
          }

          await loadClassAccessForStudent(user.id);
        }

        goto("/home");
        renderByRoute();
      } catch (e) {
        console.error("Post-login sync error:", e);
        goto("/home");
        renderByRoute();
      }
    }
  });

  // --- 2. Стартовий запуск (з перевіркою ролей) ---
  (async () => {
    // якщо користувач уже увійшов через Google — підтягуємо прогрес

    if (supa) {
      const user = await getSessionUser();
      if (user) {
        try {
          const cloud = await cloudLoadState(user.id);
          if (cloud) {
            replaceState(cloud);
            save();
          } else {
            // перший вхід: якщо локально вже є user — заливаємо, якщо ні — створимо
            if (!state.user) {
              const name = user.user_metadata?.full_name || user.email?.split("@")?.[0] || "User";

              state.user = {
                name,
                role: "student",
                xp: 0,
                streak: 1,
                lastDay: null,
                completed: {},
                attempts: {},
                spoiled: {},
                drafts: {},
                errorLogs: {},
                moduleAccess: {},
                taskAccess: {},
                classModuleAccess: {},
                classTaskAccess: {},
                solutions: {},
                teacherClasses: [],
                teacherSchoolName: ""
              };
            }
            save();
            await cloudSaveState(user.id, state);
          }

          // === НОВЕ: ПЕРЕВІРЯЄМО ПРОФІЛЬ (Роль) ===
          const isProfileComplete = await authUI.checkCloudProfile(user);

          // Якщо профілю немає, authUI покаже вікно вибору ролі і зупинить подальше завантаження
          if (!isProfileComplete) {
            return;
            await loadClassAccessForStudent(user.id);
          }
          await loadClassAccessForStudent(user.id);
        } catch {
          // якщо щось з хмарою не так — просто працюємо локально
        }
      }
    }

    renderByRoute();
  })();
})(); // Це закриває найпершу функцію (function () { ... з початку файлу
