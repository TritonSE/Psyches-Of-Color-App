import mongoose from "mongoose";

type LessonDoc = {
  title: string;
  description: string;
  order?: number; // Added for sorting logic
  activities: string[];
  unit?: string; // Made optional to match schema
} & mongoose.Document;

const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    // Added order field so lessons appear in correct sequence (1, 2, 3)
    order: {
      type: Number,
    },
    activities: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Activity",
      required: true,
      default: [], // Added default so you can create a lesson with empty activities if needed
    },
    unit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Unit",
      required: false, // CRITICAL FIX: Changed to false to allow circular creation in scripts
    },
  },
  {
    timestamps: true,
  },
);

const Lesson = mongoose.model<LessonDoc>("Lesson", lessonSchema);

export { Lesson };
