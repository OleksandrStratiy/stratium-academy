// Вікно налаштувань: профіль, тема, вступ/вихід із класу, зміна ролі та вихід з акаунта.
window.App = window.App || {};

window.App.uiSettings = (function () {
  "use strict";

  function create(deps) {
    const { $, state, getCodeMirror, save, toast, supa, sidebarApi, goto } = deps;

    // ===========================
    // Settings
    // ===========================
    // --- ЛОГІКА НАЛАШТУВАНЬ ---
    function showSettings() {
      const overlay = $("settingsOverlay");
      if (!overlay) return;

      // 1. Заповнюємо картку профілю
      const userName = state?.user?.name || "Гість";
      $("setUserName").textContent = userName;
      $("setAvatar").textContent = userName.charAt(0).toUpperCase();

      // 2. Визначаємо роль і налаштовуємо видимість блоків
      const roleText = $("setUserRole");
      const classBox = $("settingsCurrentClassBox");
      const classBadge = $("settingsClassBadge");

      const studentControls = $("settingsStudentControls");
      const teacherControls = $("settingsTeacherControls");

      if (state?.user?.role === "teacher") {
        roleText.textContent = "👨‍🏫 Вчитель";
        if (classBox) classBox.style.display = "none";
        if (studentControls) studentControls.style.display = "none";
        if (teacherControls) teacherControls.style.display = "block";
      } else if (state?.user?.role === "student") {
        const code = state?.user?.class_code;
        if (code) {
          roleText.textContent = `🎒 Учень`;
          classBadge.textContent = code;
          classBox.style.display = "block";
        } else {
          roleText.textContent = "🎒 Учень (Без класу)";
          classBox.style.display = "none";
        }
        if (studentControls) studentControls.style.display = "block";
        if (teacherControls) teacherControls.style.display = "none";
      } else {
        roleText.textContent = "💻 Локальний гравець";
        if (classBox) classBox.style.display = "none";
        if (studentControls) studentControls.style.display = "none";
        if (teacherControls) teacherControls.style.display = "none";
      }

      overlay.classList.add("active");

      // --- ОБРОБНИКИ ПОДІЙ ---
      $("btnCloseSettings").onclick = () => overlay.classList.remove("active");

      $("btnSettingsTheme").onclick = () => {
        if (window.App.theme) window.App.theme.toggleTheme(state, getCodeMirror(), save, toast);
      };

      // Приєднатися до класу (Учень)
      const btnJoinClass = $("btnSettingsJoinClass");
      if (btnJoinClass) {
        btnJoinClass.onclick = async () => {
          const newCode = $("settingsClassInput").value.trim().toUpperCase();
          if (!newCode) return toast("⚠️ Введи код класу!");

          btnJoinClass.textContent = "⏳...";
          try {
            const { data: classRow, error: classErr } = await supa
              .from("classes")
              .select("code, name")
              .eq("code", newCode)
              .maybeSingle();

            if (classErr) throw classErr;
            if (!classRow) {
              toast("⚠️ Клас з таким кодом не знайдено");
              return;
            }

            const {
              data: { user }
            } = await supa.auth.getUser();
            if (user) {
              const { error } = await supa
                .from("profiles")
                .update({ class_code: classRow.code })
                .eq("id", user.id);

              if (error) throw error;
            }

            state.user.class_code = classRow.code;
            save();

            toast(`✅ Ти приєднався до класу ${classRow.name}`);
            if (typeof sidebarApi !== "undefined") sidebarApi.renderSidebarHome();
            showSettings();
            $("settingsClassInput").value = "";
          } catch (e) {
            console.error(e);
            toast("❌ Помилка оновлення");
          } finally {
            btnJoinClass.textContent = "Ок";
          }
        };
      }

      // Покинути клас (Учень)
      const btnLeaveClass = $("btnSettingsLeaveClass");
      if (btnLeaveClass) {
        btnLeaveClass.onclick = async () => {
          if (!confirm("Дійсно хочеш покинути поточний клас?")) return;
          try {
            const {
              data: { user }
            } = await supa.auth.getUser();
            if (user) await supa.from("profiles").update({ class_code: null }).eq("id", user.id);
            state.user.class_code = null;
            save();
            toast("✅ Ти покинув клас");
            if (typeof sidebarApi !== "undefined") sidebarApi.renderSidebarHome();
            showSettings();
          } catch (e) {
            toast("❌ Помилка");
          }
        };
      }

      // Зміна ролі: З Учня на Вчителя
      const btnBecomeTeacher = $("btnSettingsBecomeTeacher");
      if (btnBecomeTeacher) {
        btnBecomeTeacher.onclick = async () => {
          if (!confirm("Дійсно хочеш стати Вчителем? Ти автоматично вийдеш зі свого поточного класу учнів."))
            return;
          btnBecomeTeacher.textContent = "⏳...";
          try {
            const {
              data: { user }
            } = await supa.auth.getUser();
            if (user)
              await supa.from("profiles").update({ role: "teacher", class_code: null }).eq("id", user.id);

            state.user.role = "teacher";
            state.user.class_code = null; // Виходимо з класу
            state.user.teacherClasses = state.user.teacherClasses || [];
            save();
            toast("✅ Тепер ти Вчитель!");
            if (typeof sidebarApi !== "undefined") sidebarApi.renderSidebarHome();
            showSettings();
            // автоматично відкриваємо кабінет вчителя
            goto("/teacher");
          } catch (e) {
            toast("❌ Помилка");
            btnBecomeTeacher.innerHTML = `<i class="ri-user-star-line"></i> Стати Вчителем`;
          }
        };
      }

      // Зміна ролі: З Вчителя на Учня
      const btnBecomeStudent = $("btnSettingsBecomeStudent");
      if (btnBecomeStudent) {
        btnBecomeStudent.onclick = async () => {
          if (!confirm("Дійсно хочеш стати Учнем?")) return;
          btnBecomeStudent.textContent = "⏳...";
          try {
            const {
              data: { user }
            } = await supa.auth.getUser();
            if (user)
              await supa.from("profiles").update({ role: "student", class_code: null }).eq("id", user.id);

            state.user.role = "student";
            state.user.class_code = null;
            save();
            toast("✅ Тепер ти Учень!");
            if (typeof sidebarApi !== "undefined") sidebarApi.renderSidebarHome();

            // Якщо він був у кабінеті вчителя, перекидаємо на головну сторінку
            if (location.hash === "#/teacher") window.location.hash = "#/home";

            showSettings();
          } catch (e) {
            toast("❌ Помилка");
            btnBecomeStudent.innerHTML = `<i class="ri-user-smile-line"></i> Стати Учнем`;
          }
        };
      }

      // Вийти з акаунта
      const btnLogout = $("btnLogout");
      if (btnLogout) {
        btnLogout.onclick = async () => {
          if (!confirm("Дійсно хочеш вийти з акаунта? Твій прогрес збережено у хмарі.")) return;
          try {
            if (supa) await supa.auth.signOut();
            window.App.storage.resetAll();
            window.location.hash = "";
            window.location.reload();
          } catch (e) {
            toast("❌ Помилка при виході");
          }
        };
      }
    }

    return { showSettings };
  }

  return { create };
})();
