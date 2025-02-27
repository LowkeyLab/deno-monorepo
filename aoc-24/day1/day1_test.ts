import { assertEquals } from "@std/assert";
import { getSimilarityScore, getTotalDistance, readInput } from "./day1.ts";

// Get the directory of the current file
const currentDir = new URL(".", import.meta.url).pathname;

// Define a setup function to avoid reading the file multiple times
async function getTestInput() {
  // Construct the absolute path to day1.txt
  const inputPath = `${currentDir}/day1.txt`;
  return await readInput(inputPath);
}

Deno.test(
  "Calculates the total distance between number pairs correctly",
  async () => {
    const input = await getTestInput();
    assertEquals(getTotalDistance(input), 1603498n);
  },
);

Deno.test("Measures how similar the two data sets are", async () => {
  const input = await getTestInput();
  assertEquals(getSimilarityScore(input), 25574739n);
});
