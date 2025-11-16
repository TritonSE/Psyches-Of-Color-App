import mongoose from "mongoose";

type ActivityType = "reflection" | "mcq" | "wwyd" | "text";

type OptionDoc = {
  content: string;
  affirmation: string;
};

type ActivityDoc = {
  type: ActivityType;
  question: string;
  options?: OptionDoc[];
  affirmation?: string;
  lesson: string[];
} & mongoose.Document;

const activitySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["reflection", "mcq", "wwyd"],
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
            required: true,
          },
        },
      ],
      // eslint-disable-next-line no-unused-vars
      required: function (this: ActivityDoc) {
        return this.type === "mcq" || this.type === "wwyd";
      },
      // eslint-disable-next-line no-unused-vars
      default: function (this: ActivityDoc) {
        return this.type === "reflection" ? undefined : [];
      },
    },
    // Only exists for prompt questions
    affirmation: {
      type: String,
      // eslint-disable-next-line no-unused-vars
      required: function (this: ActivityDoc) {
        return this.type === "reflection";
      },
    },
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Activity = mongoose.model<ActivityDoc>("Activity", activitySchema);

export { Activity };
