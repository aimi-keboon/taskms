const test = require("node:test");
const assert = require("node:assert/strict");
const { malaysiaToday, normalizeDate, filterTasks, isDone } = require("../tasklist-utils.js");

const tasks = [
  { id: "T-1", client: "Acme", location: "Bangi", date: "2026-11-10", time: "09:00", status: "New" },
  { id: "T-2", client: "Beta", location: "Kajang", date: "2026-11-11", time: "10:00", status: " done " },
  { id: "T-3", client: "Gamma", location: "Bangi", date: "2026-11-08", time: "11:00", status: "In Progress" },
  { id: "T-4", client: "Delta", location: "Putrajaya", date: "2026-11-12", status: "In Progress" }
];

test("Malaysia date advances at midnight MYT, not UTC midnight", () => {
  assert.equal(malaysiaToday(new Date("2026-11-09T15:59:59Z")), "2026-11-09");
  assert.equal(malaysiaToday(new Date("2026-11-09T16:00:00Z")), "2026-11-10");
});

test("date normalization keeps the scheduled calendar day", () => {
  assert.equal(normalizeDate("2026-11-10"), "2026-11-10");
  assert.equal(normalizeDate("2026-11-10T09:00:00"), "2026-11-10");
  assert.equal(normalizeDate("10/11/2026"), "");
  assert.equal(normalizeDate(null), "");
});

test("filtering supports each tab without mutating source tasks", () => {
  assert.deepEqual(filterTasks(tasks, "today", "", "2026-11-10").map(t => t.id), ["T-1"]);
  assert.deepEqual(filterTasks(tasks, "upcoming", "", "2026-11-10").map(t => t.id), ["T-4"]);
  assert.deepEqual(filterTasks(tasks, "completed", "", "2026-11-10").map(t => t.id), ["T-2"]);
  assert.deepEqual(filterTasks(tasks, "past", "", "2026-11-10").map(t => t.id), ["T-3"]);
  assert.equal(tasks.length, 4);
});

test("search is case-insensitive and matches client, location, and ID", () => {
  assert.deepEqual(filterTasks(tasks, "today", " ACME ", "2026-11-10").map(t => t.id), ["T-1"]);
  assert.deepEqual(filterTasks(tasks, "upcoming", "putra", "2026-11-10").map(t => t.id), ["T-4"]);
  assert.deepEqual(filterTasks(tasks, "completed", "t-2", "2026-11-10").map(t => t.id), ["T-2"]);
});

test("completed status comparison is case and whitespace insensitive", () => {
  assert.equal(isDone(" DONE "), true);
  assert.equal(isDone("In Progress"), false);
  assert.deepEqual(filterTasks([null, {}], "upcoming", "", "2026-11-10"), []);
});
