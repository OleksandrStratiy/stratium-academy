// Модальні вікна створення класу та налаштувань класу.
window.App = window.App || {};

window.App.teacherClassesModals = (function () {
  "use strict";

  function create(deps) {
    const { getClassesUi, save, escapeHtml, state } = deps;

    function openCreateClassModal() {
      const ui = getClassesUi();
      ui.showCreateModal = true;
      save?.();
    }

    function closeCreateClassModal() {
      const ui = getClassesUi();
      ui.showCreateModal = false;
      save?.();
    }

    function renderCreateClassModal() {
      const ui = getClassesUi();

      if (!ui.showCreateModal) return "";

      return `
    <div
      id="teacherCreateClassOverlay"
      class="overlay active teacher-overlay"
      data-close-create-class-overlay="1"
    >
      <div
        class="modal teacher-create-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="teacherCreateClassModalTitle"
      >
        <div class="teacher-create-modal__head">
          <div>
            <div class="teacher-create-modal__eyebrow">НОВИЙ КЛАС</div>
            <h3 id="teacherCreateClassModalTitle" class="teacher-create-modal__title">
              Створити клас
            </h3>
          </div>

          <button
            type="button"
            id="teacherCloseCreateClassBtn"
            class="teacher-btn teacher-btn--ghost teacher-btn--small"
          >
            ✕
          </button>
        </div>

        <form id="teacherCreateClassForm" class="teacher-class-create-form">
          <input
            type="text"
            id="teacherClassNameInput"
            class="teacher-input"
            placeholder="Назва класу, наприклад 10-А"
          />

          <input
            type="text"
            id="teacherSchoolNameInput"
            class="teacher-input"
            placeholder="Назва школи"
            value="${escapeHtml(state.user.teacherSchoolName || "")}"
          />

          <details class="teacher-class-advanced">
            <summary>Додаткові налаштування</summary>

            <div class="teacher-class-advanced__body">
              <label class="teacher-check">
                <input type="checkbox" id="teacherShowClassGlobalInput" checked />
                <span>Показувати клас у глобальному рейтингу</span>
              </label>

              <label class="teacher-check">
                <input type="checkbox" id="teacherShowSchoolGlobalInput" checked />
                <span>Показувати школу в глобальному рейтингу</span>
              </label>

              <label class="teacher-check">
                <input type="checkbox" id="teacherShowSchoolClassInput" checked />
                <span>Показувати школу в рейтингу класу</span>
              </label>
            </div>
          </details>

          <div class="teacher-create-modal__actions">
            <button
              type="button"
              id="teacherCancelCreateClassBtn"
              class="teacher-btn teacher-btn--ghost"
            >
              Скасувати
            </button>

            <button
              id="teacherCreateClassBtn"
              type="submit"
              class="teacher-btn teacher-btn--primary"
            >
              Створити клас
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
    }

    function openClassSettingsModal() {
      getClassesUi().showClassSettingsModal = true;
      save?.();
    }

    function closeClassSettingsModal() {
      getClassesUi().showClassSettingsModal = false;
      save?.();
    }

    function renderClassSettingsModal(cls) {
      const ui = getClassesUi();

      if (!ui.showClassSettingsModal || !cls) return "";

      return `
    <div
      id="teacherClassSettingsOverlay"
      class="overlay active teacher-overlay"
      data-close-class-settings-overlay="1"
    >
      <div
        class="modal teacher-create-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="teacherClassSettingsTitle"
      >
        <div class="teacher-create-modal__head">
          <div>
            <div class="teacher-create-modal__eyebrow">НАЛАШТУВАННЯ КЛАСУ</div>
            <h3 id="teacherClassSettingsTitle" class="teacher-create-modal__title">
              ${escapeHtml(cls.name || cls.code)}
            </h3>
          </div>

          <button
            type="button"
            id="teacherCloseClassSettingsBtn"
            class="teacher-btn teacher-btn--ghost teacher-btn--small"
          >
            ✕
          </button>
        </div>

        <form id="teacherEditClassForm" class="teacher-class-settings-form">
          <div class="teacher-form-grid teacher-form-grid--2">
            <input
              type="text"
              id="teacherEditClassNameInput"
              class="teacher-input"
              placeholder="Назва класу"
              value="${escapeHtml(cls.name || "")}"
            />

            <input
              type="text"
              id="teacherEditSchoolNameInput"
              class="teacher-input"
              placeholder="Назва школи"
              value="${escapeHtml(cls.school_name || "")}"
            />
          </div>

          <details class="teacher-class-advanced" open>
            <summary>Налаштування відображення в рейтингу</summary>

            <div class="teacher-class-advanced__body">
              <label class="teacher-check">
                <input
                  type="checkbox"
                  id="teacherEditShowClassGlobalInput"
                  ${cls.show_class_in_global ? "checked" : ""}
                />
                <span>Показувати клас у глобальному рейтингу</span>
              </label>

              <label class="teacher-check">
                <input
                  type="checkbox"
                  id="teacherEditShowSchoolGlobalInput"
                  ${cls.show_school_in_global ? "checked" : ""}
                />
                <span>Показувати школу в глобальному рейтингу</span>
              </label>

              <label class="teacher-check">
                <input
                  type="checkbox"
                  id="teacherEditShowSchoolClassInput"
                  ${cls.show_school_in_class ? "checked" : ""}
                />
                <span>Показувати школу в рейтингу класу</span>
              </label>
            </div>
          </details>

          <div class="teacher-create-modal__actions">
            <button
              type="button"
              id="teacherCancelClassSettingsBtn"
              class="teacher-btn teacher-btn--ghost"
            >
              Скасувати
            </button>

            <button
              id="teacherSaveClassSettingsBtn"
              type="button"
              class="teacher-btn teacher-btn--primary"
            >
              Зберегти налаштування
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
    }

    return {
      openCreateClassModal,
      closeCreateClassModal,
      renderCreateClassModal,
      openClassSettingsModal,
      closeClassSettingsModal,
      renderClassSettingsModal
    };
  }

  return { create };
})();
