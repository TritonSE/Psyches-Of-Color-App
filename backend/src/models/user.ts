import mongoose, { Schema } from "mongoose";

/**
 * A model for a user of our application.
 */

type UserInterface = {
  uid: string;
};

type UserDoc = {
  uid: string;
} & mongoose.Document;

type UserModelInterface = {
  build(attr: UserInterface): UserDoc;
} & mongoose.Model<UserDoc>;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  // The user's Firebase UID (used to relate the MongoDB user to the Firebase user)
  uid: {
    type: String,
    required: true,
  },
});

/*
export interface DisplayUser {
  _id: ObjectId;
  uid: string;
  email: string | undefined;
  displayName: string | undefined;
}
  */

const User = mongoose.model<UserDoc, UserModelInterface>("User", userSchema);

export { User, userSchema };
