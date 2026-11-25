// Ship It Friday entry for make.fun.
// Writes one git commit message (at most 159 characters) to /output/entry.txt.
// Node 22, no dependencies.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "feat: rewrote the payment service from memory at 4:58 PM Friday — it compiled first try, tests felt optional, deploying now, what could possibly go wrong?";

// The gate only accepts UTF-8 text of 1 to 159 characters, not only
// whitespace, and a single line: a newline inside the line would count
// against the limit and break the "one line" shape. Fail loudly instead
// of writing an entry that cannot win.
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("Line must be a single line with no newline characters.");
}
if (LINE.trim().length === 0 || LINE.length > 159) {
  throw new Error(`Line must be 1-159 characters, got ${LINE.length}.`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read back and confirm the file holds exactly the line, so a partial
// or failed write cannot pass silently.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("Wrote /output/entry.txt but its content differs.");
}
console.log(`Wrote ${LINE.length}-character commit message to /output/entry.txt`);
