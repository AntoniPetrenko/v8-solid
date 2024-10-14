const { strict: assert } = require("assert");
const { test, describe, beforeEach } = require("node:test");
const SortByDensityRatioDESC = require("../../operations/SortByDensityRatioDESC");

describe("SortByDensityRatioDESC", () => {
  let table;

  beforeEach(() => {
    table = {
      headers: ["city", "density ratio"],
      rows: [
        ["Shanghai", 1],
        ["Delhi", 3],
        ["Lagos", 2],
      ],
    };
  });

  test("should correctly find the index of the density column", () => {
    const sorter = new SortByDensityRatioDESC(table);
    assert.equal(sorter.targetColumnIndex, 1);
  });

  test("should correctly sort the rows by density in descending order", () => {
    const sorter = new SortByDensityRatioDESC(table);
    sorter.exec();

    assert.equal(table.rows[0][0], "Delhi");
    assert.equal(table.rows[1][0], "Lagos");
    assert.equal(table.rows[2][0], "Shanghai");
  });

  test("should handle empty table rows gracefully", () => {
    const emptyTable = {
      headers: ["city", "population", "area", "density", "country"],
      rows: [],
    };
    const sorter = new SortByDensityRatioDESC(emptyTable);
    sorter.exec();

    assert.equal(emptyTable.rows.length, 0); // Still empty after sorting
  });

  test('should handle table with no "density" column gracefully', () => {
    const tableWithoutDensity = {
      headers: ["city"],
      rows: [["Shanghai"], ["Delhi"], ["Lagos"]],
    };
    const sorter = new SortByDensityRatioDESC(tableWithoutDensity);
    assert.equal(sorter.targetColumnIndex, -1);
    sorter.exec();

    assert.equal(tableWithoutDensity.rows[0][0], "Shanghai");
    assert.equal(tableWithoutDensity.rows[1][0], "Delhi");
    assert.equal(tableWithoutDensity.rows[2][0], "Lagos");
  });
});
