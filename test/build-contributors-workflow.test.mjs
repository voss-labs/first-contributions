import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const workflow = readFileSync(".github/workflows/build-contributors.yml", "utf8");

test("build contributors workflow runs after validate-and-merge completes", () => {
  assert.match(
    workflow,
    /workflow_run:\s*\n\s*workflows:\s*\["Validate and merge"\]\s*\n\s*types:\s*\[completed\]/m,
  );
});

test("workflow_run execution is gated to successful validate-and-merge runs", () => {
  assert.match(
    workflow,
    /if:\s*github\.event_name != 'workflow_run' \|\| github\.event\.workflow_run\.conclusion == 'success'/,
  );
});
