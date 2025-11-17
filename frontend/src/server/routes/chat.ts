import { RequestHandler } from "express";
import axios from "axios";

export const handleChat: RequestHandler = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const response = await axios.post("http://ai:8000/llm/chat", {
      text: message,
    });

    res.status(200).json({ reply: response.data.response });
  } catch (error) {
    console.error("Error calling AI service:", error);
    res.status(500).json({ error: "Failed to get response from AI service" });
  }
};
