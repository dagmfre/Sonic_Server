import { body } from "express-validator";

const titleValidator = body("title")
  .notEmpty()
  .withMessage("Title should not be empty")
  .isLength({ min: 2, max: 100 })
  .withMessage("Title must be between 2 and 100 characters");

const singerValidator = body("singer")
  .notEmpty()
  .withMessage("Singer should not be empty")
  .isAlpha()
  .withMessage("Singer name should only be an alpha characters(letters)")
  .isLength({ min: 2, max: 100 })
  .withMessage("Singer must be between 2 and 100 characters");

const audioFileNameValidator = body("audioFileName")
  .notEmpty()
  .withMessage("audioFileName should not be empty")
  .isLength({ min: 2, max: 100 })
  .withMessage("audioFileName must be between 2 and 100 characters");

const imageFileNameValidator = body("imageFileName")
  .notEmpty()
  .withMessage("imageFileName should not be empty")
  .isLength({ min: 2, max: 100 })
  .withMessage("imageFileName must be between 2 and 100 characters");

const validateSong = [
  titleValidator,
  singerValidator,
  audioFileNameValidator,
  imageFileNameValidator,
];

export default validateSong;
