// Завантаження/збереження прогресу в Supabase (з затримкою) та правил доступу класу.
window.App = window.App || {};

window.App.cloudSync = (function () {
  "use strict";

  function create(deps) {
    const { supa, state, save } = deps;

    async function getSessionUser() {
      if (!supa) return null;
      const {
        data: { session }
      } = await supa.auth.getSession();
      return session?.user || null;
    }

    async function cloudLoadState(userId) {
      // Спочатку пробуємо завантажити з profiles
      let res = await supa.from("profiles").select("progress").eq("id", userId).maybeSingle();
      if (res.data?.progress) return res.data.progress;

      // Якщо немає в profiles, пробуємо зі старої таблиці progress
      res = await supa.from("progress").select("state").eq("user_id", userId).maybeSingle();
      if (res.data?.state) {
        // Міграція: зберігаємо в profiles
        await supa
          .from("profiles")
          .upsert({ id: userId, progress: res.data.state, updated_at: new Date().toISOString() });
        return res.data.state;
      }

      return null;
    }

    async function loadClassAccessForStudent(userId) {
      if (!supa || !userId) return;

      const { data: profile, error: profileError } = await supa
        .from("profiles")
        .select("class_code")
        .eq("id", userId)
        .maybeSingle();

      if (profileError) {
        console.error(profileError);
        return;
      }

      const classCode = profile?.class_code || null;
      state.user.class_code = classCode;

      if (!classCode) {
        state.user.classModuleAccess = {};
        state.user.classTaskAccess = {};
        save();
        return;
      }

      const { data: classRow, error: classError } = await supa
        .from("classes")
        .select("module_access, task_access")
        .eq("code", classCode)
        .maybeSingle();

      if (classError) {
        console.error(classError);
        return;
      }

      state.user.classModuleAccess = classRow?.module_access || {};
      state.user.classTaskAccess = classRow?.task_access || {};
      save();
    }

    async function cloudSaveState(userId, fullState) {
      const { error } = await supa
        .from("profiles")
        .upsert({ id: userId, progress: fullState, updated_at: new Date().toISOString() });
      if (error) throw error;
    }

    let cloudTimer = null;

    function scheduleCloudSync(getStateFn) {
      if (!supa) return;
      clearTimeout(cloudTimer);
      cloudTimer = setTimeout(async () => {
        try {
          const user = await getSessionUser();
          if (!user) return;
          await cloudSaveState(user.id, getStateFn());
        } catch (e) {
          const user = await getSessionUser();
          console.error("Supabase load/save error:", e);

          if (!state.user) {
            const fallbackName = user?.user_metadata?.full_name || user?.email?.split("@")?.[0] || "User";

            state.user = {
              name: fallbackName,
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
              taskAccess: {},
              solutions: {}
            };
            save();
          }
        }
      }, 900);
    }

    return { getSessionUser, cloudLoadState, loadClassAccessForStudent, cloudSaveState, scheduleCloudSync };
  }

  return { create };
})();
