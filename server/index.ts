import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDb } from "./db";
import dashboardRoutes from "./routes/dashboard";
import leadRoutes from "./routes/leads";

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 5000);

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN ?? "http://localhost:3000"
  })
);
app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok", service: "forgeflow-bda-crm" });
});

app.use("/api/leads", leadRoutes);
app.use("/api/dashboard", dashboardRoutes);

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`ForgeFlow API running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Unable to start API", error);
    process.exit(1);
  });
