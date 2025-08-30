import { useEffect, useState } from "react";
import axios from "axios";
import type { Player } from "@leaderboard/shared";

function App() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [name, setName] = useState("");
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    const res = await axios.get<Player[]>("http://localhost:4000/leaderboard");
    setPlayers(res.data);
  };

  const addPlayer = async () => {
    await axios.post("http://localhost:4000/leaderboard", { name, score });
    setName("");
    setScore(0);
    fetchLeaderboard();
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Leaderboard</h1>
      <ul>
        {players.map((p, i) => (
          <li key={i}>
            {p.name} - {p.score}
          </li>
        ))}
      </ul>

      <h2>Add Player</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="number"
        value={score}
        onChange={(e) => setScore(Number(e.target.value))}
        placeholder="Score"
      />
      <button onClick={addPlayer}>Add</button>
    </div>
  );
}

export default App;
