// Рендер сторінки уроку (теорія, завдання, редактор, термінал); зберігає спільний екземпляр CodeMirror.
window.App = window.App || {};

window.App.uiLesson = (function () {
  "use strict";

  function create(deps) {
    const {
      visibleTaskRefs,
      canOpenModule,
      toast,
      goto,
      state,
      canOpenTask,
      setActiveView,
      viewLesson,
      $,
      escapeHtml,
      kindLabel,
      uid,
      getAttempts,
      isSpoiled,
      save,
      setSpoiled,
      isModuleCompleted,
      moduleProgress,
      getDraft,
      setDraft,
      completionState,
      enableTermInput,
      cancelPendingInput,
      setTermStatus,
      runLessonCode,
      renderSidebarHome,
      renderSidebarModuleTasks,
      setTerminalPromptLabel
    } = deps;

    let myCodeMirror = null;

    function getCodeMirror() {
      return myCodeMirror;
    }

    // ===========================
    // Lesson render
    // ===========================
    function renderLesson(courseId, moduleId, taskIdx) {
      let course = DB.find((c) => c.id === courseId);
      let mod = course?.modules.find((m) => m.id === moduleId);
      const idx = Number(taskIdx);

      // ПІДТРИМКА PRACTICE_DB
      if ((!course || !mod) && String(courseId) === "practice") {
        const practiceModule = (window.PRACTICE_DB || []).find(
          (item) => String(item.id) === String(moduleId)
        );

        if (practiceModule) {
          course = {
            id: "practice",
            title: "Практикум",
            modules: [practiceModule]
          };
          mod = practiceModule;
        }
      }

      // запасний варіант на майбутнє:
      // якщо practice колись стане курсом з modules
      if (!course || !mod) {
        const practiceCourse = (window.PRACTICE_DB || []).find(
          (item) => String(item.id) === String(courseId)
        );
        const nestedPracticeModule = practiceCourse?.modules?.find(
          (item) => String(item.id) === String(moduleId)
        );

        if (practiceCourse && nestedPracticeModule) {
          course = {
            id: practiceCourse.id,
            title: practiceCourse.title || "Практикум",
            modules: practiceCourse.modules || []
          };
          mod = nestedPracticeModule;
        }
      }

      const refs = visibleTaskRefs(courseId, moduleId);
      const ref = refs[idx];

      // Для practice не відправляємо на /course/practice,
      // бо такого "курсу" в звичайній DB немає
      if (course && mod && String(courseId) !== "practice" && !canOpenModule(courseId, moduleId)) {
        toast("🔒 Цей модуль поки заблокований");
        goto(`/course/${courseId}`);
        return;
      }

      if (!course || !mod || !ref) {
        toast("Урок не знайдено");
        goto("/home");
        return;
      }

      const task = ref.t;
      const origIdx = ref.origIdx;

      const activeAuto = state.activeAutoAssignment || null;
      const isAssignedAutoTask =
        !!activeAuto &&
        String(activeAuto.assignmentId || "").trim() !== "" &&
        String(activeAuto.courseId) === String(courseId) &&
        String(activeAuto.moduleId) === String(moduleId) &&
        Number(activeAuto.taskIndex) === Number(origIdx);

      let isTeacherPreview = false;

      try {
        const rawPreview = sessionStorage.getItem("teacher_auto_preview");
        if (rawPreview) {
          const preview = JSON.parse(rawPreview);

          isTeacherPreview =
            String(preview?.courseId || "") === String(courseId) &&
            String(preview?.moduleId || "") === String(moduleId) &&
            Number(preview?.taskIndex) === Number(origIdx);
        }
      } catch {}

      if (!canOpenTask(courseId, moduleId, origIdx)) {
        const firstOpenIdx = refs.findIndex((r) => canOpenTask(courseId, moduleId, r.origIdx));
        toast("🔒 Це завдання тимчасово заблоковане вчителем");
        if (firstOpenIdx >= 0 && firstOpenIdx !== idx) {
          goto(`/lesson/${courseId}/${moduleId}/${firstOpenIdx}`);
        } else {
          if (String(courseId) === "practice") {
            goto("/home");
          } else {
            goto(`/course/${courseId}`);
          }
        }
        return;
      }

      setActiveView(viewLesson);
      // Запускаємо таймер для бонусу "Швидкість"
      window.currentTaskStartTime = Date.now();

      $("breadcrumbs").innerHTML =
        `<span class="crumb" data-crumb-home style="cursor:pointer">Головна</span> / ` +
        `<span class="crumb" data-crumb-course style="cursor:pointer">${escapeHtml(course.title)}</span> / ` +
        `${escapeHtml(mod.title)}`;

      $("lessonTitle").innerText = task.title;
      $("lessonContent").innerHTML = task.theory || "";
      // === ПІДСВІТКА КОДУ В ТЕОРІЇ ===
      const currentTheme = state.settings.theme === "light" ? "default" : "dracula";

      $("lessonContent")
        .querySelectorAll(".code-box")
        .forEach((box) => {
          // 1. Правильно дістаємо текст (зберігаємо твої <br> як нові рядки)
          let codeText = box.innerHTML.replace(/<br\s*\/?>/gi, "\n");
          let temp = document.createElement("div");
          temp.innerHTML = codeText;
          codeText = (temp.textContent || temp.innerText || "").trim();

          // 2. Очищаємо блок і вішаємо клас теми
          box.innerHTML = "";
          box.classList.add(`cm-s-${currentTheme}`); // Додаємо тему для синтаксису

          // 3. Фарбуємо код
          if (window.CodeMirror && typeof CodeMirror.runMode === "function") {
            CodeMirror.runMode(codeText, "python", box);
          } else {
            box.textContent = codeText;
          }
        });
      $("lessonTask").innerHTML = task.desc || "";
      $("lessonExpected").textContent = task.expected || "(немає)";

      const kind = task.kind || "practice";
      $("badgeKind").textContent = kindLabel(kind);

      const id = uid(course.id, mod.id, origIdx);
      const tries = getAttempts(id);
      $("badgeAttempts").textContent = `Спроби: ${Math.min(tries, 10)}/10`;

      $("badgeNoXP").style.display = isSpoiled(id) ? "inline-flex" : "none";

      // Запуск сесії задачі (таймер)
      state.user.taskSession = {
        id,
        startedAt: Date.now()
      };
      save();
      // hint
      $("hintBox").innerHTML = task.hint || "";
      $("hintBox").style.display = "none";
      $("btnHint").style.opacity = task.hint ? "1" : "0.5";
      $("btnHint").style.pointerEvents = task.hint ? "auto" : "none";

      // solution availability + button behavior
      const solBox = $("solutionBox");
      const solPre = $("solutionPre");
      const btnShowSol = $("btnShowSolution");

      const available = tries >= 10;
      const spoiled = isSpoiled(id);

      if (spoiled) {
        solBox.style.display = "block";
        solPre.textContent = task.solution || task.hint || "# (немає рішення)";
        if (btnShowSol) btnShowSol.style.display = "none";
      } else if (available) {
        solBox.style.display = "block";
        solPre.textContent =
          "Рішення доступне після 10 спроб. Натисни кнопку нижче, щоб відкрити (буде без XP).";
        if (btnShowSol) btnShowSol.style.display = "inline-flex";
      } else {
        solBox.style.display = "none";
        if (btnShowSol) btnShowSol.style.display = "none";
      }

      if (btnShowSol) {
        btnShowSol.onclick = () => {
          setSpoiled(id);
          $("badgeNoXP").style.display = "inline-flex";
          solPre.textContent = task.solution || task.hint || "# (немає рішення)";
          btnShowSol.style.display = "none";
          toast("🧩 Рішення відкрито — ця задача буде без XP");
        };
      }

      // exam warning (no locks)
      const warn = $("examWarnBox");
      const isExam = kind === "quiz" || kind === "final";
      const moduleDone = isModuleCompleted(courseId, moduleId);
      if (isExam && !moduleDone) {
        const mp = moduleProgress(courseId, moduleId);
        warn.style.display = "block";
        warn.innerHTML = `⚠️ <b>${escapeHtml(kindLabel(kind))}</b>: у модулі ще не виконані всі завдання (${mp.done}/${mp.total}). 
      Ти можеш проходити зараз, але рекомендовано спочатку завершити модуль.`;
      } else {
        warn.style.display = "none";
      }

      // editor / terminal init
      // ===========================
      // EDITOR INIT (CodeMirror)
      // ===========================
      const terminal = $("terminal");
      const status = $("termStatus");
      if (status) status.textContent = "Ready";
      if (terminal) terminal.textContent = ">>> Ready...";

      // Якщо редактор ще не створено - створюємо
      if (!myCodeMirror) {
        myCodeMirror = CodeMirror.fromTextArea($("codeEditor"), {
          mode: "python",
          theme: state.settings.theme === "light" ? "default" : "dracula",
          lineNumbers: true,
          indentUnit: 4,
          autoCloseBrackets: true,
          extraKeys: {
            "Ctrl-Enter": () => $("btnRun").click(),
            "Cmd-Enter": () => $("btnRun").click()
          }
        });
      }

      // Завантажуємо фінальне рішення (якщо є), або чернетку
      // 1. Формуємо код, який треба показати
      const pastSolution = state.user?.solutions?.[id];
      const draft = getDraft(id);
      const codeToShow = pastSolution !== undefined ? pastSolution : draft || "";

      // 2. Якщо вже був обробник автозбереження — правильно його видаляємо!
      if (myCodeMirror._currentChangeHandler) {
        myCodeMirror.off("change", myCodeMirror._currentChangeHandler);
      }

      // 3. Вставляємо код завдання у редактор
      myCodeMirror.setValue(codeToShow);

      const savedBadge = $("badgeSaved");
      if (savedBadge) {
        savedBadge.textContent = draft ? "Saved" : "Not saved";
        savedBadge.style.opacity = draft ? "1" : ".75";
      }

      // 4. Створюємо іменований обробник (щоб потім його можна було видалити)
      myCodeMirror._currentChangeHandler = (cm, changeObj) => {
        // Ігноруємо штучну зміну (коли код просто підвантажується через setValue)
        if (changeObj.origin === "setValue") return;

        if (savedBadge) {
          savedBadge.textContent = "Saving...";
          savedBadge.style.opacity = "1";
        }
        clearTimeout(myCodeMirror._autosaveTimer);
        myCodeMirror._autosaveTimer = setTimeout(() => {
          setDraft(id, myCodeMirror.getValue());
          if (savedBadge) {
            savedBadge.textContent = "Saved";
            savedBadge.style.opacity = "1";
          }
        }, 350);
      };

      // 5. Вішаємо новий правильний обробник
      myCodeMirror.on("change", myCodeMirror._currentChangeHandler);

      // buttons
      $("btnClear").onclick = () => {
        if (!confirm("Очистити редактор?")) return;
        myCodeMirror.setValue(""); // Замість editor.value = ""
        setDraft(id, "");
        if (savedBadge) savedBadge.textContent = "Not saved";
        if (terminal) terminal.textContent = ">>> Cleared.";
        toast("🧼 Очищено");
      };

      $("btnHint").onclick = () => {
        const hb = $("hintBox");
        hb.style.display = hb.style.display === "block" ? "none" : "block";
      };

      if (isAssignedAutoTask) {
        $("btnPrev").style.display = "none";
        $("btnNext").style.display = "none";
        $("btnNext").classList.remove("unlocked");
      } else {
        $("btnPrev").style.display = "";
        $("btnNext").style.display = "";

        $("btnPrev").onclick = () => {
          if (idx > 0) goto(`/lesson/${course.id}/${mod.id}/${idx - 1}`);
          else {
            if (String(course.id) === "practice") {
              goto("/home");
            } else {
              goto(`/course/${course.id}`);
            }
          }
        };

        $("btnNext").onclick = () => {
          if (!$("btnNext").classList.contains("unlocked")) return;
          if (idx < refs.length - 1) goto(`/lesson/${course.id}/${mod.id}/${idx + 1}`);
          else goto(`/course/${course.id}`);
        };

        $("btnNext").classList.remove("unlocked");
        if (completionState(id)) $("btnNext").classList.add("unlocked");
      }

      enableTermInput(false);
      cancelPendingInput();
      setTermStatus("Running...");
      // RUN
      $("btnRun").onclick = () =>
        runLessonCode({
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
        });

      // breadcrumbs
      document.querySelectorAll("[data-crumb-home]").forEach((el) => {
        el.onclick = () => goto("/home");
      });

      document.querySelectorAll("[data-crumb-course]").forEach((el) => {
        el.onclick = () => {
          if (String(course.id) === "practice") {
            goto("/home");
          } else {
            goto(`/course/${course.id}`);
          }
        };
      });

      if (String(course.id) === "practice") {
        renderSidebarHome();
      } else {
        renderSidebarModuleTasks(course.id, mod.id, idx);
      }
      setTerminalPromptLabel("Тест: prompt видно", true);
    }

    return { getCodeMirror, renderLesson };
  }

  return { create };
})();
