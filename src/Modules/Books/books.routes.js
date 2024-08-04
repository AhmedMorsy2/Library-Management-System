import { Router } from "express";
import {
  addBook,
  deleteBook,
  getAllBooks,
  getSpecificBook,
  updateBook,
} from "./books.controller.js";
import { validations } from "../../Middlewares/validation.js";
import { booksVal } from "./books.validation.js";
import { protectedRoutes } from "../auth/auth.controller.js";

const booksRouter = Router();

booksRouter
  .route("/")
  .get(getAllBooks)
  .post(protectedRoutes, validations(booksVal), addBook);

booksRouter
  .route("/:id")
  .get(getSpecificBook)
  .put(updateBook)
  .delete(protectedRoutes, deleteBook);

export default booksRouter;
