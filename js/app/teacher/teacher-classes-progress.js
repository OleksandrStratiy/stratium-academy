// Чисті функції для читання прогресу учня та правил доступу класу/учня.
window.App = window.App || {};

window.App.teacherClassesProgress = (function () {
  "use strict";

  function create() {
    function getStudentXP(student) {
      return Number(student?.progress?.user?.xp || 0);
    }

    function getStudentAttempts(student) {
      const attempts = student?.progress?.user?.attempts || {};
      return Object.values(attempts).reduce((sum, val) => sum + Number(val || 0), 0);
    }

    function getStudentCompletedCount(student) {
      const progress = getStudentProgress(student);
      const completedIds = Object.keys(progress?.user?.completed || {});
      const solutionIds = Object.keys(progress?.user?.solutions || {});
      return new Set([...completedIds, ...solutionIds]).size;
    }

    function getStudentLastActiveDays(student) {
      if (!student?.updated_at) return null;

      const d = new Date(student.updated_at);
      if (Number.isNaN(d.getTime())) return null;

      return Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24));
    }

    function getStudentProgress(student) {
      return student?.progress || { user: {} };
    }

    function getModuleAccessState(student, courseId, moduleId) {
      const progress = getStudentProgress(student);

      const nestedValue = progress?.user?.moduleAccess?.[courseId]?.[moduleId];
      if (nestedValue) return nestedValue;

      const legacyKey = `${courseId}::${moduleId}`;
      return progress?.user?.moduleAccess?.[legacyKey] || "auto";
    }

    function getTaskAccessState(student, courseId, moduleId, taskIndex) {
      const progress = getStudentProgress(student);

      const nestedValue = progress?.user?.taskAccess?.[courseId]?.[moduleId]?.[taskIndex];
      if (nestedValue) return nestedValue;

      const legacyKey = `${courseId}::${moduleId}::${taskIndex}`;
      return progress?.user?.taskAccess?.[legacyKey] || "auto";
    }

    function getCourseAccessTree() {
      return (window.DB || [])
        .map((course) => {
          const modules = (course.modules || []).map((mod) => {
            const tasks = (mod.tasks || []).map((task, index) => {
              const rawDifficulty = String(task?.difficulty || task?.taskDifficulty || "Junior")
                .trim()
                .toLowerCase();

              const normalizedDifficulty =
                rawDifficulty === "middle" ? "Middle" : rawDifficulty === "senior" ? "Senior" : "Junior";

              return {
                courseId: course.id,
                moduleId: mod.id,
                taskIndex: index,
                taskTitle: task?.title || `Завдання ${index + 1}`,
                taskDifficulty: normalizedDifficulty
              };
            });

            return {
              courseId: course.id,
              courseTitle: course.title || course.id,
              moduleId: mod.id,
              moduleTitle: mod.title || mod.id,
              tasks
            };
          });

          return {
            courseId: course.id,
            courseTitle: course.title || course.id,
            modules
          };
        })
        .filter((course) => course.modules.length);
    }

    function getTaskCompletionKey(courseId, moduleId, taskIndex) {
      return `${courseId}_${moduleId}_${taskIndex}`;
    }

    function getStudentCompletionState(student, taskId) {
      const progress = getStudentProgress(student);
      const direct = progress?.user?.completed?.[taskId] || null;
      if (direct) return direct;

      const hasSavedSolution =
        progress?.user?.solutions && Object.prototype.hasOwnProperty.call(progress.user.solutions, taskId);

      if (!hasSavedSolution) return null;

      if (progress?.user?.spoiled?.[taskId]) return "no_xp";
      return "xp";
    }

    function isStudentTaskDone(student, courseId, moduleId, taskIndex) {
      const taskId = getTaskCompletionKey(courseId, moduleId, taskIndex);
      return !!getStudentCompletionState(student, taskId);
    }

    function getStudentCourseSummary(student, course) {
      const modules = course?.modules || [];

      let totalModules = modules.length;
      let completedModules = 0;
      let totalTasks = 0;
      let completedTasks = 0;
      let customRules = 0;

      modules.forEach((module) => {
        const moduleState = getModuleAccessState(student, course.courseId, module.moduleId);
        if (moduleState !== "auto") {
          customRules += 1;
        }

        const tasks = module.tasks || [];
        let moduleDoneTasks = 0;

        tasks.forEach((task) => {
          totalTasks += 1;

          const taskState = getTaskAccessState(student, task.courseId, task.moduleId, task.taskIndex);

          if (taskState !== "auto") {
            customRules += 1;
          }

          if (isStudentTaskDone(student, task.courseId, task.moduleId, task.taskIndex)) {
            completedTasks += 1;
            moduleDoneTasks += 1;
          }
        });

        if (tasks.length > 0 && moduleDoneTasks === tasks.length) {
          completedModules += 1;
        }
      });

      const percent = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

      return {
        totalModules,
        completedModules,
        totalTasks,
        completedTasks,
        customRules,
        percent
      };
    }

    function getClassModuleAccessState(classRow, courseId, moduleId) {
      return classRow?.module_access?.[courseId]?.[moduleId] || "auto";
    }

    function getClassTaskAccessState(classRow, courseId, moduleId, taskIndex) {
      return classRow?.task_access?.[courseId]?.[moduleId]?.[taskIndex] || "auto";
    }

    function isClassFullyUnlocked(classRow) {
      if (!classRow) return false;

      const courses = getCourseAccessTree();
      if (!courses.length) return false;

      return courses.every((course) =>
        (course.modules || []).every(
          (module) => getClassModuleAccessState(classRow, course.courseId, module.moduleId) === "unlocked"
        )
      );
    }

    return {
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
    };
  }

  return { create };
})();
