const test = require("node:test");
const assert = require("node:assert/strict");
const { getHeaders, labelRow } = require("../responsive-tables.js");

function cell(tagName, colSpan = 1) {
  const attributes = {};
  return {
    tagName,
    colSpan,
    textContent: "",
    getAttribute(name) { return attributes[name] ?? null; },
    setAttribute(name, value) { attributes[name] = value; },
    removeAttribute(name) { delete attributes[name]; }
  };
}

test("readability labels come from live table headers", () => {
  const table = {
    querySelectorAll() {
      return [{ textContent: "Client" }, { textContent: "Assigned  Staff" }, { textContent: "Actions" }];
    }
  };
  assert.deepEqual(getHeaders(table), ["Client", "Assigned Staff", "Actions"]);
});

test("generated row cells receive their own column labels", () => {
  const row = { children: [cell("TD"), cell("TD"), cell("TD")] };
  labelRow(row, ["Client", "Status", "Actions"]);
  assert.deepEqual(row.children.map(td => td.getAttribute("data-label")), ["Client", "Status", "Actions"]);
});

test("loading/empty placeholders with colspan stay unlabeled", () => {
  const placeholder = cell("TD", 8);
  placeholder.setAttribute("data-label", "Previous");
  labelRow({children:[placeholder]}, ["Client", "Status"]);
  assert.equal(placeholder.getAttribute("data-label"), null);
});

test("unrecognized columns still have a readable label", () => {
  const row = { children: [cell("TD"), cell("TD")] };
  labelRow(row, ["Client"]);
  assert.equal(row.children[1].getAttribute("data-label"), "Details");
});
