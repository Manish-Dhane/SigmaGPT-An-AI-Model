import express from "express";
import { v4 as uuidv4 } from "uuid";
import Thread from "../models/Thread.js";
import getAIResponse from "../utils/openai.js";

const router = express.Router();

/* ===============================
   Get All Threads
================================= */
router.get("/thread", async (req, res) => {
  try {
    const threads = await Thread.find({}).sort({ updatedAt: -1 });
    res.json(threads);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch threads" });
  }
});

/* ===============================
   Get Single Thread Messages
================================= */
router.get("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;

  try {
    const thread = await Thread.findOne({ threadId });

    if (!thread) {
      return res.status(404).json({ error: "Thread not found" });
    }

    res.json(thread.messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch chat" });
  }
});

/* ===============================
   Delete Thread
================================= */
router.delete("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;

  try {
    const deletedThread = await Thread.findOneAndDelete({ threadId });

    if (!deletedThread) {
      return res.status(404).json({ error: "Thread not found" });
    }

    res.status(200).json({ success: "Thread deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete thread" });
  }
});

/* ===============================
   Chat Route (UUID + Memory)
================================= */
router.post("/chat", async (req, res) => {
  let { threadId, message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {

    // If no threadId from frontend → generate one
    if (!threadId) {
      threadId = uuidv4();
    }

    // Try to find existing thread
    let thread = await Thread.findOne({ threadId });

    // If thread does not exist → create it
    if (!thread) {
      thread = new Thread({
        threadId,
        title: message,
        messages: []
      });
    }

    // Add user message
    thread.messages.push({
      role: "user",
      content: message
    });

    // Get AI response
    const assistantReply = await getAIResponse(thread.messages);

    if (!assistantReply) {
      return res.status(500).json({ error: "AI failed to respond" });
    }

    // Add assistant reply
    thread.messages.push({
      role: "assistant",
      content: assistantReply
    });

    // Save thread
    await thread.save();

    res.json({
      threadId,
      reply: assistantReply
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});
export default router;