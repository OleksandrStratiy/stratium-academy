window.App = window.App || {};

window.App.teacherClasses = (function () {
  "use strict";

  function create(deps) {
    const {
      $,
      state,
      save,
      toast = () => {},
      supa = null,
      onOpenAssignmentsForClass,
      onOpenAssignmentsForStudent
    } = deps;

    const assignmentStore = window.App.teacherAssignmentStore.create({
      state,
      save,
      toast,
      supa
    });
    const store = window.App.teacherClassesStore.create({ supa });
    const { updateClassRecord, removeStudentFromClass } = store;

    // Спільний змінний стан вкладки; передається підмодулям за посиланням.
    const ctx = {
      teacherClasses: [],
      activeClassCode: null,
      activeStudents: [],
      activeStudentId: null,
      activeStudentAssignments: [],
      activeStudentSubmissions: [],
      viewMode: "list" // list | details | student
    };

    const progressLib = window.App.teacherClassesProgress.create();
    const {
      getStudentXP,
      getStudentAttempts,
      getStudentCompletedCount,
      getStudentLastActiveDays,
      getStudentProgress,
      getModuleAccessState,
      getTaskAccessState,
      getCourseAccessTree,
      isStudentTaskDone,
      getStudentCourseSummary,
      getClassModuleAccessState,
      getClassTaskAccessState,
      isClassFullyUnlocked
    } = progressLib;

    const renderLib = window.App.teacherClassesRender.create({
      getStudentXP,
      getStudentAttempts,
      getStudentCompletedCount,
      getActiveStudents: () => ctx.activeStudents,
      getCourseAccessTree,
      getModuleAccessState,
      getTaskAccessState,
      isStudentTaskDone,
      getClassModuleAccessState,
      getClassTaskAccessState,
      isClassFullyUnlocked
    });
    const {
      escapeHtml,
      formatDate,
      calcClassStats,
      renderStudentModuleAccessGroup,
      renderClassAccessBlock,
      renderNeedHelpBlock
    } = renderLib;

    const accessLib = window.App.teacherClassesAccess.create({
      ctx,
      getStudentProgress,
      store,
      getCourseAccessTree,
      updateClassRecord
    });
    const {
      setStudentModuleAccess,
      setStudentTaskAccess,
      setClassOpenAllAccess,
      setClassModuleAccess,
      setClassTaskAccess
    } = accessLib;

    const viewsLib = window.App.teacherClassesViews.create({
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
    });
    const { renderListView, renderDetailsView } = viewsLib;

    const modalsLib = window.App.teacherClassesModals.create({ getClassesUi, save, escapeHtml, state });
    const {
      openCreateClassModal,
      closeCreateClassModal,
      renderCreateClassModal,
      openClassSettingsModal,
      closeClassSettingsModal,
      renderClassSettingsModal
    } = modalsLib;

    const studentViewLib = window.App.teacherClassesStudentView.create({
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
    });
    const { renderStudentView } = studentViewLib;

    const studentEventsLib = window.App.teacherClassesStudentEvents.create({
      $,
      toast,
      refreshAndRender,
      onOpenAssignmentsForStudent,
      assignmentStore,
      loadActiveStudentAssignments,
      getActiveStudent,
      getActiveClass,
      setStudentModuleAccess,
      setStudentTaskAccess,
      setClassModuleAccess,
      setClassTaskAccess
    });
    const { bindStudentViewEvents, bindAccessSelectEvents } = studentEventsLib;

    const eventsLib = window.App.teacherClassesEvents.create({
      $,
      toast,
      store,
      ctx,
      state,
      getClassesUi,
      save,
      refreshAndRender,
      openCreateClassModal,
      closeCreateClassModal,
      loadStudents,
      removeStudentFromClass,
      getActiveClass,
      setClassOpenAllAccess,
      onOpenAssignmentsForClass,
      openClassSettingsModal,
      closeClassSettingsModal,
      bindStudentViewEvents,
      bindAccessSelectEvents
    });
    const { bindEvents } = eventsLib;

    function resetTransientTeacherClassesUi() {
      const ui = state.teacherClassesUI || {};

      ui.showClassSettingsModal = false;
      ui.showCreateModal = false;
      ui.openAccessCourses = {};
      ui.openAccessModules = {};

      state.teacherClassesUI = ui;

      ctx.viewMode = "list";
      ctx.activeClassCode = null;
      ctx.activeStudentId = null;
      ctx.activeStudentAssignments = [];
    }

    function getActiveClass() {
      return ctx.teacherClasses.find((c) => c.code === ctx.activeClassCode) || null;
    }
    function getClassesUi() {
      state.teacherClassesUI = state.teacherClassesUI || {
        classSearch: "",
        studentSearch: "",
        classSort: "updated",
        showOnlyRisky: false,
        showClassSettingsModal: false,
        showCreateModal: false,
        openAccessCourses: {},
        openAccessModules: {}
      };

      if (typeof state.teacherClassesUI.showClassSettingsModal !== "boolean") {
        state.teacherClassesUI.showClassSettingsModal = false;
      }

      if (typeof state.teacherClassesUI.showCreateModal !== "boolean") {
        state.teacherClassesUI.showCreateModal = false;
      }

      if (
        !state.teacherClassesUI.openAccessCourses ||
        typeof state.teacherClassesUI.openAccessCourses !== "object"
      ) {
        state.teacherClassesUI.openAccessCourses = {};
      }

      if (
        !state.teacherClassesUI.openAccessModules ||
        typeof state.teacherClassesUI.openAccessModules !== "object"
      ) {
        state.teacherClassesUI.openAccessModules = {};
      }

      return state.teacherClassesUI;
    }

    function getActiveStudent() {
      return ctx.activeStudents.find((s) => s.id === ctx.activeStudentId) || null;
    }
    async function loadActiveStudentAssignments() {
      const student = getActiveStudent();
      const classCode = student?.class_code || ctx.activeClassCode || "";

      ctx.activeStudentAssignments = [];
      ctx.activeStudentSubmissions = [];

      if (!student?.id || !classCode) {
        return;
      }

      try {
        const assignments = await assignmentStore.fetchAssignmentsForStudent(student.id, classCode);
        ctx.activeStudentAssignments = assignments;

        if (!assignments.length) {
          return;
        }

        const submissions = await assignmentStore.fetchSubmissionsByAssignmentIds(
          assignments.map((item) => item.id)
        );

        ctx.activeStudentSubmissions = submissions.filter(
          (item) => String(item.student_id || "") === String(student.id)
        );
      } catch (err) {
        console.error(err);
        ctx.activeStudentAssignments = [];
        ctx.activeStudentSubmissions = [];
        toast("❌ Не вдалося завантажити завдання та здачі учня");
      }
    }

    function render() {
      if (ctx.viewMode === "student") return renderStudentView();
      if (ctx.viewMode === "details") return renderDetailsView();
      return renderListView();
    }

    async function loadStudents(classCode) {
      ctx.activeClassCode = classCode;
      try {
        ctx.activeStudents = await store.fetchStudents(classCode);
      } catch (err) {
        console.error("Помилка завантаження учнів:", err);
        ctx.activeStudents = [];
        toast("❌ Не вдалося завантажити учнів");
      }
      ctx.activeStudents.sort((a, b) => getStudentXP(b) - getStudentXP(a));
    }

    async function openClassByCode(classCode) {
      ctx.activeClassCode = classCode;
      ctx.activeStudentId = null;
      ctx.viewMode = "details";
      await loadStudents(classCode);
      await refreshAndRender();
    }

    async function openStudentById(studentId, classCode) {
      if (classCode) {
        ctx.activeClassCode = classCode;
      }

      if (!ctx.activeClassCode) return;

      await loadStudents(ctx.activeClassCode);

      ctx.activeStudentId = studentId;
      ctx.viewMode = "student";

      await refreshAndRender();
    }

    async function refreshAndRender() {
      const root = $("teacherInnerView");
      if (!root) return;

      try {
        ctx.teacherClasses = await store.fetchTeacherClasses(ctx.teacherClasses);
        state.user.teacherClasses = ctx.teacherClasses;
        save?.();

        if (!ctx.activeClassCode && ctx.teacherClasses.length) {
          ctx.activeClassCode = ctx.teacherClasses[0].code;
        }
      } catch (err) {
        console.error("CREATE CLASS ERROR:", err);
        toast(`❌ ${err?.message || "Не вдалося створити клас"}`);
      }

      if ((ctx.viewMode === "details" || ctx.viewMode === "student") && ctx.activeClassCode) {
        await loadStudents(ctx.activeClassCode);
      }
      if (ctx.viewMode === "student" && ctx.activeStudentId) {
        await loadActiveStudentAssignments();
      } else {
        ctx.activeStudentAssignments = [];
      }
      root.innerHTML = render();

      const modalHost = document.getElementById("teacherModalHost");
      if (modalHost) {
        modalHost.innerHTML = "";

        const cls = getActiveClass();
        const ui = getClassesUi();

        if (ctx.viewMode === "details" && cls && ui.showClassSettingsModal) {
          modalHost.innerHTML = renderClassSettingsModal(cls);
        }

        if (ctx.viewMode === "list" && ui.showCreateModal) {
          modalHost.innerHTML = renderCreateClassModal();
        }
      }

      bindEvents();
    }

    async function mount() {
      resetTransientTeacherClassesUi();
      await refreshAndRender();
    }

    return {
      render,
      mount,
      refreshAndRender,
      loadStudents,
      updateClassRecord,
      openClassByCode,
      openStudentById
    };
  }

  return { create };
})();
