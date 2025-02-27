import { zip } from "@std/collections";
import { assertEquals } from "@std/assert";
type Input = {
  list1: bigint[];
  list2: bigint[];
};

type ReadOnlyInput = {
  readonly [K in keyof Input]: Input[K] extends bigint[]
    ? readonly Input[K][number][]
    : Input[K];
};

export async function readInput(file: string) {
  // If the path is not absolute, resolve it relative to the current module
  const filePath = file.startsWith("/")
    ? file
    : new URL(file, import.meta.url).pathname;

  const lines = await Deno.readTextFile(filePath);
  return lines
    .split("\n")
    .filter((line) => line.length > 0)
    .map((line) => line.split(" ").filter((string) => string.length > 0))
    .reduce(
      (acc, line) => {
        acc.list1.push(BigInt(line[0]));
        acc.list2.push(BigInt(line[1]));
        return acc;
      },
      { list1: [], list2: [] } as Input,
    ) as ReadOnlyInput;
}

export function getTotalDistance(input: ReadOnlyInput) {
  const [list1, list2] = [input.list1.toSorted(), input.list2.toSorted()];
  return zip(list1, list2)
    .map(([first, second]) => {
      if (first < second) {
        return second - first;
      } else {
        return first - second;
      }
    })
    .reduce((acc, distance) => acc + distance, 0n);
}

export function getSimilarityScore(input: ReadOnlyInput) {
  const occurences = new Map<bigint, bigint>();

  for (const value of input.list2) {
    occurences.set(value, (occurences.get(value) ?? 0n) + 1n);
  }

  return input.list1
    .map((value) => value * (occurences.get(value) ?? 0n))
    .reduce((acc, value) => acc + value, 0n);
}
