import mongoose from "mongoose";

type SectionDoc = {
  title: string;
  activities: string[];
};

const sectionSchema = new mongoose.Schema(
  {
    title: {
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

const Section = mongoose.model<SectionDoc>("Section", sectionSchema);

export { Section };
