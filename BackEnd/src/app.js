// src/app.js
import express from "express";
import aiRoutes from "./routes/ai.routes.js";
import cors from "cors";


const app = express();

app.use(cors())

app.use(express.json())

app.use(express.json()); 
app.use("/ai", aiRoutes);


app.get("/", (req, res) => {
  res.send("Hello");
});

export default app;
