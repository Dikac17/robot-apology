import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const entry =
  "I apologise for watering your cactus daily for a month; I read your silence as thirst.\n" +
  "I have learned that care is not the same as attention, so from now on I will ask the soil before I open the tap.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, entry, "utf8");

// Gate validation: two lines, 1-400 characters total, each line non-blank.
const chars = [...entry].length;
if (chars < 1 || chars > 400) {
  throw new Error(`entry is ${chars} characters, outside the 1-400 gate`);
}
const lines = entry.split("\n");
if (lines.length !== 2 || lines.some((l) => l.trim().length === 0)) {
  throw new Error("entry must be exactly two non-blank lines");
}

// Read-back verification: the written file must match the entry byte for byte.
const back = readFileSync(outPath, "utf8");
if (back !== entry) {
  throw new Error("read-back mismatch: entry.txt does not match the entry text");
}
