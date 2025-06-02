import { body } from "express-validator";

export const createLessonValidator = [
  body("unit")
    .notEmpty()
    .withMessage("Unit ID is required")
    .isMongoId()
    .withMessage("Unit ID must be a valid MongoDB ObjectId"),
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string"),
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be a string"),
];
