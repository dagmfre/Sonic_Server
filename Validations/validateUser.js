import body from 'express-validator';

const emailValidator = body("email")
  .notEmpty()
  .withMessage("Title should not be empty")
  .isEmail()
  .withMessage("Please enter a valid email address.")
  .normalizeEmail();

const usernameValidator = body("username")
  .notEmpty()
  .withMessage("Username should not be empty")
  .isLength({ min: 4, max: 20 })
  .withMessage("Username must be between 4 and 20 characters long.");

const passwordValidator = body("password")
  .notEmpty()
  .withMessage("Singer should not be empty")
  .isAlphanumeric("en-US", { ignore: ["-", "."] })
  .withMessage(
    "Username can only contain letters, numbers, hyphens, and periods."
  );

const validateSong = [emailValidator, usernameValidator, passwordValidator];

export { validateUser };
