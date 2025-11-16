import mongoose from "mongoose";

type UserInterface = {
  name: string;
  email: string;
  uid: string;
  character: string;
  completedLessons: string[];
  currLesson: string;
  age: number;
  gender: string;
  residence: string;
  lastCompletedWeeklyCheckIn?: Date | null;
  lastCompletedDailyCheckIn?: Date | null;
};

type UserDoc = {
  name: string;
  email: string;
  uid: string;
  character: string;
  completedLessons: string[];
  currLesson: string;
  age: number;
  gender: string;
  residence: string;
  lastCompletedWeeklyCheckIn?: Date | null;
  lastCompletedDailyCheckIn?: Date | null;
} & mongoose.Document;

type UserModelInterface = {
  // eslint-disable-next-line no-unused-vars
  build(attr: UserInterface): UserDoc;
} & mongoose.Model<UserDoc>;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
  character: {
    type: String,
    enum: ["fire", "water", "earth"],
    default: "fire",
  },
  completedLessons: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Lesson",
    default: [],
  },
  currLesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lesson",
  },
  age: {
    type: Number,
    default: 0,
    required: true,
  },
  gender: {
    type: String,
    default: "Not specified",
    required: true,
  },
  residence: {
    type: String,
    default: "Not specified",
    required: true,
  },
  lastCompletedWeeklyCheckIn: {
    type: Date,
    default: null,
  },
  lastCompletedDailyCheckIn: {
    type: Date,
    default: null,
  },
});

userSchema.statics.build = (attr: UserInterface) => {
  return new User(attr);
};

const User = mongoose.model<UserDoc, UserModelInterface>("User", userSchema);

export { User, userSchema };
