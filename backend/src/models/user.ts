import { ObjectId } from "mongodb";
import { InferSchemaType, Schema, model } from "mongoose";

/**
 * A model for a user of our application.
 */
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  // The user's Firebase UID (used to relate the MongoDB user to the Firebas user)
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

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);
