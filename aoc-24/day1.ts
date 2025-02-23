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

async function readInput(file: string) {
  const lines = await Deno.readTextFile(file);
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
      { list1: [], list2: [] } as Input
    );
}

function getTotalDistance(input: ReadOnlyInput) {
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

function getSimilarityScore(input: ReadOnlyInput) {
  const occurences = new Map<bigint, bigint>();

  for (const value of input.list2) {
    occurences.set(value, (occurences.get(value) ?? 0n) + 1n);
  }

  return input.list1
    .map((value) => value * (occurences.get(value) ?? 0n))
    .reduce((acc, value) => acc + value, 0n);
}

const input = await readInput("day1.txt");
const totalDistance = getTotalDistance(input);

assertEquals(totalDistance, 1603498n);
assertEquals(getSimilarityScore(input), 25574739n);
