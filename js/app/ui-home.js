window.App = window.App || {};

window.App.uiHome = (function () {
  "use strict";

  function create(deps) {
    const {
      $,
      DB,
      escapeHtml,
      courseProgress,
      openCourseWithLevel,
      setActiveView,
      viewHome,
      renderSidebarHome
    } = deps;

    function renderCoursesGrid() {
      const grid = $("coursesList");
      if (!grid) return;

      grid.innerHTML = DB.map(c => {
        const p = courseProgress(c);
        return `
          <div class="card" data-open-course="${c.id}">
            <div style="font-size:34px; margin-bottom:10px">${c.icon}</div>
            <h3>${escapeHtml(c.title)}</h3>
            <p>${escapeHtml(c.desc)}</p>
            <div class="progress-line"><div class="progress-fill" style="width:${p.pct}%"></div></div>
            <div style="font-size:12px; margin-top:6px; color:var(--text-dim); text-align:right">${p.pct}%</div>
          </div>
        `;
      }).join("");

      grid.querySelectorAll("[data-open-course]").forEach(card => {
        card.addEventListener("click", () => {
          const cid = card.getAttribute("data-open-course");
          openCourseWithLevel(cid);
        });
      });
    }

    function renderHome() {
      setActiveView(viewHome);
      $("breadcrumbs").innerText = "Головна";
      renderSidebarHome();
      renderCoursesGrid();
    }

    return {
      renderCoursesGrid,
      renderHome
    };
  }

  return { create };
})();
