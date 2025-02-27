import { assertEquals } from "@std/assert";
import { countSafe, readInput } from "./day2.ts";

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

Deno.test("Counts safe reports in test data", async () => {
  const reports = await getTestData();
  assertEquals(
    countSafe(reports),
    2,
    "Should count the correct number of safe reports in test data",
  );
});

Deno.test("Counts safe reports in day2 data", async () => {
  const reports = await getMainData();
  // Update with expected safe report count
  assertEquals(
    countSafe(reports),
    421,
    "Should count the correct number of safe reports in day2 data",
  );
});

// Test with known all-safe reports
Deno.test("Correctly counts safe level transitions", () => {
  const safeReports = [
    [1, 2, 3, 4], // Consistently increasing with safe differences
    [9, 8, 7, 6], // Consistently decreasing with safe differences
  ];
  assertEquals(countSafe(safeReports), 2, "Should count both reports as safe");
});

// Test with reports having unsafe transitions
Deno.test("Correctly identifies reports with unsafe level differences", () => {
  const mixedReports = [
    [1, 5, 7, 8], // First difference (5-1=4) is too large
    [1, 2, 3, 4], // All safe
  ];
  assertEquals(
    countSafe(mixedReports),
    1,
    "Should count only the second report as safe",
  );
});

Deno.test("Correctly identifies reports with unsafe direction changes", () => {
  const mixedReports = [
    [1, 2, 1, 2], // Direction changes
    [5, 4, 3, 2], // All decreasing (safe)
    [1, 3, 2, 1], // Direction changes
  ];
  assertEquals(
    countSafe(mixedReports),
    1,
    "Should count only the consistently decreasing report as safe",
  );
});
