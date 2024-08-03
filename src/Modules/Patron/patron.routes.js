import { Router } from "express";
import {
  addPatron,
  deletePatron,
  getAllPatrons,
  getSpecificPatron,
  updatePatron,
} from "./patron.controller.js";

const patronRouter = Router();

patronRouter.route("/").get(getAllPatrons).post(addPatron);

patronRouter
  .route("/:id")
  .get(getSpecificPatron)
  .put(updatePatron)
  .delete(deletePatron);

export default patronRouter;
