import { body } from "express-validator";

export const createLessonValidator = [
  body("unit")
    .notEmpty()
    .withMessage("unit is required")
    .isMongoId()
    .withMessage("unit must be a valid MongoDB ObjectId"),
  body("title")
    .notEmpty()
    .withMessage("title is required")
    .isString()
    .withMessage("title must be a string"),
  body("description")
    .notEmpty()
    .withMessage("description is required")
    .isString()
    .withMessage("description must be a string"),
];
