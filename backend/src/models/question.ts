import mongoose from "mongoose";

type QuestionType = "text" | "mcq" | "wwyd";

type OptionDoc = {
  content: string;
  affirmation: string;
};

type QuestionDoc = {
  type: QuestionType;
  content: string;
  options?: OptionDoc[];
  affirmation?: string;
} & mongoose.Document;

const questionSchema = new mongoose.Schema(
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
      type: [
        {
          content: {
            type: String,
            required: true,
          },
          affirmation: {
            type: String,
            required: true,
          },
        },
      ],
      // eslint-disable-next-line no-unused-vars
      required: function (this: QuestionDoc) {
        return this.type === "mcq" || this.type === "wwyd";
      },
    },
    affirmation: {
      type: String,
      // eslint-disable-next-line no-unused-vars
      required: function (this: QuestionDoc) {
        return this.type === "text";
      },
    },
  },
  {
    timestamps: true,
  },
);

const Question = mongoose.model<QuestionDoc>("Question", questionSchema);

export { Question };
