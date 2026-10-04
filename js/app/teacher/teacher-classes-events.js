// Обробники подій вкладки «Класи»; викликаються після кожного рендеру.
window.App = window.App || {};

window.App.teacherClassesEvents = (function () {
  "use strict";

  function create(deps) {
    const {
      $,
      toast,
      store,
      ctx,
      state,
      getClassesUi,
      save,
      refreshAndRender,
      openCreateClassModal,
      closeCreateClassModal,
      loadStudents,
      removeStudentFromClass,
      getActiveClass,
      setClassOpenAllAccess,
      onOpenAssignmentsForClass,
      openClassSettingsModal,
      closeClassSettingsModal,
      bindStudentViewEvents,
      bindAccessSelectEvents
    } = deps;

    function bindEvents() {
      const root = $("teacherInnerView");
      if (!root) return;
      bindCreateClassEvents();
      bindClassListEvents();
      bindClassDetailsEvents(root);
      bindStudentViewEvents(root);
      bindClassSettingsEvents();
      bindAccessSelectEvents();
    }

    // Модалка створення класу: відправка форми, кнопки відкриття/закриття, клік по фону.
    function bindCreateClassEvents() {
      const createForm = document.getElementById("teacherCreateClassForm");

      if (createForm) {
        createForm.onsubmit = async (e) => {
          e.preventDefault();

          const form = e.currentTarget;
          if (!(form instanceof HTMLFormElement)) return;

          const nameInput = form.querySelector("#teacherClassNameInput");
          const schoolInput = form.querySelector("#teacherSchoolNameInput");
          const showClassGlobalInput = form.querySelector("#teacherShowClassGlobalInput");
          const showSchoolGlobalInput = form.querySelector("#teacherShowSchoolGlobalInput");
          const showSchoolClassInput = form.querySelector("#teacherShowSchoolClassInput");
          const createBtn = form.querySelector("#teacherCreateClassBtn");

          const name = nameInput?.value?.trim();
          const schoolName = schoolInput?.value?.trim() || "";
          const showClassGlobal = !!showClassGlobalInput?.checked;
          const showSchoolGlobal = !!showSchoolGlobalInput?.checked;
          const showSchoolClass = !!showSchoolClassInput?.checked;

          if (!name) {
            toast("⚠️ Введи назву класу");
            return;
          }

          if (form.dataset.busy === "1") return;
          form.dataset.busy = "1";

          if (createBtn) {
            createBtn.disabled = true;
            createBtn.textContent = "Створення...";
          }

          try {
            const created = await store.createClassRecord(
              {
                name,
                schoolName,
                showClassInGlobal: showClassGlobal,
                showSchoolInGlobal: showSchoolGlobal,
                showSchoolInClass: showSchoolClass
              },
              ctx.teacherClasses
            );

            ctx.teacherClasses = [
              { ...created, student_count: 0 },
              ...ctx.teacherClasses.filter((cls) => cls.code !== created.code)
            ];

            state.user = state.user || {};
            state.user.teacherClasses = ctx.teacherClasses;
            state.user.teacherSchoolName = schoolName;

            getClassesUi().showCreateModal = false;
            ctx.activeClassCode = created.code;
            save?.();

            toast(`✅ Клас ${created.name || name} створено`);
            await refreshAndRender();
          } catch (err) {
            console.error(err);
            toast(`❌ ${err?.message || "Не вдалося створити клас"}`);
          } finally {
            form.dataset.busy = "0";

            if (createBtn) {
              createBtn.disabled = false;
              createBtn.textContent = "Створити клас";
            }
          }
        };
      }

      const openCreateBtn = $("teacherOpenCreateClassBtn");

      if (openCreateBtn) {
        openCreateBtn.onclick = () => {
          openCreateClassModal();
          refreshAndRender();
        };
      }

      const closeCreateBtn = $("teacherCloseCreateClassBtn");

      if (closeCreateBtn) {
        closeCreateBtn.onclick = () => {
          closeCreateClassModal();
          refreshAndRender();
        };
      }

      const cancelCreateBtn = $("teacherCancelCreateClassBtn");

      if (cancelCreateBtn) {
        cancelCreateBtn.onclick = () => {
          closeCreateClassModal();
          refreshAndRender();
        };
      }

      const createOverlay = $("teacherCreateClassOverlay");

      if (createOverlay) {
        createOverlay.addEventListener("click", (e) => {
          if (e.target !== createOverlay) return;
          closeCreateClassModal();
          refreshAndRender();
        });
      }
    }

    // Список класів: відкриття, копіювання коду, видалення, пошук і сортування.
    function bindClassListEvents() {
      document.querySelectorAll("[data-class-open]").forEach((item) => {
        item.addEventListener("click", async () => {
          const classCode = item.getAttribute("data-class-open");
          if (!classCode) return;

          ctx.viewMode = "details";
          ctx.activeClassCode = classCode;
          ctx.activeStudentId = null;
          await loadStudents(classCode);
          await refreshAndRender();
        });

        item.addEventListener("keydown", async (e) => {
          if (e.key !== "Enter" && e.key !== " ") return;
          e.preventDefault();

          const classCode = item.getAttribute("data-class-open");
          if (!classCode) return;

          ctx.viewMode = "details";
          ctx.activeClassCode = classCode;
          ctx.activeStudentId = null;
          await loadStudents(classCode);
          await refreshAndRender();
        });
      });

      document.querySelectorAll("[data-class-copy]").forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          e.stopPropagation();
          const code = btn.getAttribute("data-class-copy");
          try {
            await navigator.clipboard.writeText(code);
            toast("📋 Код класу скопійовано");
          } catch {
            toast("❌ Не вдалося скопіювати код");
          }
        });
      });

      document.querySelectorAll("[data-class-delete]").forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          e.stopPropagation();
          const code = btn.getAttribute("data-class-delete");
          const cls = ctx.teacherClasses.find((c) => c.code === code);

          if (!confirm(`Видалити клас ${cls?.name || code}?`)) return;

          try {
            await store.deleteClassRecord(code);
            ctx.teacherClasses = ctx.teacherClasses.filter((c) => c.code !== code);
            state.user.teacherClasses = ctx.teacherClasses;
            save();

            if (ctx.activeClassCode === code) {
              ctx.activeClassCode = ctx.teacherClasses[0]?.code || null;
              ctx.activeStudents = [];
              ctx.activeStudentId = null;
              ctx.viewMode = "list";
            }

            toast("🗑️ Клас видалено");
            await refreshAndRender();
          } catch (err) {
            console.error(err);
            toast("❌ Не вдалося видалити клас");
          }
        });
      });

      const classSearchInput = $("teacherClassSearchInput");

      if (classSearchInput) {
        classSearchInput.oninput = async () => {
          getClassesUi().classSearch = classSearchInput.value;
          save?.();
          await refreshAndRender();
        };
      }

      const classSortSelect = $("teacherClassSortSelect");

      if (classSortSelect) {
        classSortSelect.onchange = async () => {
          getClassesUi().classSort = classSortSelect.value;
          save?.();
          await refreshAndRender();
        };
      }
    }

    // Сторінка класу: список учнів, фільтри, навігація, загальний доступ.
    function bindClassDetailsEvents(root) {
      document.querySelectorAll("[data-student-open]").forEach((btn) => {
        document.querySelectorAll("[data-student-remove]").forEach((btn) => {
          btn.addEventListener("click", async (e) => {
            e.stopPropagation();

            const studentId = btn.getAttribute("data-student-remove");
            const student = ctx.activeStudents.find((item) => item.id === studentId);
            if (!student) return;

            if (!confirm(`Видалити учня "${student.full_name || "Без імені"}" з класу?`)) return;

            btn.disabled = true;

            try {
              await removeStudentFromClass(studentId);

              ctx.activeStudents = ctx.activeStudents.filter((item) => item.id !== studentId);

              if (ctx.activeStudentId === studentId) {
                ctx.activeStudentId = null;
                ctx.viewMode = "details";
              }

              const cls = ctx.teacherClasses.find((item) => item.code === ctx.activeClassCode);
              if (cls) {
                cls.student_count = Math.max(0, Number(cls.student_count || 0) - 1);
              }

              state.user = state.user || {};
              state.user.teacherClasses = ctx.teacherClasses;
              save?.();

              toast("🗑️ Учня прибрано з класу");
              await refreshAndRender();
            } catch (err) {
              console.error(err);
              toast("❌ Не вдалося прибрати учня з класу");
            } finally {
              btn.disabled = false;
            }
          });
        });
        btn.addEventListener("click", async () => {
          ctx.activeStudentId = btn.getAttribute("data-student-open");
          ctx.viewMode = "student";
          await refreshAndRender();
        });
      });

      const studentSearchInput = $("teacherStudentSearchInput");

      if (studentSearchInput) {
        studentSearchInput.oninput = async () => {
          getClassesUi().studentSearch = studentSearchInput.value;
          save?.();
          await refreshAndRender();
        };
      }

      const onlyRiskyInput = $("teacherOnlyRiskyInput");

      if (onlyRiskyInput) {
        onlyRiskyInput.onchange = async () => {
          getClassesUi().showOnlyRisky = !!onlyRiskyInput.checked;
          save?.();
          await refreshAndRender();
        };
      }

      const classOpenAllInput = document.querySelector("[data-class-open-all]");

      if (classOpenAllInput) {
        classOpenAllInput.onchange = async () => {
          const cls = getActiveClass();
          if (!cls) return;

          classOpenAllInput.disabled = true;

          try {
            await setClassOpenAllAccess(cls.code, !!classOpenAllInput.checked);
            toast(
              classOpenAllInput.checked ? "✅ Для класу відкрито все" : "✅ Повернуто звичайний режим доступу"
            );
            await refreshAndRender();
          } catch (err) {
            console.error(err);
            toast("❌ Не вдалося оновити загальний доступ класу");
          } finally {
            classOpenAllInput.disabled = false;
          }
        };
      }

      const backToClassesBtn = $("teacherBackToClassesBtn");

      if (backToClassesBtn) {
        backToClassesBtn.onclick = async () => {
          ctx.viewMode = "list";
          ctx.activeStudentId = null;
          await refreshAndRender();
        };
      }

      const backToClassBtn = $("teacherBackToClassBtn");

      if (backToClassBtn) {
        backToClassBtn.onclick = async () => {
          ctx.viewMode = "details";
          await refreshAndRender();
        };
      }

      root.querySelectorAll("[data-open-student]").forEach((item) => {
        item.addEventListener("click", async () => {
          const studentId = item.getAttribute("data-open-student") || "";
          if (!studentId) return;

          ctx.activeStudentId = studentId;
          ctx.viewMode = "student";
          await refreshAndRender();
        });

        item.addEventListener("keydown", async (e) => {
          if (e.key !== "Enter" && e.key !== " ") return;
          e.preventDefault();

          const studentId = item.getAttribute("data-open-student") || "";
          if (!studentId) return;

          ctx.activeStudentId = studentId;
          ctx.viewMode = "student";
          await refreshAndRender();
        });
      });

      root.querySelectorAll("[data-open-student]").forEach((item) => {
        item.addEventListener("click", async () => {
          const studentId = item.getAttribute("data-open-student") || "";
          if (!studentId) return;

          ctx.activeStudentId = studentId;
          ctx.viewMode = "student";
          await refreshAndRender();
        });

        item.addEventListener("keydown", async (e) => {
          if (e.key !== "Enter" && e.key !== " ") return;
          e.preventDefault();

          const studentId = item.getAttribute("data-open-student") || "";
          if (!studentId) return;

          ctx.activeStudentId = studentId;
          ctx.viewMode = "student";
          await refreshAndRender();
        });
      });

      root.querySelectorAll("[data-back-to-class]").forEach((btn) => {
        btn.addEventListener("click", async () => {
          const classCode = btn.getAttribute("data-back-to-class") || "";
          if (!classCode) return;

          ctx.activeStudentId = null;
          ctx.viewMode = "details";
          ctx.activeClassCode = classCode;
          await refreshAndRender();
        });
      });

      root.querySelectorAll("[data-open-assignments-class]").forEach((btn) => {
        btn.addEventListener("click", async () => {
          const classCode = btn.getAttribute("data-open-assignments-class") || "";
          if (!classCode) return;
          await onOpenAssignmentsForClass?.(classCode);
        });
      });
    }

    // Модалка налаштувань класу: відкриття/закриття та збереження.
    function bindClassSettingsEvents() {
      const openClassSettingsBtn = $("teacherOpenClassSettingsBtn");

      if (openClassSettingsBtn) {
        openClassSettingsBtn.onclick = async () => {
          openClassSettingsModal();
          await refreshAndRender();
        };
      }

      const closeClassSettingsBtn = $("teacherCloseClassSettingsBtn");

      if (closeClassSettingsBtn) {
        closeClassSettingsBtn.onclick = async () => {
          closeClassSettingsModal();
          await refreshAndRender();
        };
      }

      const cancelClassSettingsBtn = $("teacherCancelClassSettingsBtn");

      if (cancelClassSettingsBtn) {
        cancelClassSettingsBtn.onclick = async () => {
          closeClassSettingsModal();
          await refreshAndRender();
        };
      }

      const classSettingsOverlay = $("teacherClassSettingsOverlay");

      if (classSettingsOverlay) {
        classSettingsOverlay.addEventListener("click", async (e) => {
          if (e.target !== classSettingsOverlay) return;
          closeClassSettingsModal();
          await refreshAndRender();
        });
      }

      const saveClassSettingsBtn = $("teacherSaveClassSettingsBtn");

      const editClassNameInput = $("teacherEditClassNameInput");

      const editSchoolNameInput = $("teacherEditSchoolNameInput");

      const editShowClassGlobalInput = $("teacherEditShowClassGlobalInput");

      const editShowSchoolGlobalInput = $("teacherEditShowSchoolGlobalInput");

      const editShowSchoolClassInput = $("teacherEditShowSchoolClassInput");

      if (
        saveClassSettingsBtn &&
        editClassNameInput &&
        editSchoolNameInput &&
        editShowClassGlobalInput &&
        editShowSchoolGlobalInput &&
        editShowSchoolClassInput
      ) {
        saveClassSettingsBtn.onclick = async () => {
          const cls = getActiveClass();
          if (!cls) return;

          const nextName = editClassNameInput.value.trim();
          const nextSchoolName = editSchoolNameInput.value.trim();

          if (!nextName) {
            toast("⚠️ Введи назву класу");
            return;
          }

          const patch = {
            name: nextName,
            school_name: nextSchoolName || null,
            show_class_in_global: editShowClassGlobalInput.checked,
            show_school_in_global: editShowSchoolGlobalInput.checked,
            show_school_in_class: editShowSchoolClassInput.checked
          };

          saveClassSettingsBtn.disabled = true;
          saveClassSettingsBtn.textContent = "Збереження...";

          try {
            await store.updateClassRecord(cls.code, patch);

            cls.name = patch.name;
            cls.school_name = patch.school_name || "";
            cls.show_class_in_global = patch.show_class_in_global;
            cls.show_school_in_global = patch.show_school_in_global;
            cls.show_school_in_class = patch.show_school_in_class;

            state.user.teacherSchoolName = nextSchoolName || state.user.teacherSchoolName || "";
            save();

            closeClassSettingsModal();

            toast("✅ Налаштування класу збережено");
            await refreshAndRender();
          } catch (err) {
            console.error(err);
            toast("❌ Не вдалося зберегти налаштування класу");
          } finally {
            saveClassSettingsBtn.disabled = false;
            saveClassSettingsBtn.textContent = "Зберегти налаштування";
          }
        };
      }
    }

    return { bindEvents };
  }

  return { create };
})();
