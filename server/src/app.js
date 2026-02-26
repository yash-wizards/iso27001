import express from "express";
import fileRouter from "./routes/file.routes.js";
import cors from "cors";
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      process.env.FRONTEND_URL,
    ],
    credentials: true,
  }),
);

app.get("/", (_, res) => {
  res.send("working fine");
});

app.use("/api/file", fileRouter);

export default app;
