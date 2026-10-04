// UI-стан вкладки «Завдання» та відфільтровані/вибрані списки на його основі.
window.App = window.App || {};

window.App.teacherAssignmentsState = (function () {
  "use strict";

  function create(deps) {
    const { state, ctx } = deps;

    // ==================================================
    // 1. СТАН UI
    // ==================================================
    function ensureUiState() {
      state.teacherAssignmentsUI = state.teacherAssignmentsUI || {
        mainTab: "issue",
        bankCategory: "mine",
        isCreatingTask: false,
        isEditingTask: false,
        editingTaskId: "",
        previewTaskId: "",
        selectedTaskIds: [],
        selectedAutoTaskIds: [],
        selectedAutoModuleId: "",
        issueClassCode: "",
        issueTargetType: "class",
        issueStudentId: "",
        issueSource: "bank",
        issuedSearch: "",
        issuedClassFilter: "all",
        issuedStudentFilter: "all",
        issuedStatusFilter: "all",
        bankThemeFilter: "all",
        issueThemeFilter: "all",
        issueAutoLevelFilter: "all",
        issueAutoModuleFilter: "all",
        issueTaskSearch: "",
        bankTaskSearch: ""
      };

      if (!("issuedStudentFilter" in state.teacherAssignmentsUI)) {
        state.teacherAssignmentsUI.issuedStudentFilter = "all";
      }
      // міграція зі старого стану
      if (typeof state.teacherAssignmentsUI.selectedTaskId === "string") {
        const sid = String(state.teacherAssignmentsUI.selectedTaskId || "").trim();

        if (sid.startsWith("auto|")) {
          if (sid && !state.teacherAssignmentsUI.selectedAutoTaskIds.includes(sid)) {
            state.teacherAssignmentsUI.selectedAutoTaskIds = [sid];
          }
          state.teacherAssignmentsUI.previewTaskId = sid;
        } else {
          state.teacherAssignmentsUI.selectedTaskIds = sid ? [sid] : [];
          state.teacherAssignmentsUI.previewTaskId = sid;
        }

        delete state.teacherAssignmentsUI.selectedTaskId;
      }

      if (!Array.isArray(state.teacherAssignmentsUI.selectedTaskIds)) {
        state.teacherAssignmentsUI.selectedTaskIds = [];
      }

      if (!Array.isArray(state.teacherAssignmentsUI.selectedAutoTaskIds)) {
        state.teacherAssignmentsUI.selectedAutoTaskIds = [];
      }

      if (!("issueAutoLevelFilter" in state.teacherAssignmentsUI)) {
        state.teacherAssignmentsUI.issueAutoLevelFilter = "all";
      }

      if (!("issueTaskSearch" in state.teacherAssignmentsUI)) {
        state.teacherAssignmentsUI.issueTaskSearch = "";
      }

      if (!("bankTaskSearch" in state.teacherAssignmentsUI)) {
        state.teacherAssignmentsUI.bankTaskSearch = "";
      }

      if (state.teacherAssignmentsUI.mainTab === "bank") {
        state.teacherAssignmentsUI.mainTab = "issue";
      }

      if (state.teacherAssignmentsUI.mainTab === "grading") {
        state.teacherAssignmentsUI.mainTab = "review";
      }

      if (!["issue", "review"].includes(state.teacherAssignmentsUI.mainTab)) {
        state.teacherAssignmentsUI.mainTab = "issue";
      }

      if (!("bankCategory" in state.teacherAssignmentsUI)) {
        state.teacherAssignmentsUI.bankCategory = "mine";
      }

      if (!("bankThemeFilter" in state.teacherAssignmentsUI)) {
        state.teacherAssignmentsUI.bankThemeFilter = "all";
      }

      if (!("issueThemeFilter" in state.teacherAssignmentsUI)) {
        state.teacherAssignmentsUI.issueThemeFilter = "all";
      }

      if (!("issuedStudentFilter" in state.teacherAssignmentsUI)) {
        state.teacherAssignmentsUI.issuedStudentFilter = "all";
      }

      return state.teacherAssignmentsUI;
    }

    // ==================================================
    // 2. ІНТЕГРАЦІЯ З АВТО-ПРАКТИКУМАМИ
    // ==================================================
    function getAutoModules() {
      const allModules = [];
      (window.PRACTICE_DB || []).forEach((item) => {
        if (!item.modules) {
          allModules.push({ courseId: "practice", courseTitle: "Практикум", ...item });
        } else {
          item.modules.forEach((mod) =>
            allModules.push({ courseId: item.id, courseTitle: item.title || item.id, ...mod })
          );
        }
      });
      return allModules;
    }

    function getFilteredTaskBank() {
      return ctx.taskBank.filter((task) => {
        const starter = String(task.starter_code || "").trim();
        const format = String(task.solution_format || "").trim();
        const source = String(task.source || "").trim();

        const isLibrary = source === "library";
        const isQuickShadow = starter.startsWith("__QUICK__|");
        const isAutoShadow =
          starter.startsWith("auto|") ||
          starter.startsWith("auto_module|") ||
          format.startsWith("auto_module|");

        return !isLibrary && !isQuickShadow && !isAutoShadow;
      });
    }

    function getTaskThemeLabel(task) {
      const category = String(task?.category || "").trim();
      return category || "Без теми";
    }

    function getManualThemes() {
      const themes = Array.from(
        new Set(
          getFilteredTaskBank()
            .map((task) => getTaskThemeLabel(task))
            .filter(Boolean)
        )
      );
      return themes.sort((a, b) => a.localeCompare(b, "uk"));
    }

    function getManualTasksByTheme(themeValue = "all") {
      const allTasks = getFilteredTaskBank();
      if (!themeValue || themeValue === "all") return allTasks;
      return allTasks.filter((task) => getTaskThemeLabel(task) === themeValue);
    }

    function ensureSelectedTaskInsideTheme(themeValue = "all") {
      const ui = ensureUiState();
      const filtered = getManualTasksByTheme(themeValue);
      const filteredIds = new Set(filtered.map((task) => String(task.id)));

      ui.selectedTaskIds = (ui.selectedTaskIds || []).map(String).filter((id) => filteredIds.has(id));

      if (!filtered.length) {
        ui.previewTaskId = "";
        return;
      }

      if (!ui.previewTaskId || !filteredIds.has(String(ui.previewTaskId))) {
        ui.previewTaskId = ui.selectedTaskIds[0] || String(filtered[0].id);
      }
    }

    function ensureSelectedIssueAutoTask() {
      const ui = ensureUiState();
      const autoModules = getAutoModules();
      const availableIds = new Set();

      autoModules.forEach((mod) => {
        (mod.tasks || []).forEach((_, index) => {
          availableIds.add(`auto|${mod.courseId}|${mod.id}|${index}`);
        });
      });

      ui.selectedAutoTaskIds = (ui.selectedAutoTaskIds || [])
        .map(String)
        .filter((id) => availableIds.has(id));

      if (autoModules.length && !autoModules.some((m) => String(m.id) === String(ui.selectedAutoModuleId))) {
        ui.selectedAutoModuleId = autoModules[0].id;
      }

      if (!autoModules.length) {
        ui.selectedAutoModuleId = "";
      }
    }

    function getFilteredAssignments() {
      const ui = ensureUiState();
      const q = String(ui.issuedSearch || "")
        .trim()
        .toLowerCase();
      const classFilter = ui.issuedClassFilter || "all";
      const studentFilter = ui.issuedStudentFilter || "all";
      const statusFilter = ui.issuedStatusFilter || "all";

      return ctx.assignments.filter((item) => {
        const matchesSearch =
          !q ||
          String(item.title_snapshot || "")
            .toLowerCase()
            .includes(q) ||
          String(item.class_code || "")
            .toLowerCase()
            .includes(q) ||
          String(item.note_for_student || "")
            .toLowerCase()
            .includes(q);

        const matchesClass = classFilter === "all" || String(item.class_code || "") === String(classFilter);

        const subs = getSubmissionsForAssignment(item.id);

        const isDirectStudentAssignment =
          studentFilter !== "all" &&
          String(item.target_type || "") === "student" &&
          String(item.student_id || "") === String(studentFilter);

        const isClassAssignmentForChosenStudent =
          studentFilter !== "all" &&
          String(item.target_type || "") === "class" &&
          classFilter !== "all" &&
          String(item.class_code || "") === String(classFilter);

        const relevantSubs =
          studentFilter === "all"
            ? subs
            : subs.filter((s) => String(s.student_id || "") === String(studentFilter));

        const matchesStudent =
          studentFilter === "all" ||
          isDirectStudentAssignment ||
          isClassAssignmentForChosenStudent ||
          relevantSubs.length > 0;

        let matchesStatus = true;

        if (statusFilter !== "all") {
          if (["submitted", "review", "reviewed", "returned"].includes(statusFilter)) {
            matchesStatus = relevantSubs.some(
              (s) => String(s.status || "submitted") === String(statusFilter)
            );
          } else if (statusFilter === "missing") {
            if (studentFilter !== "all") {
              matchesStatus = relevantSubs.length === 0;
            } else if (String(item.target_type || "") === "student") {
              matchesStatus = relevantSubs.length === 0;
            } else if (String(item.target_type || "") === "class" && classFilter !== "all") {
              const hidden = Array.isArray(item.hidden_for_students)
                ? item.hidden_for_students.map((id) => String(id))
                : [];

              const expectedStudentIds = (ctx.classStudents || [])
                .map((student) => String(student.id || ""))
                .filter((id) => id && !hidden.includes(id));

              const submittedIds = new Set(subs.map((s) => String(s.student_id || "")).filter(Boolean));

              matchesStatus =
                expectedStudentIds.length > 0 && expectedStudentIds.some((id) => !submittedIds.has(id));
            } else {
              matchesStatus = relevantSubs.length === 0;
            }
          } else if (["active", "closed"].includes(statusFilter)) {
            matchesStatus = String(item.status || "active") === String(statusFilter);
          }
        }

        return matchesSearch && matchesClass && matchesStudent && matchesStatus;
      });
    }

    function getSubmissionsForAssignment(assignmentId) {
      return ctx.submissions.filter((item) => item.assignment_id === assignmentId);
    }

    return {
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
    };
  }

  return { create };
})();
