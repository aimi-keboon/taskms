/* Responsive admin tables: label generated cells for compact card layouts.
 * No network calls or framework dependency. Existing table data/actions stay intact.
 */
(function (root) {
  "use strict";

  function getHeaders(table) {
    return Array.from(table.querySelectorAll("thead th"), th =>
      (th.textContent || "").trim().replace(/\s+/g, " ") || "Details"
    );
  }

  function labelRow(row, headers) {
    const cells = Array.from(row.children).filter(cell =>
      cell.tagName === "TD"
    );
    if (!cells.length) return;
    // Empty / loading rows often span the full header width.
    if (cells.length === 1 && cells[0].colSpan > 1) {
      cells[0].removeAttribute("data-label");
      return;
    }
    cells.forEach((cell, index) => {
      const label = headers[index] || "Details";
      if (cell.getAttribute("data-label") !== label) {
        cell.setAttribute("data-label", label);
      }
    });
  }

  function enhanceTable(table) {
    const headers = getHeaders(table);
    if (!headers.length) return;
    table.setAttribute("data-responsive-table", "true");
    // Preserve table semantics even when CSS changes layout display.
    table.setAttribute("role", "table");
    const body = table.querySelector("tbody");
    if (!body) return;
    body.setAttribute("role", "rowgroup");
    const update = () => {
      for (const row of body.rows) {
        row.setAttribute("role", "row");
        labelRow(row, headers);
      }
    };
    update();
    // Render functions replace/append rows after API calls and filters.
    const observer = new MutationObserver(update);
    observer.observe(body, { childList: true });
  }

  function init() {
    document.querySelectorAll("body.admin-page .table-wrapper table")
      .forEach(enhanceTable);
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { getHeaders, labelRow };
  }
  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init, { once: true });
    } else {
      init();
    }
  }
})(typeof window !== "undefined" ? window : globalThis);
