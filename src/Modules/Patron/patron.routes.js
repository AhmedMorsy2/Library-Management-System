import { Router } from "express";
import {
  addPatron,
  deletePatron,
  getAllPatrons,
  getSpecificPatron,
  updatePatron,
} from "./patron.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const patronRouter = Router();

patronRouter.use(protectedRoutes);
patronRouter.use(allowedTo("admin"));
patronRouter.route("/").get(getAllPatrons).post(addPatron);
patronRouter
  .route("/:id")
  .get(getSpecificPatron)
  .put(updatePatron)
  .delete(deletePatron);

export default patronRouter;
