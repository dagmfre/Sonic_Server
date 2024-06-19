const { body } = require("express-validator");

const titleValidator = body("title")
  .notEmpty()
  .withMessage("Title should not be empty")
  .isString()
  .withMessage("Title must be a string")
  .isLength({ min: 2, max: 100 })
  .withMessage("Title must be between 2 and 100 characters");

const singerValidator = body("singer")
  .notEmpty()
  .withMessage("Singer should not be empty")
  .isString()
  .withMessage("Singer must be a string")
  .isLength({ min: 2, max: 100 })
  .withMessage("Singer must be between 2 and 100 characters");

const imageFileNameValidator = body("imageFileName")
  .notEmpty()
  .withMessage("Image file name should not be empty")
  .isString()
  .withMessage("Image file name must be a string");

const audioFileNameValidator = body("audioFileName")
  .notEmpty()
  .withMessage("Audio file name should not be empty")
  .isString()
  .withMessage("Audio file name must be a string");

const validateSong = [
  titleValidator,
  singerValidator,
  imageFileNameValidator,
  audioFileNameValidator,
];

module.exports = {
  validateSong,
};
