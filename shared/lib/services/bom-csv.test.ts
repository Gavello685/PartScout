import assert from "node:assert/strict";
import test from "node:test";
import { parseBomCsv } from "./bom-csv";

test("parseBomCsv parses valid rows", () => {
  const csv = [
    "part_number,quantity,description",
    "NE555P,10,Timer IC",
    "LM358,4,Dual op-amp"
  ].join("\n");

  const result = parseBomCsv(csv);

  assert.deepEqual(result.headerErrors, []);
  assert.equal(result.rows.length, 2);
  assert.equal(result.rows[0].partNumber, "NE555P");
  assert.equal(result.rows[0].quantity, 10);
  assert.deepEqual(result.rows[0].errors, []);
});

test("parseBomCsv reports row validation errors", () => {
  const csv = ["part_number,quantity,description", ",0,Missing part", "ATMEGA328P,-2,"].join("\n");

  const result = parseBomCsv(csv);

  assert.equal(result.rows.length, 2);
  assert.deepEqual(result.rows[0].errors, ["part_number is required", "quantity must be a positive integer"]);
  assert.deepEqual(result.rows[1].errors, ["quantity must be a positive integer"]);
});

test("parseBomCsv reports missing required columns", () => {
  const csv = ["part_number,description", "NE555P,Timer"].join("\n");

  const result = parseBomCsv(csv);

  assert.ok(result.headerErrors.includes("Missing required column: quantity"));
});
