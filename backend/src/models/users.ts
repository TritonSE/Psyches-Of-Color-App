import { ServerMonitoringMode } from "mongodb";
import mongoose from "mongoose";

type OnboardingInfo = {
  ageRange: string;
  gender: string;
  ethnicity: string;
  educationLevel: string;
  counselingExperience: string;
  residence: string;
};

type UserInterface = {
  name: string;
  email: string;
  uid: string;
  character: string;
  completedLessons: string[];
  currLesson: string;
  onboardingInfo: OnboardingInfo;
};

type UserDoc = {
  name: string;
  email: string;
  uid: string;
  character: string;
  completedLessons: string[];
  currLesson: string;
  onboardingInfo: OnboardingInfo;
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
    enum: ["Fire", "Water", "Nature"],
    default: "Fire",
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
  onboardingInfo: {
    ageRange: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      default: "Prefer not to say",
    },
    ethnicity: {
      type: String,
      required: true,
      default: "Prefer not to say",
    },
    educationLevel: {
      type: String,
      required: true,
    },
    counselingExperience: {
      type: String,
      required: true,
    },
    residence: {
      type: String,
      required: true,
    },
  },
});

userSchema.statics.build = (attr: UserInterface) => {
  return new User(attr);
};

const User = mongoose.model<UserDoc, UserModelInterface>("User", userSchema);

export { User, userSchema };
