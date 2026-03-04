import express from "express";
import { v4 as uuidv4 } from "uuid";
import Thread from "../models/Thread.js";
import getAIResponse from "../utils/openai.js";
import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();


/* ===============================
   Get All Threads (User Specific)
================================= */
router.get("/thread", authMiddleware, async (req, res) => {
  try {

    const threads = await Thread
      .find({ userId: req.user.id })   // 🔥 filter by user
      .sort({ updatedAt: -1 });

    res.json(threads);

  } catch (err) {

    console.error(err);
    res.status(500).json({ error: "Failed to fetch threads" });

  }
});


/* ===============================
   Get Single Thread Messages
================================= */
router.get("/thread/:threadId", authMiddleware, async (req, res) => {

  const { threadId } = req.params;

  try {

    const thread = await Thread.findOne({
      threadId,
      userId: req.user.id      // 🔥 secure query
    });

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
router.delete("/thread/:threadId", authMiddleware, async (req, res) => {

  const { threadId } = req.params;

  try {

    const deletedThread = await Thread.findOneAndDelete({
      threadId,
      userId: req.user.id     // 🔥 only delete user's thread
    });

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
router.post("/chat", authMiddleware, async (req, res) => {

  let { threadId, message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {

    // generate threadId if not provided
    if (!threadId) {
      threadId = uuidv4();
    }

    // find thread belonging to this user
    let thread = await Thread.findOne({
      threadId,
      userId: req.user.id
    });

    // create thread if it does not exist
    if (!thread) {

      thread = new Thread({
        userId: req.user.id,   // 🔥 attach thread to user
        threadId,
        title: message,
        messages: []
      });

    }

    // add user message
    thread.messages.push({
      role: "user",
      content: message
    });

    // get AI response
    const assistantReply = await getAIResponse(thread.messages);

    if (!assistantReply) {
      return res.status(500).json({ error: "AI failed to respond" });
    }

    // add assistant message
    thread.messages.push({
      role: "assistant",
      content: assistantReply
    });

    thread.updatedAt = new Date();

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