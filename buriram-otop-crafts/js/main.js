document.addEventListener("DOMContentLoaded", () => {
  // ----------------------------------------------------
  // JS ฟังก์ชันที่ 1: สลับโหมดสว่าง/มืด (Dark/Light Mode)
  // ----------------------------------------------------
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");

  // ตรวจสอบ Theme ที่เคยบันทึกไว้ใน LocalStorage
  if (localStorage.getItem("color-theme") === "dark" || 
     (!("color-theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.documentElement.classList.add("dark");
    if (themeIcon) themeIcon.className = "fas fa-sun text-yellow-400";
  } else {
    document.documentElement.classList.remove("dark");
    if (themeIcon) themeIcon.className = "fas fa-moon text-gray-600";
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
        if (themeIcon) themeIcon.className = "fas fa-moon text-gray-600";
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
        if (themeIcon) themeIcon.className = "fas fa-sun text-yellow-400";
      }
    });
  }

  // ----------------------------------------------------
  // JS ฟังก์ชันที่ 2: เมนูมือถือ (Hamburger Menu)
  // ----------------------------------------------------
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }
});