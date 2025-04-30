import mongoose from "mongoose";

type QuestionType = "text" | "mcq";

type QuestionDoc = {
  type: QuestionType;
  content: string;
  options?: string[];
  affirmation: string;
} & mongoose.Document;

const questionSchem = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["text", "mcq"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    options: {
      type: [String],
      // eslint-disable-next-line no-unused-vars
      required: function (this: QuestionDoc) {
        return this.type === "mcq";
      },
    },
    affirmation: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Question = mongoose.model<QuestionDoc>("Question", questionSchem);

export { Question };
