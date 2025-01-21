import { Schema } from "mongoose";

import mongoose from "mongoose";

/**
 * A model for a user of our application.
 */

interface UserInterface {
  uid: string;
}

interface UserDoc extends mongoose.Document {
  uid: string;
}

interface UserModelInterface extends mongoose.Model<UserDoc> {
  // eslint-disable-next-line no-unused-vars
  build(attr: UserInterface): UserDoc;
}

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
