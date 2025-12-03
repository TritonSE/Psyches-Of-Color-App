import { InferSchemaType, Schema, model } from "mongoose";

const unitSchema = new Schema(
  {
    title: { type: String, required: true },
    // 'order' is required for sorting units (1, 2, 3...)
    order: { type: Number },
    lessons: [{ type: Schema.Types.ObjectId, ref: "Lesson" }],
  },
  { timestamps: true },
);

type Unit = InferSchemaType<typeof unitSchema>;

export const Unit = model<Unit>("Unit", unitSchema);
