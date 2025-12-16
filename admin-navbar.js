/* ============================================================
   FSMS UNIVERSAL ADMIN HEADER + NAVIGATION BAR
   Author: Aimi Misman
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  renderGlobalHeader();
});

/* Build and inject the header + navigation */
function renderGlobalHeader() {
  const container = document.getElementById("globalHeader");
  if (!container) return;

  const session = {
    email: localStorage.getItem("user_email"),
    companyID: localStorage.getItem("user_companyID"),
    name: localStorage.getItem("user_name"),
  };

  // redirect if not logged in
  if (!session.email) {
    window.location.href = "index.html";
    return;
  }

  const currentPage = window.location.pathname.split("/").pop();

  const navItems = [
    { label: "Dashboard", file: "admin-dashboard.html" },
    { label: "Users", file: "admin-users.html" },
    { label: "Tasks", file: "admin-tasks.html" },
    { label: "Survey Settings", file: "admin-survey-templates.html" },
    { label: "Staff View", file: "tasklist.html" },
  ];

  container.innerHTML = `
    <style>
      :root {
        --primary: #2c5aa0;
        --nav-bg: #1f3e72;
        --nav-text: #d9e6ff;
        --radius: 8px;
      }

      /* ===== TOP HEADER ===== */
      .fsms-header {
        background: var(--primary);
        color: white;
        padding: 14px 22px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: 'Inter', Arial, sans-serif;
        box-shadow: 0 3px 10px rgba(0,0,0,0.18);
      }

      .fsms-header-title {
        font-size: 1.15rem;
        font-weight: 700;
      }

      .fsms-header-right {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 0.9rem;
      }

      .fsms-logout {
        cursor: pointer;
        text-decoration: underline;
        color: white;
      }

      /* ===== NAV BAR ===== */
      .fsms-nav {
        background: var(--nav-bg);
        padding: 10px 20px;
        display: flex;
        gap: 20px;
        align-items: center;
        font-family: 'Inter', Arial, sans-serif;
      }

      .fsms-nav a {
        color: var(--nav-text);
        text-decoration: none;
        font-size: 0.9rem;
        padding: 6px 12px;
        border-radius: var(--radius);
        transition: 0.2s;
      }

      .fsms-nav a:hover {
        background: rgba(255,255,255,0.18);
      }

      .fsms-nav .active {
        background: white;
        color: var(--nav-bg);
        font-weight: 600;
      }
    </style>

    <div class="fsms-header">
      <div class="fsms-header-title">Field Service Monitoring System – Admin</div>
      <div class="fsms-header-right">
        <span>${session.name || session.email}</span>
        <span>(${session.companyID})</span>
        <span class="fsms-logout" onclick="logout()">Logout</span>
      </div>
    </div>

    <nav class="fsms-nav">
      ${navItems
        .map(
          (n) => `
          <a 
            href="${n.file}" 
            class="${currentPage === n.file ? "active" : ""}"
          >
            ${n.label}
          </a>`
        )
        .join("")}
    </nav>
  `;
}

/* Logout */
function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}
