// Обробники форм: збереження завдання в базу та видача завдань.
window.App = window.App || {};

window.App.teacherAssignmentsActions = (function () {
  "use strict";

  function create(deps) {
    const {
      ensureUiState,
      store,
      toast,
      save,
      loadData,
      renderView,
      bindEvents,
      ctx,
      getAutoModules,
      reloadStudents
    } = deps;

    async function handleTaskBankSubmit(form) {
      const ui = ensureUiState();
      const formData = new FormData(form);

      const payload = {
        title: formData.get("title"),
        description: formData.get("description"),
        source: "teacher",
        subject: formData.get("subject"),
        category: formData.get("category"),
        solutionFormat: formData.get("solutionFormat"),
        starterCode: formData.get("starterCode"),
        maxScore: formData.get("maxScore"),
        isPublic: formData.get("isPublic") === "on"
      };

      let savedTask = null;

      if (ui.isEditingTask && ui.editingTaskId) {
        savedTask = await store.updateTaskBankItem(ui.editingTaskId, payload);
        toast("✅ Завдання оновлено");
      } else {
        savedTask = await store.createTaskBankItem(payload);
        toast("✅ Завдання збережено в базу");
      }

      form.reset();

      ui.isCreatingTask = false;
      ui.isEditingTask = false;
      ui.editingTaskId = "";
      ui.previewTaskId = savedTask?.id ? String(savedTask.id) : ui.previewTaskId;

      save?.();
      await loadData();
      renderView();
      bindEvents();
    }

    async function handleIssueSubmit(form) {
      const ui = ensureUiState();
      const formData = new FormData(form);
      const taskSource = String(formData.get("taskSource") || "bank");

      ui.issueTargetType = String(formData.get("targetType") || "class");
      ui.issueClassCode = String(formData.get("classCode") || "");
      ui.issueStudentId = String(formData.get("studentId") || "");
      save?.();

      let tasksToAssign = [];

      if (taskSource === "bank") {
        const formTaskIds = formData
          .getAll("taskIdBank")
          .map((value) => String(value || "").trim())
          .filter(Boolean);

        const selectedIds = formTaskIds.length
          ? formTaskIds
          : (ui.selectedTaskIds || []).map(String).filter(Boolean);

        if (!selectedIds.length) {
          throw new Error("Оберіть хоча б одне ручне завдання");
        }

        tasksToAssign = ctx.taskBank.filter((item) => selectedIds.includes(String(item.id)));
      } else if (taskSource === "auto") {
        if (!ui.selectedAutoTaskIds.length) {
          throw new Error("Оберіть хоча б одне авто-завдання");
        }

        for (const selectedValue of ui.selectedAutoTaskIds) {
          const [, cId, mId, tIdx] = String(selectedValue).split("|");
          const autoMod = getAutoModules().find((m) => String(m.id) === String(mId));
          if (!autoMod) continue;

          const taskObj = autoMod.tasks?.[Number(tIdx)];
          if (!taskObj) continue;

          const safeStarterCode = `auto|${cId}|${mId}|${tIdx}`;

          let taskToAssign =
            ctx.taskBank.find((t) => String(t.starter_code || "").trim() === safeStarterCode) || null;

          if (!taskToAssign) {
            const rawDesc = taskObj.desc
              ? String(taskObj.desc)
                  .replace(/<[^>]*>?/gm, "")
                  .replace(/\s+/g, " ")
                  .trim()
              : "Практична задача з автоматичною перевіркою.";

            taskToAssign = await store.createTaskBankItem({
              title: `[Авто] ${taskObj.title || "Завдання"}`,
              description: rawDesc,
              source: "teacher",
              subject: "Практикум",
              category: autoMod.title || "Авто-практикум",
              solutionFormat: "code",
              starterCode: safeStarterCode,
              maxScore: 12,
              isPublic: false
            });

            ctx.taskBank = [taskToAssign, ...ctx.taskBank.filter((t) => t.id !== taskToAssign.id)];
          }

          tasksToAssign.push(taskToAssign);
        }
      } else if (taskSource === "quick") {
        const quickTitle = String(formData.get("quickTitle") || "").trim();
        const quickDesc = String(formData.get("quickDesc") || "").trim();

        if (!quickTitle) {
          throw new Error("Введіть назву для швидкого завдання");
        }

        const quickShadowCode = `__QUICK__|${Date.now()}|${Math.random().toString(36).slice(2, 8)}`;

        const quickTask = await store.createTaskBankItem({
          title: quickTitle,
          description: quickDesc || "Виконайте завдання згідно з інструкціями на уроці.",
          source: "teacher",
          subject: "Швидке завдання",
          category: "Швидкі",
          solutionFormat: "text",
          starterCode: quickShadowCode,
          maxScore: 12,
          isPublic: false
        });

        ctx.taskBank = [quickTask, ...ctx.taskBank.filter((t) => t.id !== quickTask.id)];
        tasksToAssign = [quickTask];
      }

      if (!tasksToAssign.length) {
        throw new Error("Не вдалося підготувати завдання для видачі");
      }

      const createdAssignments = [];

      for (const task of tasksToAssign) {
        const createdAssignment = await store.createAssignment({
          task,
          targetType: ui.issueTargetType,
          classCode: ui.issueClassCode,
          studentId: ui.issueStudentId,
          noteForStudent: formData.get("noteForStudent"),
          dueAt: formData.get("dueAt") || null,
          allowLateSubmission: true
        });

        createdAssignments.push(createdAssignment);
      }

      ctx.assignments = [
        ...createdAssignments.reverse(),
        ...ctx.assignments.filter((item) => !createdAssignments.some((created) => created.id === item.id))
      ];

      try {
        const freshAssignments = await store.fetchAssignments();
        if (Array.isArray(freshAssignments)) {
          ctx.assignments = freshAssignments;
        }
      } catch (err) {
        console.warn("Не вдалося оновити список призначених завдань із бази:", err);
      }

      const total = createdAssignments.length;
      toast(total === 1 ? "✅ Завдання успішно видано" : `✅ Успішно видано ${total} завдань`);

      form.reset();

      if (taskSource === "bank") {
        ui.selectedTaskIds = [];
        ui.previewTaskId = "";
      } else if (taskSource === "auto") {
        ui.selectedAutoTaskIds = [];
        ui.previewTaskId = "";
      } else if (taskSource === "quick") {
        ui.previewTaskId = "";
      }

      await reloadStudents();
      save?.();
      renderView();
      bindEvents();
    }

    return { handleTaskBankSubmit, handleIssueSubmit };
  }

  return { create };
})();
