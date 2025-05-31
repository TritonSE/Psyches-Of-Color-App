import mongoose from "mongoose";

type UnitDoc = {
  title: string;
  lessons: string[];
};

const unitSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    lessons: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Lesson",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Unit = mongoose.model<UnitDoc>("Unit", unitSchema);

export { Unit };
