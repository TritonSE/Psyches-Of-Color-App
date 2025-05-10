import mongoose from "mongoose";

type MoodInterface = {
  moodreported: string;
  // note: we don't ask user to input creation time
  uid: string;
};

type MoodDoc = {
  moodreported: string;
  createdAt: Date;
  year: number;
  month: number;
  day: number;
  uid: string;
} & mongoose.Document;

type MoodModelInterface = {
  build(attr: MoodInterface): MoodDoc;
} & mongoose.Model<MoodDoc>;

const moodSchema = new mongoose.Schema({
  moodreported: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  day: {
    type: Number,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
});

moodSchema.statics.build = (attr: MoodInterface) => {
  const date = new Date();
  return new Mood({
    ...attr,
    createdAt: date,
    year: date.getFullYear(),
    month: date.getMonth() + 1, // it's 0 indexed
    day: date.getDate(),
  });
};

const Mood = mongoose.model<MoodDoc, MoodModelInterface>("Mood", moodSchema);

export { Mood, moodSchema };
