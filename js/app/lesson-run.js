// Кнопка Run уроку: перевірка коду, підрахунок спроб, нарахування XP або синхронізація завдання вчителя.
window.App = window.App || {};

window.App.lessonRun = (function () {
  "use strict";

  function create(deps) {
    const {
      $,
      getCodeMirror,
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
    } = deps;

    async function runLessonCode({
      course,
      mod,
      idx,
      refs,
      task,
      origIdx,
      activeAuto,
      isAssignedAutoTask,
      isTeacherPreview,
      id,
      solBox,
      solPre,
      btnShowSol,
      terminal
    }) {
      const btn = $("btnRun");
      if (btn.disabled) return; // Блокуємо повторні натискання

      btn.disabled = true;
      btn.style.opacity = "0.5";
      btn.innerHTML = `<i class="ri-loader-4-line ri-spin"></i> Running...`; // Змінюємо текст кнопки

      const code = getCodeMirror().getValue();
      setTerminalPromptLabel("", false);
      // Показуємо користувачу, що код виконується
      if (terminal) terminal.textContent = ">>> Running...\n";

      // Чекаємо результатів від Skulpt
      const run = await runTaskTestsSmart(task, code);

      if (terminal) terminal.innerHTML = buildTerminalReport(run);
      // setTerminalPromptLabel("", false);
      enableTermInput(false);
      cancelPendingInput();

      // ✅ ВСТАВЛЯЄМО РОЗБЛОКУВАННЯ ТУТ (одразу як код відпрацював)
      btn.disabled = false;
      btn.style.opacity = "1";
      btn.innerHTML = `<i class="ri-play-fill"></i> Run`;

      // ==============================
      // FAIL (Помилка виконання або не пройдені тести)
      // ==============================
      if (!run.allPass) {
        const failedTests = (run.results || [])
          .filter((r) => !r.pass)
          .map((r) => ({
            name: r.name || "Тест",
            reason: r.reason || "Провалено",
            want: r.want || "",
            got: r.got || ""
          }));

        addErrorLog(id, {
          courseId: course.id,
          moduleId: mod.id,
          moduleTitle: mod.title,
          taskIndex: origIdx,
          taskTitle: task.title || `Task ${origIdx + 1}`,
          kind: !run.exec?.ok ? "runtime" : "tests",
          runtimeError: run.exec?.ok ? "" : String(run.exec?.error || ""),
          failedTests,
          code: getCodeMirror().getValue()
        });
        const alreadyDone = !!completionState(id);
        if (!alreadyDone) {
          const n = incAttempts(id);
          $("badgeAttempts").textContent = `Спроби: ${Math.min(n, 10)}/10`;

          const runtimeFriendly = !run.exec?.ok ? explainPythonError(run.exec?.error || "") : null;

          if (n >= 10 && !isSpoiled(id)) {
            if (solBox) {
              solBox.style.display = "block";
              solPre.textContent =
                "Рішення доступне після 10 спроб. Натисни кнопку, щоб відкрити (буде без XP).";
              if (btnShowSol) btnShowSol.style.display = "inline-flex";
            }
            toast("🧩 Рішення стало доступним після 10 спроб");
          } else {
            toast(!run.exec?.ok ? `❌ ${runtimeFriendly.short}` : "❌ Не всі тести пройдені");
          }
        } else {
          toast(!run.exec?.ok ? `❌ ${runtimeFriendly.short}` : "❌ Не всі тести пройдені");
        }

        // Тут ми ПЕРЕРИВАЄМО виконання функції, якщо є помилка, щоб не йти в SUCCESS
        return;
      }

      // ==============================
      // SUCCESS (Всі тести пройдені)
      // ==============================
      const already = !!completionState(id);
      if (isTeacherPreview) {
        playSuccessSound(!!state.settings.sound);
        fireConfetti();

        toast("👀 Режим перегляду вчителя: перевірка виконана без збереження прогресу");
        $("btnNext").classList.add("unlocked");

        btn.disabled = false;
        btn.style.opacity = "1";
        btn.innerHTML = `<i class="ri-play-fill"></i> Run`;
        return;
      }

      if (!already) {
        const spoiledNow = isSpoiled(id);

        // === ВЧИТЕЛЬСЬКЕ АВТО-ЗАВДАННЯ ===
        if (isAssignedAutoTask) {
          setCompleted(id, "no_xp");

          state.user.solutions = state.user.solutions || {};
          state.user.solutions[id] = getCodeMirror().getValue();

          updateStreak(state.user);
          save();
          updateUserUI();

          let score = null;
          try {
            score = await finalizeActiveAutoAssignment(
              course.id,
              mod.id,
              origIdx,
              task.title || `Завдання ${origIdx + 1}`
            );
          } catch (e) {
            console.error("Auto assignment sync error:", e);
          }

          playSuccessSound(!!state.settings.sound);
          fireConfetti();

          if (!score) {
            const fallbackTaskId = uid(course.id, mod.id, origIdx);
            score = calculateAssignedAutoPoints({
              attemptsFailed: getAttempts(fallbackTaskId),
              dueAt: activeAuto?.dueAt || null
            });
          }

          showAssignedAutoSuccessOverlay(task.title, score);
        }

        // === ЗВИЧАЙНЕ КУРСОВЕ ЗАВДАННЯ З XP ===
        else if (!spoiledNow) {
          setCompleted(id, "xp");

          state.user.solutions = state.user.solutions || {};
          state.user.solutions[id] = getCodeMirror().getValue();

          const baseXp = task.xp || 0;
          const attemptsBefore = getAttempts(id);
          const bonuses = calculateBonuses({
            baseXp,
            attemptsBefore,
            taskId: id,
            courseId: course.id
          });

          const totalXP = baseXp + bonuses.sniper + bonuses.speed + bonuses.streakBonus;

          state.user.xp += totalXP;

          updateStreak(state.user);
          save();
          updateUserUI();

          playSuccessSound(!!state.settings.sound);
          fireConfetti();

          restoreSuccessOverlayXpMode();

          $("successTaskName").textContent = task.title;
          $("xpBase").textContent = `+${baseXp}`;
          $("xpSniper").textContent = bonuses.sniper ? `+${bonuses.sniper}` : "0";
          $("xpSpeed").textContent = bonuses.speed ? `+${bonuses.speed}` : "0";
          $("xpStreak").textContent = bonuses.streakBonus ? `+${bonuses.streakBonus}` : "0";
          $("xpTotal").textContent = `+${totalXP} XP`;

          const successOverlay = $("successOverlay");
          if (successOverlay) {
            successOverlay.classList.add("active");

            $("btnSuccessNext").onclick = () => {
              successOverlay.classList.remove("active");
              if (idx < refs.length - 1) goto(`/lesson/${course.id}/${mod.id}/${idx + 1}`);
              else goto(`/course/${course.id}`);
            };

            const btnStay = $("btnSuccessStay");
            if (btnStay) {
              btnStay.onclick = () => {
                successOverlay.classList.remove("active");
                $("btnNext").classList.add("unlocked");
              };
            }
          } else {
            toast(`✅ SUCCESS! +${totalXP} XP`);
            $("btnNext").classList.add("unlocked");
          }
        }

        // === ЗВИЧАЙНЕ КУРСОВЕ ЗАВДАННЯ БЕЗ XP (відкривали рішення) ===
        else {
          setCompleted(id, "no_xp");

          state.user.solutions = state.user.solutions || {};
          state.user.solutions[id] = getCodeMirror().getValue();

          updateStreak(state.user);
          save();
          updateUserUI();

          toast("✅ Зараховано, але без XP (було відкрито рішення)");
          $("btnNext").classList.add("unlocked");
        }
      } else {
        state.user.solutions = state.user.solutions || {};
        state.user.solutions[id] = getCodeMirror().getValue();
        save();

        if (isAssignedAutoTask) {
          let score = null;
          try {
            score = await finalizeActiveAutoAssignment(
              course.id,
              mod.id,
              origIdx,
              task.title || `Завдання ${origIdx + 1}`
            );
          } catch (e) {
            console.error("Auto assignment sync error:", e);
          }

          if (score) {
            showAssignedAutoSuccessOverlay(task.title, score);
          } else {
            toast("✅ Уже зараховано");
          }
        } else {
          toast("✅ Уже зараховано");
          $("btnNext").classList.add("unlocked");
        }
      }
      // Перевірка, чи це була остання задача в модулі
      const mp = moduleProgress(course.id, mod.id);
      if (mp.done === mp.total) {
        setTimeout(() => fireConfetti(), 160);
        toast("🎉 Модуль завершено!");
      }

      if (String(course.id) === "practice") {
        renderSidebarHome();
      } else {
        renderSidebarModuleTasks(course.id, mod.id, idx);
      }

      // Розблоковуємо кнопку після завершення
      btn.disabled = false;
      btn.style.opacity = "1";
      btn.innerHTML = `<i class="ri-play-fill"></i> Run`;
    }

    return { runLessonCode };
  }

  return { create };
})();
