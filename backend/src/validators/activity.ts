import { body } from "express-validator";

export const createActivityValidator = [
  body("type")
    .isIn(["reflection", "mcq", "wwyd"])
    .withMessage("type must be one of: reflection, mcq, wwyd"),
  body("question")
    .notEmpty()
    .withMessage("question is required")
    .isString()
    .withMessage("question must be a string"),
  body("options").custom((value, { req }) => {
    if (req.body.type === "mcq" || req.body.type === "wwyd") {
      if (!Array.isArray(value) || value.length === 0) {
        throw new Error("options must be a non-empty array for mcq or wwyd types");
      }
      value.forEach((option) => {
        if (!option.content || !option.affirmation) {
          throw new Error("Each option must have content and affirmation");
        }
      });
    } else if (value) {
      throw new Error("options should not be provided for reflection type");
    }

    return true;
  }),
  body("affirmation").custom((value, { req }) => {
    if (req.body.type === "reflection") {
      if (!value) {
        throw new Error("affirmation is required for reflection type");
      }
    } else if (value) {
      throw new Error("affirmation should not be provided for mcq or wwyd types");
    }

    return true;
  }),
  body("lesson")
    .notEmpty()
    .withMessage("lesson is required")
    .isMongoId()
    .withMessage("lesson must be a valid MongoDB ObjectId"),
];
