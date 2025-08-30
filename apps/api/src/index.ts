import express from "express";
import cors from "cors";
import type { Player } from "@leaderboard/shared";

const app = express();
app.use(cors());
app.use(express.json());

let leaderboard: Player[] = [];

app.get("/leaderboard", (req, res) => {
  const sorted = [...leaderboard]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
  res.json(sorted);
});

app.post("/leaderboard", (req, res) => {
  const { name, score } = req.body as Player;
  leaderboard.push({ name, score });
  res.status(201).json({ message: "Player added" });
});

app.listen(4000, () => {
  console.log("API running on http://localhost:4000");
});
