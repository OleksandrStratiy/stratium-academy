window.App = window.App || {};

window.App.authUI = (function () {
  "use strict";

  function create(deps) {
    const {
      $,
      on,
      supa,
      state,
      save,
      toast,
      updateStreak,
      onAuthSuccess // Колбек, який скаже app.js продовжити рендер
    } = deps;

    // --- DOM Елементи ---
    const authOverlay = $("authOverlay");
    const roleOverlay = $("roleOverlay");
    
    const btnRoleStudent = $("btnRoleStudent");
    const btnRoleTeacher = $("btnRoleTeacher");
    const classCodeSection = $("classCodeSection");
    const classCodeInput = $("classCodeInput");
    
    let selectedRole = null; // 'student' або 'teacher'

    // --- Управління вікнами ---
    function showAuth() { authOverlay && authOverlay.classList.add("active"); }
    function hideAuth() { authOverlay && authOverlay.classList.remove("active"); }
    function showRoleSelection() { roleOverlay && roleOverlay.classList.add("active"); }
    function hideRoleSelection() { roleOverlay && roleOverlay.classList.remove("active"); }

    // --- Локальний вхід (за нікнеймом) ---
    on($("loginForm"), "submit", (e) => {
      e.preventDefault();
      const name = $("usernameInput").value.trim();
      const err = $("loginErr");
      
      if (name.length < 2) {
        err.style.display = "block";
        err.textContent = "Нікнейм має бути хоча б 2 символи.";
        return;
      }
      err.style.display = "none";

      state.user = {
        name,
        role: "local",
        xp: 0,
        streak: 1,
        lastDay: null,
        completed: {},
        attempts: {},
        spoiled: {},
        drafts: {},
        errorLogs: {},
        moduleAccess: {},
      };
      
      updateStreak(state.user);
      save();

      toast("✅ Локальний вхід виконано");
      hideAuth();
      onAuthSuccess();
    });

    // --- Вхід через Google ---
    on($("btnGoogle"), "click", async () => {
      try {
        if (!supa) throw new Error("Supabase не підключено");
        const redirectTo = window.location.origin + window.location.pathname;
        await supa.auth.signInWithOAuth({
          provider: "google",
          options: { redirectTo },
        });
      } catch (error) {
        toast("❌ Помилка входу через Google");
        console.error(error);
      }
    });

    // --- Логіка вибору ролі ---
    function setActiveRoleButton(role) {
      if (btnRoleStudent) btnRoleStudent.style.borderColor = role === 'student' ? 'var(--primary)' : 'rgba(14,165,233,0.3)';
      if (btnRoleTeacher) btnRoleTeacher.style.borderColor = role === 'teacher' ? 'var(--accent)' : 'rgba(139,92,246,0.3)';
    }

    on(btnRoleStudent, "click", () => {
      selectedRole = "student";
      setActiveRoleButton(selectedRole);
      if (classCodeSection) classCodeSection.style.display = "block";
    });

    on(btnRoleTeacher, "click", () => {
      selectedRole = "teacher";
      setActiveRoleButton(selectedRole);
      if (classCodeSection) classCodeSection.style.display = "none";
    });

    // --- Збереження ролі в Supabase ---
    on($("btnSubmitRole"), "click", async () => {
      saveProfile();
    });

    on($("btnSkipClass"), "click", async (e) => {
      e.preventDefault();
      if (classCodeInput) classCodeInput.value = ""; 
      saveProfile();
    });

    async function saveProfile() {
      if (!selectedRole) {
        toast("⚠️ Будь ласка, обери роль");
        return;
      }

      const classCode = classCodeInput ? classCodeInput.value.trim().toUpperCase() : null;
      
      try {
        const { data: { user } } = await supa.auth.getUser();
        if (!user) throw new Error("Користувача не знайдено");

        // Зберігаємо профіль у БД
        const { error } = await supa
          .from("profiles")
          .upsert({
            id: user.id,
            full_name: user.user_metadata?.full_name || "User",
            role: selectedRole,
            class_code: classCode || null,
            updated_at: new Date().toISOString()
          });

        if (error) throw error;

        // Оновлюємо локальний стейт
        if (state.user) {
          state.user.role = selectedRole;
          state.user.class_code = classCode;
          save();
        }

        toast("✅ Профіль налаштовано!");
        hideRoleSelection();
        onAuthSuccess();

      } catch (error) {
        toast("❌ Не вдалося зберегти профіль");
        console.error(error);
      }
    }

    // --- Перевірка профілю при старті ---
    // Викликається з app.js після того, як Google Auth повернув сесію
    async function checkCloudProfile(authUser) {
      try {
        const { data: profile, error } = await supa
          .from("profiles")
          .select("role, class_code, full_name")
          .eq("id", authUser.id)
          .maybeSingle();

        if (error) {
          console.error("Profile load error:", error);
          return true; // assume complete
        }

        if (!profile || !profile.role) {
          // Профілю ще немає (перший вхід) — показуємо вікно вибору
          hideAuth();
          showRoleSelection();
          return false; // Auth flow paused
        }

        // Профіль є, записуємо дані в стейт
        if (state.user) {
          state.user.role = profile.role;
          state.user.class_code = profile.class_code;
          state.user.name = profile.full_name || state.user.name;
          save();
        }
        
        return true; // Auth flow complete
      } catch (e) {
        console.error("Profile check error:", e);
        return true; // assume complete
      }
    }

    return {
      showAuth,
      hideAuth,
      checkCloudProfile
    };
  }

  return { create };
})();
