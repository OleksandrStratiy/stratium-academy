// Обробники подій вкладки «Завдання»; викликаються після кожного рендеру.
window.App = window.App || {};

window.App.teacherAssignmentsEvents = (function () {
  "use strict";

  function create(deps) {
    const {
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
    } = deps;

    function bindEvents() {
      const root = $("teacherInnerView");
      if (!root) return;
      bindTaskBankEvents(root);
      bindIssueEvents(root);
      bindReviewEvents(root);
      bindAutoPracticeEvents(root);
    }

    // База завдань учителя: створення, редагування, видалення.
    function bindTaskBankEvents(root) {
      root.querySelectorAll("[data-open-create-task]").forEach((btn) => {
        btn.onclick = () => {
          const ui = ensureUiState();
          ui.isCreatingTask = true;
          ui.isEditingTask = false;
          ui.editingTaskId = "";
          save?.();
          renderView();
          bindEvents();
        };
      });

      root.querySelectorAll("[data-close-create-task]").forEach((btn) => {
        btn.onclick = () => {
          const ui = ensureUiState();
          ui.isCreatingTask = false;
          ui.isEditingTask = false;
          ui.editingTaskId = "";
          save?.();
          renderView();
          bindEvents();
        };
      });

      root.querySelectorAll("[data-edit-task]").forEach((btn) => {
        btn.onclick = () => {
          const taskId = btn.getAttribute("data-edit-task") || "";
          if (!taskId) return;

          const ui = ensureUiState();
          ui.isCreatingTask = true;
          ui.isEditingTask = true;
          ui.editingTaskId = taskId;
          ui.previewTaskId = taskId;

          save?.();
          renderView();
          bindEvents();
        };
      });

      const bankForm = $("teacherTaskBankForm");

      if (bankForm) {
        bankForm.onsubmit = async (e) => {
          e.preventDefault();
          if (bankForm.dataset.busy === "1") return;
          bankForm.dataset.busy = "1";
          try {
            await handleTaskBankSubmit(bankForm);
          } catch (err) {
            toast(`❌ ${err.message || "Помилка"}`);
          } finally {
            bankForm.dataset.busy = "0";
          }
        };
      }

      root.querySelectorAll("[data-delete-task]").forEach((btn) => {
        btn.onclick = async () => {
          const taskId = btn.getAttribute("data-delete-task") || "";
          if (!taskId) return;
          if (!confirm("Видалити завдання з бази?")) return;
          btn.disabled = true;

          try {
            await store.archiveTaskBankItem(taskId);
            toast("🗑️ Завдання видалено");
            const ui = ensureUiState();
            if (String(ui.editingTaskId || "") === String(taskId)) {
              ui.isCreatingTask = false;
              ui.isEditingTask = false;
              ui.editingTaskId = "";
            }
            await loadData();
            renderView();
            bindEvents();
          } catch (err) {
            toast(`❌ ${err.message}`);
          } finally {
            btn.disabled = false;
          }
        };
      });
    }

    // Видача: джерело завдань, вибір ручних завдань, клас/учень і відправка.
    function bindIssueEvents(root) {
      root.querySelectorAll("[data-source]").forEach((btn) => {
        btn.onclick = () => {
          const ui = ensureUiState();
          ui.issueSource = btn.dataset.source || "bank";

          if (ui.issueSource === "bank") {
            ensureSelectedTaskInsideTheme(ui.issueThemeFilter || "all");
          }

          if (ui.issueSource === "auto") {
            ensureSelectedIssueAutoTask();
          }

          save?.();
          renderView();
          bindEvents();
        };
      });

      const issueThemeFilter = $("teacherIssueThemeFilter");

      if (issueThemeFilter) {
        issueThemeFilter.onchange = () => {
          const ui = ensureUiState();
          ui.issueThemeFilter = issueThemeFilter.value || "all";
          ensureSelectedTaskInsideTheme(ui.issueThemeFilter);
          save?.();
          renderView();
          bindEvents();
        };
      }

      root.querySelectorAll('input[name="taskIdBank"]').forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
          const ui = ensureUiState();
          const value = String(checkbox.value || "");
          const selected = new Set((ui.selectedTaskIds || []).map(String));

          if (checkbox.checked) {
            selected.add(value);
            ui.previewTaskId = value;
          } else {
            selected.delete(value);

            if (String(ui.previewTaskId) === value) {
              ui.previewTaskId = [...selected][0] || "";
            }
          }

          ui.selectedTaskIds = [...selected];
          ui.isCreatingTask = false;
          save?.();

          // ВАЖЛИВО: не просто підсвітити чекбокс,
          // а повністю перемалювати правий блок,
          // щоб одразу оновились:
          // - кількість вибраних
          // - список вибраних
          // - текст кнопки "Видати X завд."
          renderView();
          bindEvents();
        });
      });

      const issueForm = $("teacherIssueForm");

      if (issueForm) {
        issueForm.onsubmit = async (e) => {
          e.preventDefault();
          if (issueForm.dataset.busy === "1") return;
          issueForm.dataset.busy = "1";
          try {
            await handleIssueSubmit(issueForm);
          } catch (err) {
            toast(`❌ ${err.message || "Помилка"}`);
          } finally {
            issueForm.dataset.busy = "0";
          }
        };
      }

      const targetTypeSelect = $("assignmentTargetType");

      if (targetTypeSelect) {
        targetTypeSelect.addEventListener("change", () => {
          ensureUiState().issueTargetType = targetTypeSelect.value;
          save?.();
          renderView();
          bindEvents();
        });
      }

      const classSelect = $("assignmentClassCode");

      if (classSelect) {
        classSelect.addEventListener("change", async () => {
          ensureUiState().issueClassCode = classSelect.value;
          await reloadStudents();
          renderView();
          bindEvents();
        });
      }

      const studentSelect = $("assignmentStudentId");

      if (studentSelect) {
        studentSelect.addEventListener("change", () => {
          ensureUiState().issueStudentId = studentSelect.value;
          save?.();
        });
      }

      syncIssueSelectionVisuals();
    }

    // Перевірка: фільтри виданих завдань, оцінювання та видалення.
    function bindReviewEvents(root) {
      root.querySelectorAll("[data-delete-assignment]").forEach((btn) => {
        btn.onclick = async () => {
          const assignmentId = btn.getAttribute("data-delete-assignment") || "";
          if (!assignmentId) return;
          if (!confirm("Видалити це призначене завдання? Усі здачі учнів теж зникнуть.")) return;
          btn.disabled = true;
          try {
            await store.deleteAssignment(assignmentId);
            ctx.assignments = ctx.assignments.filter((item) => item.id !== assignmentId);
            toast("🗑️ Призначене завдання видалено");
            renderView();
            bindEvents();
          } catch (err) {
            toast(`❌ ${err.message}`);
          } finally {
            btn.disabled = false;
          }
        };
      });

      root.querySelectorAll("[data-review-submission-form]").forEach((form) => {
        form.onsubmit = async (e) => {
          e.preventDefault();
          const submissionId = form.getAttribute("data-review-submission-form") || "";
          const formData = new FormData(form);
          const rawPoints = String(formData.get("points") || "").trim();
          const submitBtn = form.querySelector('button[type="submit"]');
          if (submitBtn) submitBtn.disabled = true;
          try {
            const updatedSubmission = await store.reviewSubmission(submissionId, {
              points: rawPoints === "" ? null : Number(rawPoints),
              teacher_comment: String(formData.get("teacherComment") || "").trim(),
              status: String(formData.get("status") || "reviewed")
            });
            ctx.submissions = ctx.submissions.map((item) =>
              item.id === updatedSubmission.id ? updatedSubmission : item
            );
            toast("✅ Оцінку збережено");
            renderView();
            bindEvents();
          } catch (err) {
            toast(`❌ ${err.message}`);
          } finally {
            if (submitBtn) submitBtn.disabled = false;
          }
        };
      });

      const issuedSearchInput = $("teacherIssuedSearch");

      if (issuedSearchInput) {
        issuedSearchInput.oninput = () => {
          ensureUiState().issuedSearch = issuedSearchInput.value;
          save?.();
          renderView();
          bindEvents();
        };
      }

      const issuedClassFilter = $("teacherIssuedClassFilter");

      if (issuedClassFilter) {
        issuedClassFilter.onchange = async () => {
          const ui = ensureUiState();
          ui.issuedClassFilter = issuedClassFilter.value || "all";
          ui.issuedStudentFilter = "all";

          if (ui.issuedClassFilter && ui.issuedClassFilter !== "all") {
            ctx.classStudents = await store.fetchStudentsByClass(ui.issuedClassFilter);
          } else {
            ctx.classStudents = [];
          }

          save?.();
          renderView();
          bindEvents();
        };
      }

      const issuedStudentFilter = $("teacherIssuedStudentFilter");

      if (issuedStudentFilter) {
        issuedStudentFilter.onchange = () => {
          ensureUiState().issuedStudentFilter = issuedStudentFilter.value || "all";
          save?.();
          renderView();
          bindEvents();
        };
      }

      // --- Оновлення для вкладки Авто-практикумів ---

      const issuedStatusFilter = $("teacherIssuedStatusFilter");

      if (issuedStatusFilter) {
        issuedStatusFilter.onchange = () => {
          ensureUiState().issuedStatusFilter = issuedStatusFilter.value || "all";
          save?.();
          renderView();
          bindEvents();
        };
      }
    }

    // Авто-практикуми: фільтри рівня/модуля, вибір завдань і перегляд.
    function bindAutoPracticeEvents(root) {
      // --- ОБРОБНИКИ ДЛЯ АВТО-ПРАКТИКУМІВ (РІВНІ ТА СЕЛЕКТ) ---

      // 1. Кліки по рівнях (Усі / Junior / Middle / Senior)
      root.querySelectorAll(".auto-level-btn").forEach((btn) => {
        btn.onclick = (e) => {
          e.preventDefault();
          const ui = ensureUiState();
          ui.issueAutoLevelFilter = btn.getAttribute("data-level"); // зберігаємо рівень
          ui.issueAutoModuleFilter = "all"; // скидаємо модуль, бо рівень змінився
          save?.();
          renderView();
          bindEvents();
        };
      });

      // 2. Вибір теми з випадаючого списку
      const issueAutoFilter = $("teacherIssueAutoFilter");

      if (issueAutoFilter) {
        issueAutoFilter.onchange = () => {
          ensureUiState().issueAutoModuleFilter = issueAutoFilter.value || "all";
          save?.();
          renderView();
          bindEvents();
        };
      }

      // 3. Миттєве оновлення правої панелі при виборі завдання зі списку
      root.querySelectorAll(".auto-task-radio-input").forEach((input) => {
        input.onchange = () => {
          const ui = ensureUiState();
          const val = String(input.value || "");

          const leftScrollTop = document.getElementById("teacherAutoTasksScroll")?.scrollTop || 0;

          const rightScrollTop = document.getElementById("teacherSelectedAutoList")?.scrollTop || 0;

          ui.selectedAutoTaskIds = Array.isArray(ui.selectedAutoTaskIds) ? ui.selectedAutoTaskIds : [];

          if (input.checked) {
            if (!ui.selectedAutoTaskIds.includes(val)) {
              ui.selectedAutoTaskIds.push(val);
            }

            ui.previewTaskId = val;

            const parts = val.split("|");
            if (parts.length >= 4) {
              ui.selectedAutoModuleId = parts[2] || ui.selectedAutoModuleId || "";
            }
          } else {
            ui.selectedAutoTaskIds = ui.selectedAutoTaskIds.filter((id) => id !== val);

            if (String(ui.previewTaskId || "") === val) {
              ui.previewTaskId = ui.selectedAutoTaskIds.length
                ? ui.selectedAutoTaskIds[ui.selectedAutoTaskIds.length - 1]
                : "";
            }
          }

          save?.();
          renderView();
          bindEvents();

          requestAnimationFrame(() => {
            const left = document.getElementById("teacherAutoTasksScroll");
            if (left) left.scrollTop = leftScrollTop;

            const right = document.getElementById("teacherSelectedAutoList");
            if (right) right.scrollTop = rightScrollTop;
          });
        };
      });

      root.querySelectorAll("[data-preview-auto-task]").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();

          const raw = btn.getAttribute("data-preview-auto-task") || "";
          const [courseId, moduleId, taskIndex] = raw.split("|");

          openTeacherAutoLesson(courseId, moduleId, Number(taskIndex || 0));
        });
      });
    }

    function syncIssueSelectionVisuals() {
      const root = $("teacherInnerView");
      if (!root) return;

      root.querySelectorAll(".teacher-radio-card").forEach((card) => {
        const radio = card.querySelector('input[name="taskIdBank"]');
        const selected = !!radio?.checked;
        card.classList.toggle("is-selected", selected);
      });

      root.querySelectorAll(".auto-task-card").forEach((card) => {
        const radio = card.querySelector('input[name="taskIdAuto"]');
        const selected = !!radio?.checked;
        card.classList.toggle("is-selected", selected);

        if (selected) {
          const accordion = card.closest(".teacher-auto-module-accordion");
          if (accordion) accordion.open = true;
        }
      });
    }

    function openTeacherAutoLesson(courseId, moduleId, taskIndex) {
      const safeCourseId = String(courseId || "practice");
      const safeModuleId = String(moduleId || "");
      const safeTaskIndex = Number(taskIndex || 0);

      if (!safeModuleId) return;

      window.location.hash = `#/lesson/${safeCourseId}/${safeModuleId}/${safeTaskIndex}`;
    }

    return { bindEvents };
  }

  return { create };
})();
