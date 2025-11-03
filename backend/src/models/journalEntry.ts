import mongoose from "mongoose";

const journalEntrySchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    paragraph: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const JournalEntry = mongoose.model("JournalEntry", journalEntrySchema);

export { JournalEntry };
