import { RequestHandler } from "express";

export const handleChat: RequestHandler = (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  // Dummy response logic
  const reply = `AI Tutor: You said '${message}'. I am a simple bot and can only repeat what you say.`;

  res.status(200).json({ reply });
};
