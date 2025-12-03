import mongoose from "mongoose";

type ActivityType = "reflection" | "mcq" | "wwyd" | "text" | "video"; // Added 'video' to match seed possibilities

type OptionDoc = {
  content: string;
  affirmation?: string; // Made optional
  isCorrect?: boolean; // Added this field for MCQs
};

type ActivityDoc = {
  type: ActivityType;
  question: string;
  options?: OptionDoc[];
  affirmation?: string;
  lesson?: string; // Made optional so we can create activity before lesson
} & mongoose.Document;

const activitySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["reflection", "mcq", "wwyd", "text", "video"],
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    // Only exists for mcq and wwyd questions
    options: {
      type: [
        {
          content: {
            type: String,
            required: true,
          },
          affirmation: {
            type: String,
            required: false, // Changed to false to fix validation error
          },
          isCorrect: {
            type: Boolean,
            default: false, // Added default false
          },
        },
      ],
      // Validates that options exist if type is mcq/wwyd
      validate: {
        validator: function (this: ActivityDoc) {
          if (this.type === "mcq" || this.type === "wwyd") {
            return this.options && this.options.length > 0;
          }
          return true;
        },
        message: "Options are required for MCQ or WWYD activities.",
      },
      default: undefined,
    },
    // Only exists for reflection questions
    affirmation: {
      type: String,
      required: function (this: ActivityDoc) {
        return this.type === "reflection";
      },
    },
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
      required: false, // Changed to false to allow circular creation in seed script
    },
  },
  {
    timestamps: true,
  },
);

const Activity = mongoose.model<ActivityDoc>("Activity", activitySchema);

export { Activity };
