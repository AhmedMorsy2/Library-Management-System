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

const booksRouter = Router();

booksRouter.route("/").get(getAllBooks).post(validations(booksVal), addBook);

booksRouter
  .route("/:id")
  .get(getSpecificBook)
  .put(updateBook)
  .delete(deleteBook);

export default booksRouter;
