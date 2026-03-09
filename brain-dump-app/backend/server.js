import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [
          { role: "system", content: "You are a helpful study assistant." },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();

    res.json(data);

  } catch (error) {
    res.status(500).json({ error: "Chatbot error" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});