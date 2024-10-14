const { strict: assert } = require("assert");
const { test, describe, beforeEach } = require("node:test");
const CalculateDensityRatio = require("../../operations/CalculateDensityRatio");

describe("CalculateDensityRatio", () => {
  let table;

  beforeEach(() => {
    table = {
      headers: ["city", "population", "area", "density", "country"],
      rows: [
        ["Shanghai", 24256800, 6340, 3826, "China"],
        ["Delhi", 16787941, 1484, 11313, "India"],
        ["Lagos", 16060303, 1171, 13712, "Nigeria"],
      ],
    };
  });

  test("should correctly find the index of the density column", () => {
    const calculator = new CalculateDensityRatio(table);
    assert.equal(calculator.targetColumnIndex, 3);
  });

  test("should correctly calculate the maximum density", () => {
    const calculator = new CalculateDensityRatio(table);
    const maxDensity = calculator.getMaxDensity();
    assert.equal(maxDensity, 13712); // Maximum density in the table
  });

  test("should correctly add density ratio column and compute ratios", () => {
    const calculator = new CalculateDensityRatio(table);
    calculator.exec();
    assert.ok(table.headers.includes("density ratio"));
    assert.equal(table.rows[0][5], 28);
    assert.equal(table.rows[1][5], 83);
    assert.equal(table.rows[2][5], 100);
  });

  test("should handle table with no rows gracefully", () => {
    const emptyTable = {
      headers: ["material", "density", "volume"],
      rows: [],
    };
    const calculator = new CalculateDensityRatio(emptyTable);
    calculator.exec();

    assert.ok(emptyTable.headers.includes("density ratio"));
    assert.equal(emptyTable.rows.length, 0);
  });

  test('should handle table with no "density" column gracefully', () => {
    const tableWithoutDensity = {
      headers: ["city", "population", "area", "country"],
      rows: [
        ["Shanghai", 24256800, 6340, "China"],
        ["Delhi", 16787941, 1484, "India"],
        ["Lagos", 16060303, 1171, "Nigeria"],
      ],
    };
    const calculator = new CalculateDensityRatio(tableWithoutDensity);

    assert.equal(calculator.targetColumnIndex, -1); // Density column not found

    // Exec should not add any ratios because it can't find densities
    calculator.exec();
    assert.ok(!tableWithoutDensity.headers.includes("density ratio"));
    tableWithoutDensity.rows.forEach((row) => {
      assert.equal(row.length, 4); // No new column added
    });
  });
});
