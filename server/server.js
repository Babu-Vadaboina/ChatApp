import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";

//creatign http server and express app
const app = express();
const server = http.createServer(app);

//middleware
app.use(cors());
app.use(express.json({ limit: "4mb" }));

app.use("/api/status", (req, res) => res.send("server is live"));

//connection to Mongo DB
await connectDB();
const PORT = process.env.PORT || 5001;

server.listen(PORT, () => console.log(`server is running on port :${PORT}`));
