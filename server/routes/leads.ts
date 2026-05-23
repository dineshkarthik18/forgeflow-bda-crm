import { Router } from "express";
import { z } from "zod";
import { Activity } from "../models/Activity";
import { Lead } from "../models/Lead";

const router = Router();

const leadSchema = z.object({
  company: z.string().min(2),
  contact: z.string().min(2),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  city: z.string().min(2),
  segment: z.string().min(2),
  product: z.string().min(2),
  stage: z.enum(["New", "Qualified", "Proposal", "Negotiation", "Won", "Lost"]).default("New"),
  value: z.coerce.number().nonnegative(),
  probability: z.coerce.number().min(0).max(100),
  owner: z.string().min(2),
  nextAction: z.string().min(3),
  dueDate: z.coerce.date(),
  priority: z.enum(["High", "Medium", "Low"]).default("Medium"),
  source: z.string().min(2)
});

router.get("/", async (request, response) => {
  const { stage, owner, q } = request.query;
  const filter: Record<string, unknown> = {};

  if (stage && stage !== "All") filter.stage = stage;
  if (owner) filter.owner = owner;
  if (q) {
    filter.$or = [
      { company: new RegExp(String(q), "i") },
      { contact: new RegExp(String(q), "i") },
      { product: new RegExp(String(q), "i") },
      { segment: new RegExp(String(q), "i") }
    ];
  }

  const leads = await Lead.find(filter).sort({ updatedAt: -1 });
  response.json(leads);
});

router.post("/", async (request, response) => {
  const payload = leadSchema.parse(request.body);
  const lead = await Lead.create(payload);
  response.status(201).json(lead);
});

router.patch("/:id", async (request, response) => {
  const payload = leadSchema.partial().parse(request.body);
  const lead = await Lead.findByIdAndUpdate(request.params.id, payload, { new: true, runValidators: true });

  if (!lead) {
    response.status(404).json({ message: "Lead not found" });
    return;
  }

  response.json(lead);
});

router.post("/:id/activities", async (request, response) => {
  const activity = await Activity.create({ ...request.body, lead: request.params.id });
  response.status(201).json(activity);
});

export default router;
