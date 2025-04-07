import mongoose from "mongoose";

type UserInterface = {
  name: string;
  email: string;
  uid: string;
  character: string;
};

type UserDoc = {
  name: string;
  email: string;
  uid: string;
  character: string;
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
  character: {
    type: String,
    enum: ["fire", "water", "earth"],
    default: "fire",
    required: true,
  },
});

userSchema.statics.build = (attr: UserInterface) => {
  return new User(attr);
};

const User = mongoose.model<UserDoc, UserModelInterface>("User", userSchema);

export { User, userSchema };
