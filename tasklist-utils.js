/* Helpers shared by the staff task list and its dependency-free Node tests. */
(function (root) {
  "use strict";
function malaysiaToday(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kuala_Lumpur",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(now);
  const values = Object.fromEntries(parts.map(part => [part.type, part.value]));
  return values.year + "-" + values.month + "-" + values.day;
}
function isDone(status) {
  return String(status || "").trim().toLowerCase() === "done";
}
function normalizeDate(value) {
  if (typeof value !== "string") return "";
  const match = /^(\d{4}-\d{2}-\d{2})(?:$|[T\s])/.exec(value.trim());
  return match ? match[1] : "";
}
function filterTasks(tasks, filter, search = "", today = malaysiaToday()) {
  if (!Array.isArray(tasks)) return [];
  const query = String(search || "").trim().toLowerCase();
  return tasks.filter(task => {
    if (!task || typeof task !== "object") return false;
    const date = normalizeDate(task.date);
    const completed = isDone(task.status);
    let matchesTab = false;
    switch (filter) {
      case "today": matchesTab = date === today; break;
      case "upcoming": matchesTab = date > today && !completed; break;
      case "completed": matchesTab = completed; break;
      case "past": matchesTab = !!date && date < today; break;
      default: return false;
    }
    if (!matchesTab || !query) return matchesTab;
    const searchable = [
      task.client, task.location, task.status, task.id, task.date, task.time
    ].map(value => String(value == null ? "" : value)).join(" ").toLowerCase();
    return searchable.includes(query);
  });
}
  const api = { malaysiaToday, isDone, normalizeDate, filterTasks };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.TaskListUtils = api;
})(typeof window !== "undefined" ? window : globalThis);
