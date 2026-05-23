import { Router } from "express";
import { Lead } from "../models/Lead";

const router = Router();

router.get("/summary", async (_request, response) => {
  const leads = await Lead.find();
  const openLeads = leads.filter((lead) => lead.stage !== "Won" && lead.stage !== "Lost");
  const openPipeline = openLeads.reduce((sum, lead) => sum + lead.value, 0);
  const weightedForecast = openLeads.reduce((sum, lead) => sum + (lead.value * lead.probability) / 100, 0);
  const dueToday = openLeads.filter((lead) => {
    const due = new Date(lead.dueDate);
    const today = new Date();
    return due.toDateString() === today.toDateString() || due < today;
  }).length;
  const won = leads.filter((lead) => lead.stage === "Won").length;

  response.json({
    totalLeads: leads.length,
    openPipeline,
    weightedForecast,
    dueToday,
    winRate: leads.length ? Math.round((won / leads.length) * 100) : 0
  });
});

export default router;
