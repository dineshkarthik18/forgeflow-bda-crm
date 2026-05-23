"use client";

import {
  ArrowUpRight,
  CalendarClock,
  CircleDollarSign,
  ClipboardList,
  Factory,
  Filter,
  Mail,
  MapPin,
  PhoneCall,
  Search,
  Target,
  TrendingUp,
  UserRoundCheck
} from "lucide-react";
import { useMemo, useState } from "react";
import { activities, formatCurrency, LeadStage, leads, stages, team } from "@/lib/bda-data";
import { Pill } from "@/components/ui";

const stageColors: Record<LeadStage, string> = {
  New: "bg-white",
  Qualified: "bg-sagewash",
  Proposal: "bg-bluewash",
  Negotiation: "bg-amber/15",
  Won: "bg-moss/14"
};

export function BdaDashboard() {
  const [query, setQuery] = useState("");
  const [stage, setStage] = useState<LeadStage | "All">("All");
  const [selectedLeadId, setSelectedLeadId] = useState(leads[0].id);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesStage = stage === "All" || lead.stage === stage;
      const haystack = `${lead.company} ${lead.contact} ${lead.city} ${lead.segment} ${lead.product}`.toLowerCase();
      return matchesStage && haystack.includes(query.toLowerCase());
    });
  }, [query, stage]);

  const selectedLead = leads.find((lead) => lead.id === selectedLeadId) ?? leads[0];
  const weightedPipeline = leads.reduce((sum, lead) => sum + (lead.value * lead.probability) / 100, 0);
  const openPipeline = leads.filter((lead) => lead.stage !== "Won").reduce((sum, lead) => sum + lead.value, 0);
  const urgentTasks = leads.filter((lead) => lead.dueInDays <= 1 && lead.stage !== "Won").length;
  const winRate = Math.round((leads.filter((lead) => lead.stage === "Won").length / leads.length) * 100);

  return (
    <main className="min-h-screen">
      <section className="border-b border-line bg-[linear-gradient(120deg,#f6f3ee_0%,#e8efe1_48%,#dfeff1_100%)]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="flex flex-col justify-center">
            <div className="mb-4 flex flex-wrap items-center gap-2 text-sm font-semibold text-steel">
              <span className="inline-flex items-center gap-2 rounded bg-white/75 px-3 py-1 ring-1 ring-line">
                <Factory size={16} />
                Manufacturing BDA Command Center
              </span>
              <span className="rounded bg-white/75 px-3 py-1 ring-1 ring-line">MERN assessment project</span>
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              Lead pipeline, quotation follow-ups, and BDA performance in one operating dashboard.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-ink/72">
              ForgeFlow helps a manufacturing sales team qualify industrial enquiries, track quote movement,
              schedule client communication, and hand won orders to production with clean accountability.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard icon={CircleDollarSign} label="Open pipeline" value={formatCurrency(openPipeline)} caption="Active deal value" />
            <MetricCard icon={TrendingUp} label="Weighted forecast" value={formatCurrency(weightedPipeline)} caption="Probability adjusted" />
            <MetricCard icon={CalendarClock} label="Due follow-ups" value={`${urgentTasks}`} caption="Need action today" />
            <MetricCard icon={Target} label="Win rate" value={`${winRate}%`} caption="Current sample cycle" />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-6 sm:px-6 lg:grid-cols-[260px_1fr_340px] lg:px-8">
        <aside className="space-y-5">
          <div className="rounded border border-line bg-white p-4 shadow-soft">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink">
              <Filter size={17} />
              Filters
            </div>
            <label className="relative block">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/45" size={17} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search leads"
                className="focus-ring h-11 w-full rounded border border-line bg-paper pl-10 pr-3 text-sm outline-none"
              />
            </label>
            <div className="mt-4 grid gap-2">
              {(["All", ...stages] as const).map((item) => (
                <button
                  key={item}
                  onClick={() => setStage(item)}
                  className={`focus-ring flex h-10 items-center justify-between rounded px-3 text-sm font-medium transition ${
                    stage === item ? "bg-steel text-white" : "bg-paper text-ink/74 hover:bg-bluewash"
                  }`}
                >
                  <span>{item}</span>
                  <span>{item === "All" ? leads.length : leads.filter((lead) => lead.stage === item).length}</span>
                </button>
              ))}
            </div>
          </div>

          <div id="team" className="rounded border border-line bg-white p-4 shadow-soft">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink">
              <UserRoundCheck size={17} />
              Team Performance
            </div>
            <div className="space-y-4">
              {team.map((member) => {
                const progress = Math.round((member.bookedValue / member.monthlyTarget) * 100);
                return (
                  <div key={member.id}>
                    <div className="flex items-start justify-between gap-3 text-sm">
                      <div>
                        <p className="font-semibold text-ink">{member.name}</p>
                        <p className="text-xs text-ink/58">{member.territory}</p>
                      </div>
                      <span className="font-semibold text-steel">{progress}%</span>
                    </div>
                    <div className="mt-2 h-2 rounded bg-paper">
                      <div className="h-2 rounded bg-moss" style={{ width: `${Math.min(progress, 100)}%` }} />
                    </div>
                    <div className="mt-2 flex justify-between text-xs text-ink/58">
                      <span>{member.activeLeads} leads</span>
                      <span>{member.conversion}% conversion</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        <section id="pipeline" className="min-w-0">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-ink">Lead Pipeline</h2>
              <p className="text-sm text-ink/60">Kanban-style sales movement for manufacturing enquiries</p>
            </div>
            <button className="focus-ring inline-flex h-10 items-center gap-2 rounded bg-steel px-3 text-sm font-semibold text-white">
              <ClipboardList size={17} />
              New lead
            </button>
          </div>

          <div className="grid gap-4 xl:grid-cols-5">
            {stages.map((currentStage) => {
              const stageLeads = filteredLeads.filter((lead) => lead.stage === currentStage);
              return (
                <div key={currentStage} className="rounded border border-line bg-white/70 p-3">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-ink">{currentStage}</h3>
                    <span className="rounded bg-white px-2 py-1 text-xs font-semibold text-ink/62 ring-1 ring-line">{stageLeads.length}</span>
                  </div>
                  <div className="space-y-3">
                    {stageLeads.map((lead) => (
                      <button
                        key={lead.id}
                        onClick={() => setSelectedLeadId(lead.id)}
                        className={`focus-ring w-full rounded border p-3 text-left transition hover:-translate-y-0.5 hover:shadow-soft ${
                          selectedLead.id === lead.id ? "border-steel bg-bluewash/65" : "border-line bg-white"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-semibold leading-5 text-ink">{lead.company}</p>
                          <PriorityBadge priority={lead.priority} />
                        </div>
                        <p className="mt-1 text-xs text-ink/58">{lead.product}</p>
                        <div className="mt-3 flex items-center justify-between text-xs">
                          <span className="font-semibold text-steel">{formatCurrency(lead.value)}</span>
                          <span className="text-ink/55">{lead.probability}%</span>
                        </div>
                      </button>
                    ))}
                    {stageLeads.length === 0 && <div className="rounded border border-dashed border-line bg-white p-4 text-sm text-ink/50">No leads</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <aside className="space-y-5">
          <div className="rounded border border-line bg-white p-5 shadow-soft">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-steel">{selectedLead.id}</p>
                <h2 className="mt-1 text-xl font-semibold text-ink">{selectedLead.company}</h2>
                <p className="text-sm text-ink/58">{selectedLead.contact}</p>
              </div>
              <Pill tone={selectedLead.stage === "Won" ? "good" : selectedLead.priority === "High" ? "warn" : "neutral"}>{selectedLead.stage}</Pill>
            </div>

            <div className={`rounded p-4 ${stageColors[selectedLead.stage]}`}>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/55">Next action</p>
              <p className="mt-1 text-sm font-semibold leading-6 text-ink">{selectedLead.nextAction}</p>
              <div className="mt-3 flex items-center gap-2 text-sm text-ink/64">
                <CalendarClock size={16} />
                {selectedLead.dueInDays === 0 ? "Due today" : `Due in ${selectedLead.dueInDays} days`}
              </div>
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <Info label="Deal value" value={formatCurrency(selectedLead.value)} />
              <Info label="Probability" value={`${selectedLead.probability}%`} />
              <Info label="Owner" value={selectedLead.owner} />
              <Info label="Source" value={selectedLead.source} />
            </dl>

            <div className="mt-5 grid grid-cols-3 gap-2">
              <ActionButton icon={PhoneCall} label="Call" />
              <ActionButton icon={Mail} label="Email" />
              <ActionButton icon={MapPin} label="Visit" />
            </div>
          </div>

          <div className="rounded border border-line bg-white p-5 shadow-soft">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-ink">Recent Communication</h2>
              <ArrowUpRight size={17} className="text-ink/45" />
            </div>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="border-l-2 border-steel/40 pl-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-ink">{activity.type}</p>
                    <span className="text-xs text-ink/50">{activity.date}</span>
                  </div>
                  <p className="mt-1 text-sm leading-6 text-ink/66">{activity.note}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}

function MetricCard({ icon: Icon, label, value, caption }: { icon: typeof Target; label: string; value: string; caption: string }) {
  return (
    <div className="rounded border border-white/75 bg-white/78 p-4 shadow-soft backdrop-blur">
      <div className="mb-5 flex h-10 w-10 items-center justify-center rounded bg-steel text-white">
        <Icon size={19} />
      </div>
      <p className="text-sm font-medium text-ink/62">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-ink">{value}</p>
      <p className="mt-1 text-xs text-ink/50">{caption}</p>
    </div>
  );
}

function PriorityBadge({ priority }: { priority: "High" | "Medium" | "Low" }) {
  const className =
    priority === "High" ? "bg-coral/12 text-coral" : priority === "Medium" ? "bg-amber/15 text-amber" : "bg-sagewash text-moss";
  return <span className={`rounded px-2 py-1 text-xs font-semibold ${className}`}>{priority}</span>;
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-line bg-paper p-3">
      <dt className="text-xs text-ink/50">{label}</dt>
      <dd className="mt-1 font-semibold text-ink">{value}</dd>
    </div>
  );
}

function ActionButton({ icon: Icon, label }: { icon: typeof PhoneCall; label: string }) {
  return (
    <button className="focus-ring flex h-10 items-center justify-center gap-2 rounded bg-paper text-sm font-semibold text-ink transition hover:bg-bluewash">
      <Icon size={16} />
      {label}
    </button>
  );
}
