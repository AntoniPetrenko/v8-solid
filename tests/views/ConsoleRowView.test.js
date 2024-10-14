const { strict: assert } = require("assert");
const { test, describe, beforeEach } = require("node:test");
const ConsoleRowView = require("../../views/ConsoleRowView");

describe("ConsoleRowView", () => {
  let table;
  let view;

  beforeEach(() => {
    table = {
      headers: ["city", "population", "area", "density", "country", "code"],
      rows: [
        ["Shanghai", 24256800, 6340, 3826, "China", "CN"],
        ["Delhi", 16787941, 1484, 11313, "India", "IN"],
        ["Lagos", 16060303, 1171, 13712, "Nigeria", "NG"],
      ],
    };
    view = new ConsoleRowView(table);
  });

  test("should correctly format a single row to a string", () => {
    const row = ["Shanghai", 24256800, 6340, 3826, "China", "CN"];
    const expected =
      "Shanghai            24256800    6340    3826             China    CN";
    const result = view.rowToString(row);
    assert.equal(result, expected);
  });

  test("should correctly handle row with shorter values", () => {
    const row = ["Delhi", 16787941, 1484, 11313, "India", "IN"];
    const expected =
      "Delhi               16787941    1484   11313             India    IN";
    const result = view.rowToString(row);
    assert.equal(result, expected);
  });
});
