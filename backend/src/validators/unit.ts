import { body } from "express-validator";

const validateTitle = body("title")
  .notEmpty()
  .withMessage("title is required")
  .isString()
  .withMessage("title must be a string");

const validateLessons = body("lessons")
  .isArray()
  .withMessage("lessons must be an array")
  .custom((lessons) => {
    for (const lesson of lessons) {
      if (typeof lesson !== "string" || !/^[0-9a-fA-F]{24}$/.test(lesson)) {
        throw new Error("Each lesson must be a valid MongoDB ObjectId");
      }
    }
    return true;
  });

export const createUnitValidator = [validateTitle];
export const updateUnitValidator = [validateTitle.optional(), validateLessons.optional()];
