import { body } from "express-validator";

const validateTitle = body("title")
  .notEmpty()
  .withMessage("title is required")
  .isString()
  .withMessage("title must be a string");

const validateParagraph = body("paragraph")
  .notEmpty()
  .withMessage("paragraph is required")
  .isString()
  .withMessage("paragraph must be a string");

const validateImageUrl = body("imageUrl")
  .optional()
  .isString()
  .withMessage("imageUrl must be a string");

export const createJournalEntryValidator = [validateTitle, validateParagraph, validateImageUrl];
