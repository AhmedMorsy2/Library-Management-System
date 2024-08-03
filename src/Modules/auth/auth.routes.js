import { Router } from "express";
import { changeUserPassword, signin, signup } from "./auth.controller.js";
import { checkEmail } from "../../Middlewares/checkEmail.js";

const authRouter = Router();

authRouter.post("/signup", checkEmail, signup);
authRouter.post("/signin", signin);
authRouter.patch("/changepassword", changeUserPassword);

export default authRouter;