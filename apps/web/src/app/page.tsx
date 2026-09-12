"use client";
import { CopilotChat, useConfigureSuggestions } from "@copilotkit/react-core/v2";
import { GenerativeUI } from "@/components/generative-ui";
import { AppControl } from "@/components/app-control";
import { deal } from "@/lib/incidents";
import { useWorkplace } from "@/lib/use-workplace";
import { WorkplaceFollowups } from "@/components/workplace-followups";

export default function Home() {
  const workplace = useWorkplace(deal.id);
  useConfigureSuggestions({ suggestions: [{ title: "Rescue this deal", message: "Rescue this deal. Use the selected deal context, identify concrete blockers with evidence, then propose the rescue plan. Do not claim email, calendar, or CRM writes unless their live Ambiguous capabilities are available. Prepare the security task for the page approval gate." }], available: "before-first-message" }, []);
  return <><GenerativeUI /><AppControl workplace={workplace} /><main className="ck-workspace"><header className="ck-workspace-header"><div><p className="ck-eyebrow">DEAL RESCUE COWORKER · ACME WORKSPACE</p><h1>{deal.name}</h1><p className="ck-intro">A $240,000 renewal needs coordinated intervention.</p></div><span className="ck-tag">HIGH RISK</span></header><div className="ck-workspace-grid"><section className="ck-panel"><p className="ck-eyebrow">{deal.company}</p><span className="ck-status-label">{deal.stage}</span><h2>{deal.name}</h2><h1>${deal.value.toLocaleString()}</h1><dl className="ck-detail-facts"><div><dt>Days inactive</dt><dd>{deal.daysInactive}</dd></div><div><dt>Account owner</dt><dd>{deal.owner}</dd></div><div><dt>Champion</dt><dd>{deal.champion}</dd></div><div><dt>Last response</dt><dd>{deal.lastActivity}</dd></div></dl><section><h2>Current blockers</h2>{deal.blockers.map((b) => <article className="ck-card" key={b.id}><span className="ck-status-label">{b.severity}</span><h3>{b.title}</h3><p>{b.evidence}</p><small>{b.source}</small></article>)}</section><WorkplaceFollowups incidentId={deal.id} workplace={workplace} /></section><section className="ck-panel ck-assistant"><header className="ck-assistant-header"><h2>AI coworker</h2><p>Understands this deal and waits for approval before a workplace write.</p></header><CopilotChat className="ck-chat" labels={{ welcomeMessageText: "This renewal is stalled. Ask me to rescue it.", chatInputPlaceholder: "Rescue this deal." }} /></section></div></main></>;
}
