import { assertEquals } from "@std/assert";
import { isSafe, readInput } from "./day2.ts";

// Get the directory of the current file
const currentDir = new URL(".", import.meta.url).pathname;

// Define a function to load the test data
async function getTestData() {
  const testPath = `${currentDir}/test.txt`;
  return await readInput(testPath);
}

// Define a function to load the main data
async function getMainData() {
  const mainPath = `${currentDir}/day2.txt`;
  return await readInput(mainPath);
}

Deno.test("Checks if level transitions are safe", async () => {
  const reports = await getTestData();
  assertEquals(isSafe(reports), false, "The test data should not be safe");
});

Deno.test("Evaluates safety of day2 data", async () => {
  const reports = await getMainData();
  // Note: Change the expected value below based on what you expect the result to be
  assertEquals(
    isSafe(reports),
    false,
    "The day2 data should not be safe",
  );
});

// Test a known safe report
Deno.test("Correctly identifies safe level transitions", () => {
  const safeReports = [
    [1, 2, 3, 4], // Consistently increasing with safe differences
    [9, 8, 7, 6], // Consistently decreasing with safe differences
  ];
  assertEquals(isSafe(safeReports), true, "These transitions should be safe");
});

// Test a report with unsafe transitions
Deno.test("Correctly identifies unsafe level transitions due to large differences", () => {
  const unsafeReports = [
    [1, 5, 7, 8], // First difference (5-1=4) is too large
  ];
  assertEquals(
    isSafe(unsafeReports),
    false,
    "Large differences should be unsafe",
  );
});

Deno.test("Correctly identifies unsafe level transitions due to direction changes", () => {
  const unsafeReports = [
    [1, 2, 1, 2], // Direction changes
  ];
  assertEquals(
    isSafe(unsafeReports),
    false,
    "Direction changes should be unsafe",
  );
});
