import assert from "node:assert/strict";
import test from "node:test";
import { deal, workspaceContext } from "./incidents";
import type { WorkplaceTask } from "./followup-types";

test("the selected deal is the deterministic ACME rescue scenario", () => {
  assert.equal(deal.company, "ACME Corp");
  assert.equal(deal.name, "Enterprise Renewal");
  assert.equal(deal.value, 240000);
  assert.equal(deal.stage, "Stalled");
  assert.equal(deal.blockers.length, 4);
});

test("workspace context distinguishes deterministic deal facts from provider records", () => {
  const tasks: WorkplaceTask[] = [{ id: "11111111-1111-4111-8111-111111111111", title: "Assign security review", description: "Deal Rescue task", url: null }];
  const context = workspaceContext(tasks);
  assert.match(context.dataSource, /deterministic/);
  assert.match(context.dataSource, /Ambiguous/);
  assert.equal(context.selectedDeal.id, deal.id);
  assert.deepEqual(context.verifiedWorkplaceTasks, tasks);
});
