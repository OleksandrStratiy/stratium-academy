window.App = window.App || {};
window.App.uiLeaderboard = (function () {
  "use strict";

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function create(deps) {
    const {
      $,
      state,
      supa,
      toast,
      setActiveView,
      viewLeaderboard
    } = deps;

    async function renderLeaderboard() {
      setActiveView(viewLeaderboard);
      $("breadcrumbs").innerText = "🏆 Рейтинг Академії";

      const listEl = $("leaderboardList");
      if (!listEl) return;

      listEl.innerHTML = `
        <div style="text-align:center; padding:40px 20px; color:var(--text-dim); font-weight:700; font-size:16px;">
          Завантаження рейтингу... ⏳
        </div>
      `;

      try {
        let rows = [];

        if (supa) {
          const { data, error } = await supa
            .from("progress")
            .select("state");

          if (error) throw error;

          if (data) {
            rows = data
              .map((row) => row.state?.user)
              .filter((u) => u && typeof u.xp === "number")
              .map((u) => ({
                name: u.name || "Анонім",
                xp: u.xp || 0,
                streak: u.streak || 1
              }));
          }
        } else {
          const me = state.user
            ? { name: state.user.name, xp: state.user.xp, streak: state.user.streak }
            : null;

          rows = state.leaderboard.concat(me ? [me] : []);
        }

        const merged = new Map();

        rows.forEach((r) => {
          const key = (r.name || "Анонім").trim().toLowerCase();
          const prev = merged.get(key);

          if (!prev || (r.xp || 0) > (prev.xp || 0)) {
            merged.set(key, {
              name: r.name || "Анонім",
              xp: r.xp || 0,
              streak: r.streak || 1
            });
          }
        });

        const board = [...merged.values()]
          .sort((a, b) => b.xp - a.xp)
          .slice(0, 50);

        if (!board.length) {
          listEl.innerHTML = `
            <div style="text-align:center; padding:40px 20px; color:var(--text-dim); font-weight:700;">
              Рейтинг поки порожній.
            </div>
          `;
          return;
        }

        listEl.innerHTML = board.map((u, i) => {
          const medal =
            i === 0 ? "🥇" :
            i === 1 ? "🥈" :
            i === 2 ? "🥉" : `#${i + 1}`;

          const isMe = state.user && u.name === state.user.name;

          return `
            <div class="rowBoard ${isMe ? "me" : ""}">
              <div style="display:flex; align-items:center; gap:12px; min-width:0;">
                <div style="min-width:52px; font-weight:900; color:var(--primary);">${medal}</div>
                <div style="min-width:0;">
                  <div style="font-weight:900; color:var(--text); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                    ${escapeHtml(u.name)}
                  </div>
                  <div class="tag">🔥 ${u.streak || 1} day streak</div>
                </div>
              </div>
              <div style="font-weight:900; color:var(--text); white-space:nowrap;">${u.xp || 0} XP</div>
            </div>
          `;
        }).join("");
      } catch (e) {
        console.error(e);
        listEl.innerHTML = `
          <div style="text-align:center; padding:40px 20px; color:var(--danger); font-weight:700;">
            Не вдалося завантажити рейтинг.
          </div>
        `;
        toast("Не вдалося завантажити рейтинг");
      }
    }

    return {
      renderLeaderboard
    };
  }

  return { create };
})();
