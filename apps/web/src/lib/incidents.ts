/** Deterministic page context; workplace records remain provider-owned. */
import type { WorkplaceTask } from "./followup-types";

export const deal = {
  id: "deal-acme-enterprise-renewal", company: "ACME Corp", name: "Enterprise Renewal",
  value: 240000, stage: "Stalled", daysInactive: 19, owner: "Maya Chen",
  champion: "John Carter", lastActivity: "11 days ago",
  blockers: [
    { id: "security", title: "Security review is incomplete", evidence: "The security questionnaire remains incomplete.", severity: "high", source: "Deal context" },
    { id: "owner", title: "Security task has no active owner", evidence: "No accountable owner is recorded for the required review.", severity: "high", source: "Deal context" },
    { id: "champion", title: "Customer champion has gone quiet", evidence: "John Carter has not replied to the last outreach in 11 days.", severity: "medium", source: "Deal context" },
    { id: "meeting", title: "No renewal meeting is scheduled", evidence: "The prior renewal meeting was cancelled and no replacement exists.", severity: "high", source: "Deal context" },
  ],
} as const;

export function workspaceContext(tasks: WorkplaceTask[]) {
  return { dataSource: "ACME facts are deterministic demo data. Workplace tasks are retrieved from Ambiguous; unavailable capabilities must not be implied.", selectedDeal: deal, verifiedWorkplaceTasks: tasks };
}
