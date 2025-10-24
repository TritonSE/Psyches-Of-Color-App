import mongoose from "mongoose";

type UserInterface = {
  name: string;
  email: string;
  uid: string;
  age: number;
  gender: string;
  residence: string;
};

type UserDoc = {
  name: string;
  email: string;
  uid: string;
  age: number;
  gender: string;
  residence: string;
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
