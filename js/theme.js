// Light/dark theme toggle, shared by every page.
// Loaded in <head> so the saved theme is applied before the page appears
// (this avoids a brief "flash" of the wrong theme).

(function () {
  var STORAGE_KEY = "theme";

  function getSavedTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null; // storage blocked (e.g. private browsing)
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      // ignore: the theme still changes, it just won't be remembered
    }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
  }

  // Light is the default unless the visitor chose dark before.
  var current = getSavedTheme() === "dark" ? "dark" : "light";
  applyTheme(current);

  function updateButton(button) {
    var isDark = current === "dark";
    button.textContent = isDark ? "Light theme" : "Dark theme";
    button.setAttribute("aria-pressed", String(isDark));
  }

  document.addEventListener("DOMContentLoaded", function () {
    var button = document.querySelector(".theme-toggle");
    if (!button) return;

    updateButton(button);
    button.addEventListener("click", function () {
      current = current === "dark" ? "light" : "dark";
      applyTheme(current);
      saveTheme(current);
      updateButton(button);
    });
  });
})();
