import dotenv from "dotenv";
import { connectDb } from "./db";
import { Activity } from "./models/Activity";
import { Lead } from "./models/Lead";

dotenv.config();

const daysFromNow = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

async function seed() {
  await connectDb();
  await Lead.deleteMany({});
  await Activity.deleteMany({});

  const created = await Lead.insertMany([
    {
      company: "Kaveri Fasteners Pvt Ltd",
      contact: "Anil Reddy",
      email: "anil@kaverifasteners.in",
      phone: "+91 98765 41042",
      city: "Hyderabad",
      segment: "Auto Components",
      product: "CNC turned shafts",
      stage: "Negotiation",
      value: 1850000,
      probability: 72,
      owner: "Meera",
      nextAction: "Revise annual rate contract with freight split",
      dueDate: daysFromNow(1),
      priority: "High",
      source: "IndiaMART"
    },
    {
      company: "Apex Pumps & Valves",
      contact: "Suresh Kumar",
      email: "suresh@apexpumps.co",
      phone: "+91 98222 11038",
      city: "Coimbatore",
      segment: "Industrial Pumps",
      product: "Cast iron impeller blanks",
      stage: "Proposal",
      value: 940000,
      probability: 54,
      owner: "Rahul",
      nextAction: "Send sample inspection report",
      dueDate: daysFromNow(2),
      priority: "Medium",
      source: "Trade Expo"
    },
    {
      company: "Sierra EV Systems",
      contact: "Nikhil Jain",
      email: "nikhil@sierraev.com",
      phone: "+91 90000 21016",
      city: "Bengaluru",
      segment: "Electric Mobility",
      product: "Battery tray assemblies",
      stage: "Won",
      value: 2250000,
      probability: 100,
      owner: "Rahul",
      nextAction: "Handover to production planning",
      dueDate: daysFromNow(5),
      priority: "High",
      source: "LinkedIn"
    }
  ]);

  await Activity.insertMany([
    {
      lead: created[0]._id,
      type: "Visit",
      note: "Client approved machining capability; waiting for revised logistics clause.",
      owner: "Meera",
      completedAt: new Date()
    },
    {
      lead: created[1]._id,
      type: "Quote",
      note: "Quotation sent with 30-day validity and sample dispatch condition.",
      owner: "Rahul",
      completedAt: daysFromNow(-1)
    }
  ]);

  console.log("Seeded ForgeFlow BDA CRM sample data");
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
