/**
 * Represents a single report line containing multiple level readings
 */
export type Level = ReadonlyArray<number>;

/**
 * Represents the complete set of reports, each with its own level readings
 */
export type Reports = ReadonlyArray<Level>;

/**
 * Reads and parses the input file into structured report data.
 * @param filePath Path to the input file
 * @returns A collection of level reports
 */
export async function readInput(filePath: string): Promise<Reports> {
  // If the path is not absolute, resolve it relative to the current module
  const resolvedPath = filePath.startsWith("/")
    ? filePath
    : new URL(filePath, import.meta.url).pathname;

  const content = await Deno.readTextFile(resolvedPath);

  return content
    .trim()
    .split("\n")
    .map((line) =>
      line.trim()
        .split(/\s+/)
        .map((number) => parseInt(number, 10))
    );
}

/**
 * Determines if the reports indicate safe level transitions.
 * A transition is safe when:
 * - All transitions within a level go in the same direction (all increasing or all decreasing)
 * - The difference between adjacent levels is between 1 and 3 inclusive
 * @param reports Collection of level reports to check
 * @returns true if all transitions are safe, false otherwise
 */
export function countSafe(reports: Reports): number {
  let safeReports = 0;
  for (const level of reports) {
    let direction = Directions.UNKNOWN;
    let isSafe = true;

    for (let i = 1; i < level.length; i++) {
      if (!differenceIsSafe(level[i], level[i - 1])) {
        isSafe = false;
      }
      if (level[i] > level[i - 1]) {
        if (direction === Directions.DECREASING) {
          isSafe = false;
        }
        direction = Directions.INCREASING;
      } else if (level[i] < level[i - 1]) {
        if (direction === Directions.INCREASING) {
          isSafe = false;
        }
        direction = Directions.DECREASING;
      }
    }
    if (isSafe) safeReports++;
  }
  return safeReports;
}

/**
 * Checks if the difference between two numbers is in the safe range (1-3).
 * Automatically determines which number is smaller/larger.
 * @param a First number
 * @param b Second number
 * @returns true if the difference is between 1 and 3, inclusive
 */
function differenceIsSafe(a: number, b: number): boolean {
  const small = Math.min(a, b);
  const large = Math.max(a, b);
  return large - small <= 3 && large - small >= 1;
}

enum Directions {
  UNKNOWN,
  INCREASING,
  DECREASING,
}
