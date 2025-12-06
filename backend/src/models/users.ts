import mongoose from "mongoose";

type OnboardingInfo = {
  ageRange: string;
  gender: string;
  ethnicity: string;
  educationLevel: string;
  counselingExperience: string;
  residence: string;
};

type CompletedLesson = {
  lessonId: mongoose.Schema.Types.ObjectId;
  completedAt: Date;
};

type UserInterface = {
  name: string;
  email: string;
  uid: string;
  character: string;
  completedLessons: CompletedLesson[];
  currLesson: string;
  lastCompletedWeeklyCheckIn?: Date | null;
  lastCompletedDailyCheckIn?: Date | null;
  onboardingInfo: OnboardingInfo;
  completedOnboarding: boolean;
  isAdmin: boolean;
};

type UserDoc = {
  name: string;
  email: string;
  uid: string;
  character: string;
  completedLessons: CompletedLesson[];
  currLesson: string;
  lastCompletedWeeklyCheckIn?: Date | null;
  lastCompletedDailyCheckIn?: Date | null;
  onboardingInfo: OnboardingInfo;
  completedOnboarding: boolean;
  isAdmin: boolean;
} & mongoose.Document;

type UserModelInterface = {
  // eslint-disable-next-line no-unused-vars
  build(attr: UserInterface): UserDoc;
} & mongoose.Model<UserDoc>;

const userSchema = new mongoose.Schema(
  {
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
      type: [
        new mongoose.Schema(
          {
            lessonId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Lesson",
              required: true,
            },
            completedAt: {
              type: Date,
              required: true,
              default: Date.now,
            },
          },
          { _id: false },
        ),
      ],
      default: [],
    },
    currLesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
    },
    onboardingInfo: {
      type: new mongoose.Schema(
        {
          ageRange: { type: String, required: true, default: "Prefer not to say" },
          gender: { type: String, required: true, default: "Prefer not to say" },
          ethnicity: { type: String, required: true, default: "Prefer not to say" },
          educationLevel: { type: String, required: true, default: "Prefer not to say" },
          counselingExperience: { type: String, required: true, default: "Prefer not to say" },
          residence: { type: String, required: true, default: "Prefer not to say" },
        },
        { _id: false },
      ),
      required: true,
      default: {
        ageRange: "Prefer not to say",
        gender: "Prefer not to say",
        ethnicity: "Prefer not to say",
        educationLevel: "Prefer not to say",
        counselingExperience: "Prefer not to say",
        residence: "Prefer not to say",
      },
    },
    completedOnboarding: {
      type: Boolean,
      required: true,
      default: false,
    },
    lastCompletedWeeklyCheckIn: {
      type: Date,
      default: null,
    },
    lastCompletedDailyCheckIn: {
      type: Date,
      default: null,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true },
);

userSchema.statics.build = (attr: UserInterface) => {
  return new User(attr);
};

const User = mongoose.model<UserDoc, UserModelInterface>("User", userSchema);

export { User, userSchema };
