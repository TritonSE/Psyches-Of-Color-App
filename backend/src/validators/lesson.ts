import { body } from "express-validator";

const validateUnit = body("unit")
  .notEmpty()
  .withMessage("unit is required")
  .isMongoId()
  .withMessage("unit must be a valid MongoDB ObjectId");

const validateTitle = body("title")
  .notEmpty()
  .withMessage("title is required")
  .isString()
  .withMessage("title must be a string");

const validateDescription = body("description")
  .notEmpty()
  .withMessage("description is required")
  .isString()
  .withMessage("description must be a string");

const validateUpdateActivities = body("activities")
  .isArray()
  .withMessage("activities must be an array")
  .custom((activities) => {
    for (const activity of activities) {
      if (typeof activity !== "string" || !/^[0-9a-fA-F]{24}$/.test(activity)) {
        throw new Error("Each activity must be a valid MongoDB ObjectId");
      }
    }
    return true;
  });

export const createLessonValidator = [validateUnit, validateTitle, validateDescription];
export const updateLessonValidator = [
  validateUnit.optional(),
  validateTitle.optional(),
  validateDescription.optional(),
  validateUpdateActivities.optional(),
];
