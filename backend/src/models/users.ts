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
});

userSchema.statics.build = (attr: UserInterface) => {
  return new User(attr);
};

const User = mongoose.model<UserDoc, UserModelInterface>("User", userSchema);

export { User, userSchema };
