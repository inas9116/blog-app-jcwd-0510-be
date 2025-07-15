import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const handleVallidation = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).send({ message: errors.array()[0].msg });
    return;
  }

  next();
};

export const validateRegister = [
  body("name").notEmpty().withMessage("name is required").isString(),
  body("email").notEmpty().withMessage("email is required").isEmail(),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters"),
  handleVallidation,
];

export const validateLogin = [
  body("email").notEmpty().withMessage("email is required").isEmail(),
  body("password").notEmpty().withMessage("password is required"),
  handleVallidation,
];

export const validateForgotPassword = [
  body("email").notEmpty().withMessage("email is required").isEmail(),
  handleVallidation,
];
