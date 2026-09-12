"use client";
import { useAgentContext, useFrontendTool } from "@copilotkit/react-core/v2";
import { z } from "zod";
import { deal, workspaceContext } from "@/lib/incidents";
import type { WorkplaceControls } from "@/lib/use-workplace";

export function AppControl({ workplace }: { workplace: WorkplaceControls }) {
  const tasks = workplace.status?.status === "connected" ? workplace.status.tasks : [];
  const context = JSON.parse(JSON.stringify({ ...workspaceContext(tasks), workplace: workplace.status?.status ?? "unavailable", workplaceError: workplace.error, proposal: workplace.proposal ?? null, lastResult: workplace.notice }));
  useAgentContext({ description: "The current deal is ACME Corp's Enterprise Renewal. Use this context rather than asking the user to paste it. Facts and risks must be distinguished. Only propose_rescue_task prepares a server-held proposal; only the page's approval button may write. Email, calendar, and CRM capabilities are not available until discovered from the live Ambiguous workspace-never invent them.", value: context });
  useFrontendTool({ name: "propose_rescue_task", description: "Prepare the ACME security-review task for the explicit page approval gate. This does not save a record.", parameters: z.object({ title: z.string().min(1).max(200), details: z.string().min(1).max(4000) }), handler: async ({ title, details }) => { try { return { status: "pending_approval", proposal: await workplace.propose({ incidentId: deal.id, title, details }) }; } catch (error) { return { status: "error", message: error instanceof Error ? error.message : "Unable to prepare task." }; } } }, [workplace.propose]);
  useFrontendTool({ name: "refresh_rescue_results", description: "Read verified Deal Rescue workplace tasks from Ambiguous after approval or refresh.", parameters: z.object({}), handler: async () => workplace.refresh() }, [workplace.refresh]);
  return null;
}
