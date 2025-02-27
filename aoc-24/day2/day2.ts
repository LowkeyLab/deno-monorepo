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
export function isSafe(reports: Reports): boolean {
  for (const level of reports) {
    let direction = Directions.UNKNOWN;

    for (let i = 1; i < level.length; i++) {
      if (level[i] > level[i - 1]) {
        if (direction === Directions.DECREASING) {
          return false;
        }
        direction = Directions.INCREASING;
        if (!differenceIsSafe(level[i - 1], level[i])) {
          return false;
        }
      } else if (level[i] < level[i - 1]) {
        if (direction === Directions.INCREASING) {
          return false;
        }
        direction = Directions.DECREASING;
        if (!differenceIsSafe(level[i], level[i - 1])) {
          return false;
        }
      }
    }
  }
  return true;
}

function differenceIsSafe(small: number, large: number) {
  return large - small <= 3 && large - small >= 1;
}

enum Directions {
  UNKNOWN,
  INCREASING,
  DECREASING,
}
