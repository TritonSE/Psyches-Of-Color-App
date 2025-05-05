import mongoose from "mongoose";

type ActivityDoc = {
  title: string;
  description: string;
  questions: string[];
} & mongoose.Document;

const activitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    questions: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Question",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Activity = mongoose.model<ActivityDoc>("Activity", activitySchema);

export { Activity };
