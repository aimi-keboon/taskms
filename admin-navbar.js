/* Shared admin header/navigation. Navigation visibility is not authorization. */
(function () {
  "use strict";
  const navItems = [
    { label: "Dashboard", file: "admin-dashboard.html" },
    { label: "Users", file: "admin-users.html" },
    { label: "Tasks", file: "admin-tasks.html" },
    { label: "Survey settings", file: "admin-survey-templates.html" },
    { label: "Staff view", file: "tasklist.html" }
  ];

  function logout() {
    localStorage.clear();
    window.location.href = "index.html";
  }

  function renderGlobalHeader() {
    const container = document.getElementById("globalHeader");
    if (!container) return;

    const email = localStorage.getItem("user_email");
    if (!email) {
      window.location.href = "index.html";
      return;
    }
    const name = localStorage.getItem("user_name") || email;
    const companyID = localStorage.getItem("user_companyID") || "Company unavailable";
    const currentPage = window.location.pathname.split("/").pop();

    const header = document.createElement("header");
    header.className = "fsms-header";

    const brand = document.createElement("div");
    brand.className = "fsms-header-brand";
    brand.innerHTML =
      '<span class="fsms-brand-mark" aria-hidden="true">F</span>' +
      '<span><strong class="fsms-header-title">Field Service</strong>' +
      '<span class="fsms-header-caption">Administration workspace</span></span>';

    const accountRow = document.createElement("div");
    accountRow.className = "fsms-header-right";
    const account = document.createElement("div");
    account.className = "fsms-account";
    const nameLabel = document.createElement("span");
    nameLabel.className = "fsms-account-name";
    nameLabel.textContent = name;
    const companyLabel = document.createElement("span");
    companyLabel.className = "fsms-account-company";
    companyLabel.textContent = companyID;
    account.append(nameLabel, companyLabel);

    const logoutButton = document.createElement("button");
    logoutButton.type = "button";
    logoutButton.className = "fsms-logout";
    logoutButton.textContent = "Log out";
    logoutButton.addEventListener("click", logout);
    accountRow.append(account, logoutButton);
    header.append(brand, accountRow);

    const nav = document.createElement("nav");
    nav.className = "fsms-nav";
    nav.setAttribute("aria-label", "Admin navigation");
    navItems.forEach(item => {
      const link = document.createElement("a");
      link.href = item.file;
      link.textContent = item.label;
      if (currentPage === item.file) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      }
      nav.appendChild(link);
    });
    container.replaceChildren(header, nav);
  }

  // Preserve existing global calls from any admin screens.
  window.renderGlobalHeader = renderGlobalHeader;
  window.logout = logout;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderGlobalHeader, { once: true });
  } else {
    renderGlobalHeader();
  }
})();
