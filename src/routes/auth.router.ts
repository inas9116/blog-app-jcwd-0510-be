import { Router } from "express";
import {
  loginController,
  registerController,
} from "../controller/auth.controller";
import { validateLogin, validateRegister } from "../validators/auth.validator";

const router = Router();

router.post("/register", validateRegister, registerController);
router.post("/login", validateLogin, loginController);

export default router;
