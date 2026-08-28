import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const workflow = readFileSync(".github/workflows/validate-and-merge.yml", "utf8");

test("validate-and-merge only runs on fork-based pull requests", () => {
  assert.match(workflow, /if:\s*github\.event\.pull_request\.head\.repo\.full_name != github\.repository/);
});
