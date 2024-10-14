const { strict: assert } = require("assert");
const { test, describe, beforeEach } = require("node:test");
const CSVParser = require("../../parsers/CSVParser");

describe("CSVParser", () => {
  let parser;

  beforeEach(() => {
    parser = new CSVParser();
  });

  test("should correctly split rows based on newline delimiter", () => {
    const data =
      "city,population,area,density,country\nShanghai,24256800,6340,3826,China\nDelhi,16787941,1484,11313,India\nLagos,16060303,1171,13712,Nigeria";
    const rows = parser.splitRows(data);
    assert.deepEqual(rows, [
      "city,population,area,density,country",
      "Shanghai,24256800,6340,3826,China",
      "Delhi,16787941,1484,11313,India",
      "Lagos,16060303,1171,13712,Nigeria",
    ]);
  });

  test("should correctly normalize data", () => {
    assert.equal(parser.normalizeData(" 24256800 "), 24256800); // Should convert to number
    assert.equal(parser.normalizeData("Shanghai"), "Shanghai"); // Should remain a string
    assert.equal(parser.normalizeData("  China  "), "China"); // Should trim and keep as a string
  });

  test("should correctly split values in a row", () => {
    const rows = [
      "city,population,area,density,country",
      "Shanghai,24256800,6340,3826,China",
      "Delhi,16787941,1484,11313,India",
      "Lagos,16060303,1171,13712,Nigeria",
    ];
    const splitRows = parser.splitValues(rows);
    assert.deepEqual(splitRows, [
      ["city", "population", "area", "density", "country"],
      ["Shanghai", 24256800, 6340, 3826, "China"],
      ["Delhi", 16787941, 1484, 11313, "India"],
      ["Lagos", 16060303, 1171, 13712, "Nigeria"],
    ]);
  });

  test("should correctly parse a CSV string into headers and rows", () => {
    const data =
      "city,population,area,density,country\nShanghai,24256800,6340,3826,China\nDelhi,16787941,1484,11313,India\nLagos,16060303,1171,13712,Nigeria";
    const result = parser.parse(data);

    assert.deepEqual(result.headers, [
      "city",
      "population",
      "area",
      "density",
      "country",
    ]);
    assert.deepEqual(result.rows, [
      ["Shanghai", 24256800, 6340, 3826, "China"],
      ["Delhi", 16787941, 1484, 11313, "India"],
      ["Lagos", 16060303, 1171, 13712, "Nigeria"],
    ]);
  });

  test("should handle empty input gracefully", () => {
    const result = parser.parse("");
    assert.deepEqual(result.headers, []);
    assert.deepEqual(result.rows, []);
  });

  test("should handle rows with inconsistent number of columns", () => {
    const data =
      "city,population,area,density,country\nShanghai,24256800,6340\nDelhi,16787941,1484,11313,India,ExtraColumn\nLagos,16060303,1171,13712,Nigeria";
    const result = parser.parse(data);

    assert.deepEqual(result.headers, [
      "city",
      "population",
      "area",
      "density",
      "country",
    ]);
    assert.deepEqual(result.rows, [
      ["Shanghai", 24256800, 6340], // Inconsistent: fewer columns
      ["Delhi", 16787941, 1484, 11313, "India", "ExtraColumn"], // Inconsistent: more columns
      ["Lagos", 16060303, 1171, 13712, "Nigeria"],
    ]);
  });
});
