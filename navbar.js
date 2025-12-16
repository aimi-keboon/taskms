/* ---------------------------------------------------------
   GLOBAL NAVIGATION BAR (Top + Bottom) for FSMS Staff App
   Includes:
   - Top bar with Logout button
   - Bottom tab bar (Tasks | Profile) with SVG icons
   Author: Aimi Misman
--------------------------------------------------------- */

(function () {
  // Prevent duplicate injection
  if (window.__NAVBAR_LOADED__) return;
  window.__NAVBAR_LOADED__ = true;

  const currentPage = window.location.pathname.split("/").pop();
  const userRole = localStorage.getItem("user_role"); // e.g. "Admin" | "Staff"
  const isAdmin = userRole && userRole.toLowerCase() === "admin";


  /* ---------------------- TOP BAR ---------------------- */
  const topBarHTML = `
    <div id="fsms-topbar" style="
      width: 100%;
      background: linear-gradient(135deg, #2c5aa0, #1e3d72);
      color: white;
      padding: 14px 18px;
      font-size: 1.1rem;
      font-weight: 600;
      display:flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
    ">
      <span>FSMS</span>
      <button id="fsms-logout" style="
        background: rgba(255,255,255,0.2);
        border: none;
        padding: 6px 12px;
        border-radius: 6px;
        color: white;
        cursor: pointer;
        font-size: 0.9rem;
        font-weight: 500;
      ">Logout</button>
    </div>
  `;

  /* -------------------- BOTTOM BAR (SVG icons) --------------------- */
  const isActive = (page) =>
    currentPage === page ? "fsms-tab-active" : "";

  const bottomBarHTML = `
  <div id="fsms-bottombar" style="
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: white;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: space-around;
    padding: 10px 0;
    z-index: 999;
  ">
    <div class="fsms-tab ${isActive("tasklist.html")}" data-link="tasklist.html">
      <div class="fsms-icon">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2"></rect>
          <line x1="9" y1="8" x2="15" y2="8"></line>
          <line x1="9" y1="12" x2="15" y2="12"></line>
          <line x1="9" y1="16" x2="15" y2="16"></line>
        </svg>
      </div>
      <div class="fsms-label">Tasks</div>
    </div>

    ${isAdmin
      ? `
    <div
  class="fsms-tab fsms-tab-admin ${isActive("admin-dashboard.html")}"
  data-link="admin-dashboard.html"
>
  <div class="fsms-icon">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2" stroke-linecap="round"
      stroke-linejoin="round">
      <path d="M12 1l3 5 5 3-5 3-3 5-3-5-5-3 5-3 3-5z"></path>
    </svg>
  </div>
  <div class="fsms-label">Admin</div>
</div>

    `
      : ""
    }

    <div class="fsms-tab ${isActive("profile.html")}" data-link="profile.html">
      <div class="fsms-icon">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round">
          <circle cx="12" cy="8" r="4"></circle>
          <path d="M4 20c0-4 4-7 8-7s8 3 8 7"></path>
        </svg>
      </div>
      <div class="fsms-label">Profile</div>
    </div>
  </div>
`;


  /* ---------------- INSERT INTO DOCUMENT ---------------- */
  document.addEventListener("DOMContentLoaded", () => {
    // Insert top bar at the top of body
    document.body.insertAdjacentHTML("afterbegin", topBarHTML);

    // Insert bottom bar at end of body
    document.body.insertAdjacentHTML("beforeend", bottomBarHTML);

    /* ---------------- Bottom tab click handler ---------------- */
    document.querySelectorAll(".fsms-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        const link = tab.getAttribute("data-link");
        if (currentPage !== link) window.location.href = link;
      });
    });

    /* ---------------- Logout button ---------------- */
    const logoutBtn = document.getElementById("fsms-logout");
    logoutBtn.onclick = () => {
      localStorage.clear();
      window.location.href = "index.html";
    };
  });

  /* ---------------- EXTRA CSS ---------------- */
  const style = document.createElement("style");
  style.innerHTML = `
    .fsms-tab {
      flex: 1;
      text-align: center;
      cursor: pointer;
      color: #555;
      display:flex;
      flex-direction:column;
      align-items:center;
      gap:3px;
    }
    .fsms-icon svg {
      stroke: #777;
      transition: 0.25s;
    }
    .fsms-tab-active svg {
      stroke: #2c5aa0;
    }
    .fsms-label {
      font-size: 0.75rem;
    }
    .fsms-tab-active .fsms-label {
      color: #2c5aa0;
      font-weight: 600;
    }
      .fsms-tab-admin svg {
  stroke: #dc3545;
}

  `;
  document.head.appendChild(style);
})();
