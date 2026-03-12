window.App = window.App || {};

window.App.progress = (function () {
  "use strict";

  function create(deps) {
    const {
      state,
      save,
      DB,
      TASKS,
      getCourseLevel
    } = deps;

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

    function isSpoiled(id) {
      return !!state.user?.spoiled?.[id];
    }

    function setSpoiled(id) {
      state.user.spoiled = state.user.spoiled || {};
      state.user.spoiled[id] = true;
      save();
    }

    function getDraft(id) {
      return state.user?.drafts?.[id] ?? "";
    }

    function setDraft(id, code) {
      state.user.drafts = state.user.drafts || {};
      state.user.drafts[id] = code;
      save();
    }
    function getErrorLogs(id) {
  return state.user?.errorLogs?.[id] || [];
}

function addErrorLog(id, payload) {
  state.user.errorLogs = state.user.errorLogs || {};
  state.user.errorLogs[id] = state.user.errorLogs[id] || [];

state.user.errorLogs[id].unshift({
  at: new Date().toISOString(),
  ...(payload || {})
});

  // залишаємо лише останні 20 записів
  state.user.errorLogs[id] = state.user.errorLogs[id].slice(0, 20);

  save();
}

    function getModuleTasks(courseId, moduleId) {
      const course = DB.find(c => c.id === courseId);
      const mod = course?.modules.find(m => m.id === moduleId);
      if (!course || !mod) return [];

      if (Array.isArray(mod.tasks)) return mod.tasks;

      if (Array.isArray(mod.taskRefs) && typeof TASKS === "object") {
        return mod.taskRefs.map(id => TASKS[id]).filter(Boolean);
      }

      return [];
    }

    function visibleTaskRefs(courseId, moduleId) {
      const tasks = getModuleTasks(courseId, moduleId);
      const level = (typeof getCourseLevel === "function" ? getCourseLevel(courseId) : null) || "Junior";

      return tasks
        .map((t, origIdx) => ({ t, origIdx }))
        .filter(({ t }) => {
          const d = t.difficulty || "Junior";
          return d === "all" || d === level;
        });
    }

    function courseProgress(course) {
      let total = 0;
      let done = 0;
      const lvl = getCourseLevel(course.id) || "Junior";

      course.modules.forEach(m => {
        getModuleTasks(course.id, m.id).forEach((t, idx) => {
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
      const refs = visibleTaskRefs(courseId, moduleId);
      if (!refs.length) return { done: 0, total: 0 };

      let done = 0;
      refs.forEach(r => {
        if (isDone(courseId, moduleId, r.origIdx)) done++;
      });

      return { done, total: refs.length };
    }

    function isModuleCompleted(courseId, moduleId) {
      const mp = moduleProgress(courseId, moduleId);
      return mp.total > 0 && mp.done === mp.total;
    }

    function calculateBonuses({ baseXp, attemptsBefore, taskId, courseId }) {
      let sniper = 0;
      let speed = 0;
      let streakBonus = 0;

      if (attemptsBefore === 0) {
        sniper = Math.round(baseXp * 0.2);
      }

      const session = state.user.taskSession;
      if (session && session.id === taskId) {
        const elapsedSec = (Date.now() - session.startedAt) / 1000;
        const level = (typeof getCourseLevel === "function" ? getCourseLevel(courseId) : null) || "Junior";
        let limit = (level === "Senior") ? 360 : (level === "Middle") ? 240 : 180;

        if (elapsedSec <= limit) {
          speed = Math.round(baseXp * 0.1);
        }
      }

      const streak = state.user.streak || 1;
      streakBonus = Math.min(10, streak);

      return { sniper, speed, streakBonus };
    }

return {
  uid,
  completionState,
  setCompleted,
  isDone,
  getAttempts,
  incAttempts,
  isSpoiled,
  setSpoiled,
  getDraft,
  setDraft,
  getErrorLogs,
  addErrorLog,
  getModuleTasks,
  visibleTaskRefs,
  courseProgress,
  moduleProgress,
  isModuleCompleted,
  calculateBonuses
};
  }

  return { create };
})();
