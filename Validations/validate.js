const { body } = require("express-validator");

const titleValidator = body("title")
  .notEmpty()
  .withMessage("Title should not be empty")
  .isAlpha()
  .withMessage("Title should only be an alpha characters(letters)")
  .isLength({ min: 2, max: 100 })
  .withMessage("Title must be between 2 and 100 characters");

const singerValidator = body("singer")
  .notEmpty()
  .withMessage("Singer should not be empty")
  .isAlpha()
  .withMessage("Singer name should only be an alpha characters(letters)")
  .isLength({ min: 2, max: 100 })
  .withMessage("Singer must be between 2 and 100 characters");

const validateSong = [titleValidator, singerValidator];

module.exports = {
  validateSong,
};
