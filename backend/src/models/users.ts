import mongoose from "mongoose";

type UserInterface = {
  name: string;
  email: string;
  uid: string;
  completedLessons: string[];
  currLesson: string;
};

type UserDoc = {
  name: string;
  email: string;
  uid: string;
  completedLessons: string[];
  currLesson: string;
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
  completedLessons: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Lesson",
    default: [],
  },
  currLesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lesson",
  },
});

userSchema.statics.build = (attr: UserInterface) => {
  return new User(attr);
};

const User = mongoose.model<UserDoc, UserModelInterface>("User", userSchema);

export { User, userSchema };
