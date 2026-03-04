import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true
    },
    content: {
      type: String,
      required: true,
      trim: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  },
  { _id: false }
);

const ThreadSchema = new mongoose.Schema(
  {
    threadId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    title: {
      type: String,
      default: "New Chat",
      trim: true
    },
    messages: {
      type: [MessageSchema],
      default: []
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Thread", ThreadSchema);