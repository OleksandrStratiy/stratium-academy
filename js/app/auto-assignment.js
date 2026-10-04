// Оцінювання й синхронізація авто-завдань, виданих учителем, та їхнє вікно успіху.
window.App = window.App || {};

window.App.autoAssignment = (function () {
  "use strict";

  function create(deps) {
    const { supa, state, uid, completionState, getAttempts, save, toast, $, goto } = deps;

    function calculateAssignedAutoPoints({ attemptsFailed = 0, dueAt = null }) {
      const start = 12;
      const failed = Math.max(0, Number(attemptsFailed || 0));
      const attemptPenalty = Math.floor(failed / 2);

      let latePenalty = 0;
      if (dueAt) {
        const dueTs = new Date(dueAt).getTime();
        if (!Number.isNaN(dueTs) && Date.now() > dueTs) {
          latePenalty = 2;
        }
      }

      const total = Math.max(1, start - attemptPenalty - latePenalty);

      return {
        start,
        failed,
        attemptPenalty,
        latePenalty,
        total,
        isLate: latePenalty > 0
      };
    }

    async function upsertAutoAssignmentCompletion(
      assignmentId,
      courseId,
      moduleId,
      taskIndex,
      taskTitle = "",
      points = null,
      submissionText = ""
    ) {
      if (!supa || !assignmentId || state?.user?.role !== "student") return false;

      const {
        data: { user },
        error: authError
      } = await supa.auth.getUser();
      if (authError || !user?.id) return false;

      const taskId = uid(courseId, moduleId, taskIndex);
      const isDoneNow = !!completionState(taskId);
      if (!isDoneNow) return false;

      const payload = {
        assignment_id: assignmentId,
        student_id: user.id,
        submission_text:
          submissionText || `Авто-завдання виконано: ${taskTitle || `Завдання ${Number(taskIndex) + 1}`}.`,
        status: "reviewed",
        points,
        submitted_at: new Date().toISOString(),
        reviewed_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { error } = await supa
        .from("assignment_submissions")
        .upsert(payload, { onConflict: "assignment_id,student_id" });

      if (error) throw error;
      return true;
    }

    async function finalizeActiveAutoAssignment(courseId, moduleId, taskIndex, taskTitle = "") {
      const active = state.activeAutoAssignment || null;
      if (!active) return null;

      if (
        String(active.courseId) !== String(courseId) ||
        String(active.moduleId) !== String(moduleId) ||
        Number(active.taskIndex) !== Number(taskIndex)
      ) {
        return null;
      }

      const taskId = uid(courseId, moduleId, taskIndex);
      const score = calculateAssignedAutoPoints({
        attemptsFailed: getAttempts(taskId),
        dueAt: active.dueAt || null
      });

      const summary =
        `Авто-завдання виконано: ${taskTitle || `Завдання ${Number(taskIndex) + 1}`}. ` +
        `Бал: ${score.total}/12. ` +
        `Невдалих спроб: ${score.failed}. ` +
        `${score.isLate ? "Прострочено." : "Вчасно."}`;

      const saved = await upsertAutoAssignmentCompletion(
        active.assignmentId,
        courseId,
        moduleId,
        taskIndex,
        taskTitle,
        score.total,
        summary
      );

      if (saved) {
        state.activeAutoAssignment = {
          ...active,
          completedAt: new Date().toISOString(),
          isCompleted: true
        };
        save();
        toast("✅ Авто-завдання зараховано у вкладці «Мої завдання»");
      }

      return null;
    }

    function restoreSuccessOverlayXpMode() {
      const baseLabel = $("xpBase")?.parentElement?.querySelector("span");
      const sniperLabel = $("xpSniper")?.parentElement?.querySelector("span");
      const speedLabel = $("xpSpeed")?.parentElement?.querySelector("span");
      const streakLabel = $("xpStreak")?.parentElement?.querySelector("span");
      const totalLabel = $("xpTotal")?.parentElement?.querySelector("span");

      if (baseLabel) baseLabel.textContent = "⭐ Базові XP:";
      if (sniperLabel) sniperLabel.textContent = "🎯 Снайпер:";
      if (speedLabel) speedLabel.textContent = "⚡ Швидкість:";
      if (streakLabel) streakLabel.textContent = "🔥 Бонус за стрік:";
      if (totalLabel) totalLabel.textContent = "Усього:";

      const btnNext = $("btnSuccessNext");
      if (btnNext) {
        btnNext.style.display = "";
        btnNext.textContent = "Далі ➔";
      }

      const btnStay = $("btnSuccessStay");
      if (btnStay) {
        btnStay.textContent = "👀 Переглянути мій код";
      }
    }

    function showAssignedAutoSuccessOverlay(taskTitle, score) {
      const overlay = $("successOverlay");
      if (!overlay) {
        toast(`✅ Зараховано: ${score.total}/12 балів`);
        return;
      }

      const baseLabel = $("xpBase")?.parentElement?.querySelector("span");
      const sniperLabel = $("xpSniper")?.parentElement?.querySelector("span");
      const speedLabel = $("xpSpeed")?.parentElement?.querySelector("span");
      const streakLabel = $("xpStreak")?.parentElement?.querySelector("span");
      const totalLabel = $("xpTotal")?.parentElement?.querySelector("span");

      if (baseLabel) baseLabel.textContent = "Старт:";
      if (sniperLabel) sniperLabel.textContent = "Штраф за спроби:";
      if (speedLabel) speedLabel.textContent = "Штраф за прострочку:";
      if (streakLabel) streakLabel.textContent = "Невдалі спроби:";
      if (totalLabel) totalLabel.textContent = "Підсумок:";

      $("successTaskName").textContent = taskTitle || "Авто-завдання виконано";
      $("xpBase").textContent = `${score.start}`;
      $("xpSniper").textContent = `-${score.attemptPenalty}`;
      $("xpSpeed").textContent = `-${score.latePenalty}`;
      $("xpStreak").textContent = `${score.failed}`;
      $("xpTotal").textContent = `${score.total} / 12 балів`;

      overlay.classList.add("active");

      const btnNext = $("btnSuccessNext");
      if (btnNext) {
        btnNext.style.display = "none";
      }

      const btnStay = $("btnSuccessStay");
      if (btnStay) {
        btnStay.textContent = "📚 До моїх завдань";
        btnStay.onclick = () => {
          overlay.classList.remove("active");
          goto("/home");
        };
      }
    }

    return {
      calculateAssignedAutoPoints,
      finalizeActiveAutoAssignment,
      restoreSuccessOverlayXpMode,
      showAssignedAutoSuccessOverlay
    };
  }

  return { create };
})();
