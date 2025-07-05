import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const validateRegister = [
  body("name").notEmpty().withMessage("name is required").isString(),
  body("emaikl").notEmpty().withMessage("email is required").isEmail(),
  body("password").notEmpty().withMessage("password is required"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).send({ message: errors.array()[0].msg });
      return;
    }

    next();
  },
];
