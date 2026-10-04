// Обробники подій сторінки учня та селектів доступу до модулів/завдань.
window.App = window.App || {};

window.App.teacherClassesStudentEvents = (function () {
  "use strict";

  function create(deps) {
    const {
      onOpenAssignmentsForStudent,
      assignmentStore,
      loadActiveStudentAssignments,
      refreshAndRender,
      toast,
      $,
      getActiveStudent,
      setStudentModuleAccess,
      setStudentTaskAccess,
      getActiveClass,
      setClassModuleAccess,
      setClassTaskAccess
    } = deps;

    // Сторінка учня: дії зі списком виданих завдань.
    function bindStudentViewEvents(root) {
      root.querySelectorAll("[data-open-assignment-edit]").forEach((btn) => {
        btn.addEventListener("click", async () => {
          const studentId = btn.getAttribute("data-open-assignment-studentid") || "";
          const classCode = btn.getAttribute("data-open-assignment-classcode") || "";
          const assignmentTitle = btn.getAttribute("data-open-assignment-title") || "";

          if (!studentId || !classCode) return;

          await onOpenAssignmentsForStudent?.({
            classCode,
            studentId,
            assignmentTitle
          });
        });
      });

      root.querySelectorAll("[data-remove-student-assignment]").forEach((btn) => {
        btn.addEventListener("click", async () => {
          const assignmentId = btn.getAttribute("data-remove-student-assignment") || "";
          const studentId = btn.getAttribute("data-remove-student-id") || "";
          const assignmentTitle = btn.getAttribute("data-remove-student-title") || "завдання";

          if (!assignmentId || !studentId) return;
          if (!confirm(`Прибрати завдання "${assignmentTitle}" лише для цього учня?`)) return;

          btn.disabled = true;
          try {
            await assignmentStore.removeAssignmentForStudent(assignmentId, studentId);
            await loadActiveStudentAssignments();
            await refreshAndRender();
            toast("✅ Завдання прибрано лише для цього учня");
          } catch (err) {
            console.error(err);
            toast(`❌ ${err.message || "Не вдалося прибрати завдання"}`);
          } finally {
            btn.disabled = false;
          }
        });
      });

      const refreshStudentAssignmentsBtn = $("teacherRefreshStudentAssignmentsBtn");

      if (refreshStudentAssignmentsBtn) {
        refreshStudentAssignmentsBtn.onclick = async () => {
          refreshStudentAssignmentsBtn.disabled = true;

          try {
            await loadActiveStudentAssignments();
            await refreshAndRender();
            toast("✅ Список завдань учня оновлено");
          } catch (err) {
            console.error(err);
            toast("❌ Не вдалося оновити список завдань учня");
          } finally {
            refreshStudentAssignmentsBtn.disabled = false;
          }
        };
      }

      root.querySelectorAll("[data-open-assignments-student]").forEach((btn) => {
        btn.addEventListener("click", async () => {
          const studentId = btn.getAttribute("data-open-assignments-student") || "";
          const classCode = btn.getAttribute("data-open-assignments-classcode") || "";
          if (!studentId || !classCode) return;

          await onOpenAssignmentsForStudent?.({
            classCode,
            studentId
          });
        });
      });
    }

    // Селекти доступу до модулів/завдань для учня або всього класу.
    function bindAccessSelectEvents() {
      Array.from(document.querySelectorAll(".teacher-access-select:not([data-class-access-type])")).forEach(
        (select) => {
          select.addEventListener("change", async () => {
            const student = getActiveStudent();
            if (!student) return;

            const type = select.getAttribute("data-access-type");
            const courseId = select.getAttribute("data-course-id");
            const moduleId = select.getAttribute("data-module-id");
            const taskIndex = select.getAttribute("data-task-index");
            const value = select.value;

            select.disabled = true;

            try {
              if (type === "module") {
                await setStudentModuleAccess(student.id, courseId, moduleId, value);
                toast("✅ Доступ до модуля оновлено");
              }

              if (type === "task") {
                await setStudentTaskAccess(student.id, courseId, moduleId, taskIndex, value);
                toast("✅ Доступ до завдання оновлено");
              }

              await refreshAndRender();
            } catch (err) {
              console.error(err);
              toast("❌ Не вдалося оновити доступ");
            } finally {
              select.disabled = false;
            }
          });
        }
      );

      Array.from(document.querySelectorAll(".teacher-access-select[data-class-access-type]")).forEach(
        (select) => {
          select.addEventListener("change", async () => {
            const cls = getActiveClass();
            if (!cls) return;

            const type = select.getAttribute("data-class-access-type");
            const courseId = select.getAttribute("data-course-id");
            const moduleId = select.getAttribute("data-module-id");
            const taskIndex = select.getAttribute("data-task-index");
            const value = select.value;

            select.disabled = true;

            try {
              if (type === "module") {
                await setClassModuleAccess(cls.code, courseId, moduleId, value);
                toast("✅ Доступ до модуля для класу оновлено");
              }

              if (type === "task") {
                await setClassTaskAccess(cls.code, courseId, moduleId, taskIndex, value);
                toast("✅ Доступ до завдання для класу оновлено");
              }

              await refreshAndRender();
            } catch (err) {
              console.error(err);
              toast("❌ Не вдалося оновити доступ класу");
            } finally {
              select.disabled = false;
            }
          });
        }
      );
    }

    return { bindStudentViewEvents, bindAccessSelectEvents };
  }

  return { create };
})();
