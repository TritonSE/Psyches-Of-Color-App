import mongoose from "mongoose";

type ActivityType = "reflection" | "mcq" | "wwyd";

type OptionDoc = {
  content: string;
  affirmation: string;
};

type ActivityDoc = {
  type: ActivityType;
  content: string;
  options?: OptionDoc[];
  affirmation?: string;
} & mongoose.Document;

const activitySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["reflction", "mcq", "wwyd"],
      required: true,
    },
    content: {
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
    },
    // Only exists for prompt questions
    affirmation: {
      type: String,
      // eslint-disable-next-line no-unused-vars
      required: function (this: ActivityDoc) {
        return this.type === "reflection";
      },
    },
  },
  {
    timestamps: true,
  },
);

const Activity = mongoose.model<ActivityDoc>("Activity", activitySchema);

export { Activity };
