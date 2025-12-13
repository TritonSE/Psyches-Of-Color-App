import { body } from "express-validator";

const validateType = body("type")
  .isIn(["text", "mcq", "wwyd"])
  .withMessage("type must be one of: text, mcq, wwyd");

const validateQuestion = body("question")
  .notEmpty()
  .withMessage("question is required")
  .isString()
  .withMessage("question must be a string");

const validateOptions = body("options").custom((value, { req }) => {
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
});

const validateAffirmation = body("affirmation").custom((value, { req }) => {
  if (req.body.type === "reflection") {
    if (!value) {
      throw new Error("affirmation is required for reflection type");
    }
  } else if (value) {
    throw new Error("affirmation should not be provided for mcq or wwyd types");
  }

  return true;
});

const validateNoTypeUpdate = body("type").custom((value) => {
  if (value) {
    throw new Error("type cannot be updated");
  }

  return true;
});

const validateOptionsUpdate = body("options").custom((value) => {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error("options must be a non-empty array for mcq or wwyd types");
  }

  value.forEach((option) => {
    if (!option.content || !option.affirmation) {
      throw new Error("Each option must have content and affirmation");
    }
  });

  return true;
});

const validateAffirmationUpdate = body("affirmation")
  .notEmpty()
  .withMessage("affirmation cannot be empty")
  .isString()
  .withMessage("affirmation must be a string");

const validateLesson = body("lesson")
  .notEmpty()
  .withMessage("lesson is required")
  .isMongoId()
  .withMessage("lesson must be a valid MongoDB ObjectId");

export const createActivityValidator = [
  validateType,
  validateQuestion,
  validateOptions,
  validateAffirmation,
  validateLesson,
];

export const updateActivityValidator = [
  validateNoTypeUpdate,
  validateQuestion.optional(),
  validateOptionsUpdate.optional(),
  validateAffirmationUpdate.optional(),
  validateLesson.optional(),
];
