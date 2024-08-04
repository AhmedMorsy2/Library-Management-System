import { Router } from "express";
import { validations } from "../../Middlewares/validation.js";
import { protectedRoutes } from "../auth/auth.controller.js";
import {
  addPatron,
  deletePatron,
  getAllPatrons,
  getSpecificPatron,
  updatePatron,
} from "./patron.controller.js";
import { addPatronVal } from "./patron.validation.js";

const patronRouter = Router();

patronRouter.use(protectedRoutes);
patronRouter
  .route("/")
  .get(getAllPatrons)
  .post(validations(addPatronVal), addPatron);
patronRouter
  .route("/:id")
  .get(getSpecificPatron)
  .put(updatePatron)
  .delete(deletePatron);

export default patronRouter;
