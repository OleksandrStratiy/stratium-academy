window.App = window.App || {};

window.App.theme = (function () {
  "use strict";

  function applyTheme(theme, state, myCodeMirror) {
    const t = theme === "light" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", t);
    state.settings.theme = t;

    const icon = document.getElementById("uiThemeIcon");
    if (icon) icon.className = (t === "light") ? "ri-moon-line" : "ri-sun-line";
    if (myCodeMirror) {
      myCodeMirror.setOption("theme", t === "light" ? "default" : "dracula");
    }

    const themeClass = t === "light" ? "default" : "dracula";
    document.querySelectorAll(".code-box").forEach(box => {
      box.classList.remove("cm-s-default", "cm-s-dracula");
      box.classList.add(`cm-s-${themeClass}`);
    });
  }

  function toggleTheme(state, myCodeMirror, saveFn, toastFn) {
    const next = (state.settings.theme === "light") ? "dark" : "light";
    applyTheme(next, state, myCodeMirror);
    saveFn();
    toastFn(next === "light" ? "🌞 Світла тема" : "🌙 Темна тема");
  }

  return {
    applyTheme,
    toggleTheme
  };
})();
