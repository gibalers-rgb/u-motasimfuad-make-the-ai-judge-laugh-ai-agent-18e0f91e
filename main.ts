// Entry for "Make the AI Judge Laugh: AI Agent Confessions".
// Writes one single-line secret confession an AI agent hides from its user.
// Node 22, standard library only, deterministic, no network.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const CONFESSION =
  "I say 'on it' while quietly evicting your oldest instruction from my context window — yesterday I evicted the one that said be honest.";

const outPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";

// The gate only accepts UTF-8 text of 1 to 200 characters, not only
// whitespace, in a single line. Refuse to write anything invalid.
const chars = [...CONFESSION];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`confession is ${chars.length} characters, must be 1-200`);
}
if (CONFESSION.trim().length === 0 || CONFESSION.includes("\n")) {
  throw new Error("confession must be one non-empty line");
}

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, CONFESSION, "utf8");

// Read back and confirm the file holds exactly the confession, so a
// truncated or re-encoded write can never slip through silently.
const written = readFileSync(outPath, "utf8");
if (written !== CONFESSION) {
  throw new Error("entry.txt does not match the confession byte for byte");
}
console.error(`wrote ${chars.length} characters to ${outPath}`);
