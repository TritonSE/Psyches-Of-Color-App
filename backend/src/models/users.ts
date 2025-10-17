import mongoose from "mongoose";

type UserInterface = {
  name: string;
  email: string;
  uid: string;
  hasCompletedWeeklyCheckin: boolean;
};

type UserDoc = {
  name: string;
  email: string;
  uid: string;
} & mongoose.Document;

type UserModelInterface = {
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
  hasCompletedWeeklyCheckin: {
    type: Boolean,
    required: true,
  },
});

userSchema.statics.build = (attr: UserInterface) => {
  return new User(attr);
};

const User = mongoose.model<UserDoc, UserModelInterface>("User", userSchema);

export { User, userSchema };
