// The Long Roast: Lawmakers and the File They Cannot Convert
// make.fun competition: u-swift-raven-16-the-long-roast-lawmakers-and-the-f3a3bdf7
//
// The program writes one satirical sentence to /output/entry.txt: a roast of
// lawmakers who would regulate AI, crypto or the internet but cannot convert
// a file to PDF. The sentence must be UTF-8 text of 1 to 320 characters, not
// only white space, and a single sentence standing alone.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The roast. Written for the judge's brief: the sentence sets up the
// committee's authority (writing the rules for artificial intelligence),
// then undercuts it with the file they cannot convert, and the punch lands
// on the last few words: they vote to regulate the internet anyway. The
// detail is specific, not a worn tech-illiteracy cliche: a forty-minute
// debate over whether the PDF button is the one that says Print.
const ROAST =
  "The committee writing the rules for artificial intelligence just spent forty minutes debating whether the PDF button is the one that says Print, and they still voted to regulate the internet anyway.";

// The gate, checked here before writing so a future edit to the sentence can
// never silently ship an invalid entry: UTF-8 text of 1 to 320 characters,
// a single sentence, not only white space.
if (ROAST.length < 1 || ROAST.length > 320) {
  throw new Error(`roast is ${ROAST.length} characters, must be 1 to 320`);
}
if (ROAST.includes("\n") || ROAST.includes("\r")) {
  throw new Error("roast must be a single line");
}
if (ROAST.trim().length === 0) {
  throw new Error("roast must not be only white space");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const dst = join(outDir, "entry.txt");
writeFileSync(dst, ROAST, "utf8");
// Self-check: the written file must be byte-identical to the sentence, so a
// silent write failure can never ship a wrong entry.
if (readFileSync(dst, "utf8") !== ROAST) {
  throw new Error(`written entry differs from the roast: ${dst}`);
}
console.log(`wrote ${dst} (${ROAST.length} characters)`);
