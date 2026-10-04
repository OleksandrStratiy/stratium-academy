window.App = window.App || {};

window.App.teacherAssignments = (function () {
  "use strict";

  function create(deps) {
    const { $, state, save, toast, supa, onBackToClasses } = deps;

    const store = window.App.teacherAssignmentStore.create({
      state,
      save,
      toast,
      supa
    });

    // Дані з Supabase; передаються підмодулям за посиланням.
    const ctx = {
      teacherClasses: [],
      classStudents: [],
      taskBank: [],
      assignments: [],
      submissions: []
    };

    const stateLib = window.App.teacherAssignmentsState.create({ state, ctx });
    const {
      ensureUiState,
      getAutoModules,
      getFilteredTaskBank,
      getTaskThemeLabel,
      getManualThemes,
      getManualTasksByTheme,
      ensureSelectedTaskInsideTheme,
      ensureSelectedIssueAutoTask,
      getFilteredAssignments,
      getSubmissionsForAssignment
    } = stateLib;

    const issuePanelsLib = window.App.teacherAssignmentsIssuePanels.create({
      escapeHtml,
      getTaskThemeLabel,
      ctx,
      ensureUiState
    });
    const { renderBankSourcePanel, renderAutoSourcePanel } = issuePanelsLib;

    const issueViewLib = window.App.teacherAssignmentsIssueView.create({
      ensureUiState,
      getFilteredTaskBank,
      getManualThemes,
      getManualTasksByTheme,
      getAutoModules,
      renderBankSourcePanel,
      renderAutoSourcePanel,
      ctx,
      escapeHtml
    });
    const { renderIssueTab } = issueViewLib;

    const reviewViewLib = window.App.teacherAssignmentsReviewView.create({
      ensureUiState,
      getFilteredAssignments,
      escapeHtml,
      ctx,
      getSubmissionsForAssignment,
      formatDate
    });
    const { renderReviewTab } = reviewViewLib;

    const actionsLib = window.App.teacherAssignmentsActions.create({
      ensureUiState,
      store,
      toast,
      save,
      loadData,
      renderView,
      bindEvents: (...args) => bindEvents(...args),
      ctx,
      getAutoModules,
      reloadStudents
    });
    const { handleTaskBankSubmit, handleIssueSubmit } = actionsLib;

    const eventsLib = window.App.teacherAssignmentsEvents.create({
      $,
      ensureUiState,
      save,
      renderView,
      handleTaskBankSubmit,
      toast,
      store,
      loadData,
      ensureSelectedTaskInsideTheme,
      ensureSelectedIssueAutoTask,
      handleIssueSubmit,
      reloadStudents,
      ctx
    });
    const { bindEvents } = eventsLib;

    function escapeHtml(str) {
      return String(str || "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    }

    function formatDate(value) {
      if (!value) return "Без дедлайну";
      const d = new Date(value);
      if (Number.isNaN(d.getTime())) return "Без дедлайну";
      return (
        d.toLocaleDateString("uk-UA", { day: "2-digit", month: "2-digit", year: "numeric" }) +
        " " +
        d.toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" })
      );
    }

    function renderView() {
      const root = $("teacherInnerView");
      if (!root) return;

      const ui = ensureUiState();

      root.innerHTML = `
  <section class="teacher-panel">
    ${ui.mainTab === "review" ? renderReviewTab() : renderIssueTab()}
  </section>
`;

      const targetTypeSelect = $("assignmentTargetType");
      if (targetTypeSelect) {
        targetTypeSelect.value = ui.issueTargetType || "class";
      }

      const classSelect = $("assignmentClassCode");
      if (classSelect) {
        classSelect.value = ui.issueClassCode || "";
      }

      const studentSelect = $("assignmentStudentId");
      if (studentSelect) {
        studentSelect.value = ui.issueStudentId || "";
      }
    }

    async function reloadStudents() {
      const ui = ensureUiState();
      if (!ui.issueClassCode) {
        ctx.classStudents = [];
        ui.issueStudentId = "";
        save?.();
        return;
      }
      ctx.classStudents = await store.fetchStudentsByClass(ui.issueClassCode);
      if (!ctx.classStudents.some((student) => student.id === ui.issueStudentId)) {
        ui.issueStudentId = ctx.classStudents[0]?.id || "";
      }
      save?.();
    }

    async function loadData() {
      if (loadData._busy) return;
      loadData._busy = true;

      try {
        const ui = ensureUiState();

        const [classes, tasks, issued] = await Promise.all([
          store.fetchTeacherClasses(),
          store.fetchTaskBank(),
          store.fetchAssignments()
        ]);

        ctx.teacherClasses = classes || [];
        ctx.taskBank = tasks || [];
        ctx.assignments = issued || [];
        ctx.submissions = await store.fetchSubmissionsByAssignmentIds(ctx.assignments.map((item) => item.id));

        if (!ctx.teacherClasses.some((cls) => cls.code === ui.issueClassCode)) {
          ui.issueClassCode = ctx.teacherClasses[0]?.code || "";
        }

        const visibleManualTasks = getManualTasksByTheme(ui.issueThemeFilter || "all");
        const visibleManualIds = new Set(visibleManualTasks.map((task) => String(task.id)));

        ui.selectedTaskIds = (ui.selectedTaskIds || []).map(String).filter((id) => visibleManualIds.has(id));

        if (ui.previewTaskId && !visibleManualIds.has(String(ui.previewTaskId))) {
          ui.previewTaskId = ui.selectedTaskIds[0] || visibleManualTasks[0]?.id || "";
        }

        if (!ui.previewTaskId) {
          ui.previewTaskId = ui.selectedTaskIds[0] || visibleManualTasks[0]?.id || "";
        }

        const autoModules = getAutoModules();

        if (
          autoModules.length &&
          !autoModules.some((m) => String(m.id) === String(ui.selectedAutoModuleId))
        ) {
          ui.selectedAutoModuleId = autoModules[0].id;
        }

        const availableAutoIds = new Set();
        autoModules.forEach((mod) => {
          (mod.tasks || []).forEach((_, index) => {
            availableAutoIds.add(`auto|${mod.courseId}|${mod.id}|${index}`);
          });
        });

        ui.selectedAutoTaskIds = (ui.selectedAutoTaskIds || [])
          .map(String)
          .filter((id) => availableAutoIds.has(id));

        await reloadStudents();

        if (ui.issuedClassFilter && ui.issuedClassFilter !== "all") {
          ctx.classStudents = await store.fetchStudentsByClass(ui.issuedClassFilter);
        } else if (ui.mainTab === "review") {
          ctx.classStudents = [];
        }

        save?.();
      } finally {
        loadData._busy = false;
      }
    }

    function renderLoading() {
      return `<section class="teacher-panel"><section class="teacher-card"><div class="teacher-empty">Завантаження вкладки завдань...</div></section></section>`;
    }

    async function mount() {
      const root = $("teacherInnerView");
      if (!root) return;
      root.innerHTML = renderLoading();
      try {
        await loadData();
        renderView();
        bindEvents();
      } catch (err) {
        console.error(err);
        root.innerHTML = `<section class="teacher-panel"><section class="teacher-card"><div class="teacher-empty">❌ Не вдалося завантажити завдання</div></section></section>`;
      }
    }

    return { renderLoading, mount };
  }

  return { create };
})();
