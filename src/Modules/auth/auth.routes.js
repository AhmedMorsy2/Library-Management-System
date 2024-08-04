import { Router } from "express";
import { checkEmail } from "../../Middlewares/checkEmail.js";
import { validations } from "../../Middlewares/validation.js";
import {
  changeUserPassword,
  protectedRoutes,
  signin,
  signup,
} from "./auth.controller.js";
import { signinVal, signupVal } from "./auth.validation.js";

const authRouter = Router();

authRouter.post("/signup", checkEmail, validations(signupVal), signup);
authRouter.post("/signin", validations(signinVal), signin);
authRouter.patch("/changepassword", protectedRoutes, changeUserPassword);

export default authRouter;
