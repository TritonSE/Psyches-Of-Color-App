import mongoose from "mongoose";

type MoodInterface = {
  moodreported: string;
  // note: we don't ask user to input creation time
  uid: string;
  createdAt?: Date; // Optional date parameter for testing
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
  // eslint-disable-next-line no-unused-vars
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
    unique: true, // Ensure only one mood per timestamp
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

// Create a compound index on uid and day to ensure one mood per user per day
moodSchema.index({ uid: 1, year: 1, month: 1, day: 1 }, { unique: true });

moodSchema.statics.build = (attr: MoodInterface) => {
  const date = attr.createdAt || new Date();
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
