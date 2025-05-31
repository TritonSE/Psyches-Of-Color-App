import mongoose from "mongoose";

type LessonDoc = {
  title: string;
  description: string;
  activities: string[];
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
    activities: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Activity",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Lesson = mongoose.model<LessonDoc>("Lesson", lessonSchema);

export { Lesson };
