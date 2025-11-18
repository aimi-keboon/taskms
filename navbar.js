/* ---------------------------------------------------------
   GLOBAL NAVIGATION BAR (Top + Bottom) for FSMS Staff App
   This file injects:
   - Top bar with Logout button
   - Bottom tab bar (Tasks | Profile)
   Author: Aimi Misman
--------------------------------------------------------- */

(function () {
  // Prevent duplicate injection
  if (window.__NAVBAR_LOADED__) return;
  window.__NAVBAR_LOADED__ = true;

  const currentPage = window.location.pathname.split("/").pop();

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

  /* -------------------- BOTTOM BAR --------------------- */
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
        <div style="font-size: 1.2rem;">📋</div>
        <div style="font-size: 0.8rem;">Tasks</div>
      </div>

      <div class="fsms-tab ${isActive("profile.html")}" data-link="profile.html">
        <div style="font-size: 1.2rem;">👤</div>
        <div style="font-size: 0.8rem;">Profile</div>
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
    }
    .fsms-tab-active {
      color: #2c5aa0 !important;
      font-weight: 600;
    }
  `;
  document.head.appendChild(style);

})();
