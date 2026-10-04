// Збереження перевизначень доступу до модулів/завдань для класу або окремого учня.
window.App = window.App || {};

window.App.teacherClassesAccess = (function () {
  "use strict";

  function create(deps) {
    const { ctx, getStudentProgress, store, getCourseAccessTree, updateClassRecord } = deps;

    async function setStudentModuleAccess(studentId, courseId, moduleId, value) {
      const student = ctx.activeStudents.find((s) => s.id === studentId);
      if (!student) throw new Error("Student not found");

      const progress = structuredClone(getStudentProgress(student));
      progress.user = progress.user || {};
      progress.user.moduleAccess = progress.user.moduleAccess || {};
      progress.user.moduleAccess[courseId] = progress.user.moduleAccess[courseId] || {};

      if (!value || value === "auto") {
        delete progress.user.moduleAccess[courseId][moduleId];
        if (!Object.keys(progress.user.moduleAccess[courseId]).length) {
          delete progress.user.moduleAccess[courseId];
        }
      } else {
        progress.user.moduleAccess[courseId][moduleId] = value;
      }

      await store.saveStudentProgress(studentId, progress);
      student.progress = progress;
    }

    async function setStudentTaskAccess(studentId, courseId, moduleId, taskIndex, value) {
      const student = ctx.activeStudents.find((s) => s.id === studentId);
      if (!student) throw new Error("Student not found");

      const progress = structuredClone(getStudentProgress(student));
      progress.user = progress.user || {};

      progress.user.moduleAccess = progress.user.moduleAccess || {};
      progress.user.moduleAccess[courseId] = progress.user.moduleAccess[courseId] || {};

      progress.user.taskAccess = progress.user.taskAccess || {};
      progress.user.taskAccess[courseId] = progress.user.taskAccess[courseId] || {};
      progress.user.taskAccess[courseId][moduleId] = progress.user.taskAccess[courseId][moduleId] || {};

      if (!value || value === "auto") {
        delete progress.user.taskAccess[courseId][moduleId][taskIndex];

        if (!Object.keys(progress.user.taskAccess[courseId][moduleId]).length) {
          delete progress.user.taskAccess[courseId][moduleId];
        }
        if (!Object.keys(progress.user.taskAccess[courseId]).length) {
          delete progress.user.taskAccess[courseId];
        }
      } else {
        progress.user.taskAccess[courseId][moduleId][taskIndex] = value;
      }

      // якщо відкрили конкретне завдання — відкриваємо і модуль
      if (value === "unlocked") {
        progress.user.moduleAccess[courseId][moduleId] = "unlocked";
      }

      await store.saveStudentProgress(studentId, progress);
      student.progress = progress;
    }

    async function setClassOpenAllAccess(classCode, enabled) {
      const cls = ctx.teacherClasses.find((c) => c.code === classCode);
      if (!cls) throw new Error("Class not found");

      const courses = getCourseAccessTree();

      if (!enabled) {
        await updateClassRecord(classCode, {
          module_access: {},
          task_access: {}
        });

        cls.module_access = {};
        cls.task_access = {};
        return;
      }

      const nextModuleAccess = {};
      courses.forEach((course) => {
        nextModuleAccess[course.courseId] = {};
        (course.modules || []).forEach((module) => {
          nextModuleAccess[course.courseId][module.moduleId] = "unlocked";
        });
      });

      await updateClassRecord(classCode, {
        module_access: nextModuleAccess,
        task_access: {}
      });

      cls.module_access = nextModuleAccess;
      cls.task_access = {};
    }

    async function setClassModuleAccess(classCode, courseId, moduleId, value) {
      const cls = ctx.teacherClasses.find((c) => c.code === classCode);
      if (!cls) throw new Error("Class not found");

      const nextAccess = structuredClone(cls.module_access || {});
      nextAccess[courseId] = nextAccess[courseId] || {};

      if (!value || value === "auto") {
        delete nextAccess[courseId][moduleId];
        if (!Object.keys(nextAccess[courseId]).length) delete nextAccess[courseId];
      } else {
        nextAccess[courseId][moduleId] = value;
      }

      await updateClassRecord(classCode, { module_access: nextAccess });
      cls.module_access = nextAccess;
    }

    async function setClassTaskAccess(classCode, courseId, moduleId, taskIndex, value) {
      const cls = ctx.teacherClasses.find((c) => c.code === classCode);
      if (!cls) throw new Error("Class not found");

      const nextAccess = structuredClone(cls.task_access || {});
      const nextModuleAccess = structuredClone(cls.module_access || {});

      nextAccess[courseId] = nextAccess[courseId] || {};
      nextAccess[courseId][moduleId] = nextAccess[courseId][moduleId] || {};

      if (!value || value === "auto") {
        delete nextAccess[courseId][moduleId][taskIndex];
        if (!Object.keys(nextAccess[courseId][moduleId]).length) delete nextAccess[courseId][moduleId];
        if (!Object.keys(nextAccess[courseId]).length) delete nextAccess[courseId];
      } else {
        nextAccess[courseId][moduleId][taskIndex] = value;
      }

      // якщо конкретне завдання відкрили — модуль теж відкриваємо
      if (value === "unlocked") {
        nextModuleAccess[courseId] = nextModuleAccess[courseId] || {};
        nextModuleAccess[courseId][moduleId] = "unlocked";
      }

      await updateClassRecord(classCode, {
        task_access: nextAccess,
        module_access: nextModuleAccess
      });

      cls.task_access = nextAccess;
      cls.module_access = nextModuleAccess;
    }

    return {
      setStudentModuleAccess,
      setStudentTaskAccess,
      setClassOpenAllAccess,
      setClassModuleAccess,
      setClassTaskAccess
    };
  }

  return { create };
})();
