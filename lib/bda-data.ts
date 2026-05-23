export type LeadStage = "New" | "Qualified" | "Proposal" | "Negotiation" | "Won";

export type Lead = {
  id: string;
  company: string;
  contact: string;
  city: string;
  segment: string;
  product: string;
  stage: LeadStage;
  value: number;
  probability: number;
  owner: string;
  nextAction: string;
  dueInDays: number;
  lastTouch: string;
  priority: "High" | "Medium" | "Low";
  source: string;
};

export type Activity = {
  id: string;
  leadId: string;
  type: "Call" | "Email" | "Visit" | "Quote" | "Follow-up";
  note: string;
  owner: string;
  date: string;
};

export type TeamMember = {
  id: string;
  name: string;
  territory: string;
  activeLeads: number;
  monthlyTarget: number;
  bookedValue: number;
  conversion: number;
};

export const stages: LeadStage[] = ["New", "Qualified", "Proposal", "Negotiation", "Won"];

export const leads: Lead[] = [
  {
    id: "LD-1042",
    company: "Kaveri Fasteners Pvt Ltd",
    contact: "Anil Reddy",
    city: "Hyderabad",
    segment: "Auto Components",
    product: "CNC turned shafts",
    stage: "Negotiation",
    value: 1850000,
    probability: 72,
    owner: "Meera",
    nextAction: "Revise annual rate contract with freight split",
    dueInDays: 1,
    lastTouch: "Factory visit completed",
    priority: "High",
    source: "IndiaMART"
  },
  {
    id: "LD-1038",
    company: "Apex Pumps & Valves",
    contact: "Suresh Kumar",
    city: "Coimbatore",
    segment: "Industrial Pumps",
    product: "Cast iron impeller blanks",
    stage: "Proposal",
    value: 940000,
    probability: 54,
    owner: "Rahul",
    nextAction: "Send sample inspection report",
    dueInDays: 2,
    lastTouch: "Quotation shared",
    priority: "Medium",
    source: "Trade Expo"
  },
  {
    id: "LD-1033",
    company: "Northline Packaging",
    contact: "Priya Shah",
    city: "Pune",
    segment: "Packaging Machinery",
    product: "Sheet metal enclosures",
    stage: "Qualified",
    value: 620000,
    probability: 38,
    owner: "Ayaan",
    nextAction: "Schedule design review call",
    dueInDays: 3,
    lastTouch: "Requirement sheet received",
    priority: "Medium",
    source: "Website"
  },
  {
    id: "LD-1029",
    company: "Eastern Agro Tech",
    contact: "Manoj Das",
    city: "Kolkata",
    segment: "Agri Equipment",
    product: "Laser cut brackets",
    stage: "New",
    value: 410000,
    probability: 22,
    owner: "Meera",
    nextAction: "Qualify order frequency and drawings",
    dueInDays: 0,
    lastTouch: "Inbound enquiry",
    priority: "High",
    source: "Referral"
  },
  {
    id: "LD-1016",
    company: "Sierra EV Systems",
    contact: "Nikhil Jain",
    city: "Bengaluru",
    segment: "Electric Mobility",
    product: "Battery tray assemblies",
    stage: "Won",
    value: 2250000,
    probability: 100,
    owner: "Rahul",
    nextAction: "Handover to production planning",
    dueInDays: 5,
    lastTouch: "PO received",
    priority: "High",
    source: "LinkedIn"
  },
  {
    id: "LD-1007",
    company: "West Coast Fabricators",
    contact: "Farhan Ali",
    city: "Ahmedabad",
    segment: "Heavy Fabrication",
    product: "Welded machine frames",
    stage: "Proposal",
    value: 1320000,
    probability: 48,
    owner: "Ayaan",
    nextAction: "Confirm payment milestone terms",
    dueInDays: 4,
    lastTouch: "Costing review done",
    priority: "Low",
    source: "Cold Outreach"
  }
];

export const activities: Activity[] = [
  {
    id: "AC-221",
    leadId: "LD-1042",
    type: "Visit",
    note: "Client approved machining capability; waiting for revised logistics clause.",
    owner: "Meera",
    date: "Today"
  },
  {
    id: "AC-219",
    leadId: "LD-1038",
    type: "Quote",
    note: "Quotation sent with 30-day validity and sample dispatch condition.",
    owner: "Rahul",
    date: "Yesterday"
  },
  {
    id: "AC-216",
    leadId: "LD-1033",
    type: "Call",
    note: "Engineering team asked for tolerance clarification on enclosure bends.",
    owner: "Ayaan",
    date: "2 days ago"
  },
  {
    id: "AC-212",
    leadId: "LD-1016",
    type: "Follow-up",
    note: "Purchase order received; production handoff created for pilot batch.",
    owner: "Rahul",
    date: "3 days ago"
  }
];

export const team: TeamMember[] = [
  { id: "TM-1", name: "Meera Iyer", territory: "South + East", activeLeads: 14, monthlyTarget: 4500000, bookedValue: 3180000, conversion: 31 },
  { id: "TM-2", name: "Rahul Verma", territory: "West", activeLeads: 11, monthlyTarget: 5200000, bookedValue: 3860000, conversion: 36 },
  { id: "TM-3", name: "Ayaan Khan", territory: "North", activeLeads: 9, monthlyTarget: 3800000, bookedValue: 1740000, conversion: 24 }
];

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);
}
