/* Accessible staff navigation; backend permissions are enforced separately. */
(function () {
  "use strict";
  if (window.__NAVBAR_LOADED__) return;
  window.__NAVBAR_LOADED__ = true;

  const currentPage = window.location.pathname.split("/").pop() || "tasklist.html";
  const userRole = (localStorage.getItem("user_role") || "").toLowerCase();
  const isAdmin = userRole === "admin";

  const icons = {
    tasks: '<rect x="3" y="4" width="18" height="17" rx="2"></rect><path d="M8 9h8M8 13h8M8 17h5"></path>',
    admin: '<rect x="3" y="3" width="8" height="8" rx="1"></rect><rect x="13" y="3" width="8" height="8" rx="1"></rect><rect x="3" y="13" width="8" height="8" rx="1"></rect><rect x="13" y="13" width="8" height="8" rx="1"></rect>',
    profile: '<circle cx="12" cy="8" r="4"></circle><path d="M4 21c0-4.2 3.6-7 8-7s8 2.8 8 7"></path>'
  };

  function makeTab(label, file, icon, active) {
    const link = document.createElement("a");
    link.href = file;
    link.className = "fsms-tab" + (active ? " fsms-tab-active" : "");
    if (active) link.setAttribute("aria-current", "page");

    const graphic = document.createElement("span");
    graphic.className = "fsms-icon";
    graphic.setAttribute("aria-hidden", "true");
    graphic.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      icons[icon] + "</svg>";
    const caption = document.createElement("span");
    caption.className = "fsms-label";
    caption.textContent = label;
    link.append(graphic, caption);
    return link;
  }

  function renderNavigation() {
    const header = document.createElement("header");
    header.id = "fsms-topbar";

    const brand = document.createElement("div");
    brand.className = "fsms-brand";
    brand.innerHTML =
      '<span class="fsms-brand-mark" aria-hidden="true">F</span>' +
      '<span><strong class="fsms-brand-title">Field Service</strong>' +
      '<span class="fsms-brand-caption">Monitoring System</span></span>';

    const logoutButton = document.createElement("button");
    logoutButton.id = "fsms-logout";
    logoutButton.type = "button";
    logoutButton.textContent = "Log out";
    logoutButton.addEventListener("click", () => {
      localStorage.clear();
      window.location.href = "index.html";
    });
    header.append(brand, logoutButton);
    document.body.prepend(header);

    const nav = document.createElement("nav");
    nav.id = "fsms-bottombar";
    nav.setAttribute("aria-label", "Staff navigation");
    nav.appendChild(makeTab("Tasks", "tasklist.html", "tasks",
      currentPage === "tasklist.html" || currentPage === "task-details.html"));
    if (isAdmin) {
      nav.appendChild(makeTab("Admin", "admin-dashboard.html", "admin", false));
    }
    nav.appendChild(makeTab("Profile", "profile.html", "profile",
      currentPage === "profile.html"));
    document.body.appendChild(nav);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderNavigation, { once: true });
  } else {
    renderNavigation();
  }
})();
