import { Router } from "express";
import {
  addBook,
  deleteBook,
  getAllBooks,
  getSpecificBook,
  updateBook,
} from "./books.controller.js";

const booksRouter = Router();

booksRouter.route("/").get(getAllBooks).post(addBook);

booksRouter
  .route("/:id")
  .get(getSpecificBook)
  .put(updateBook)
  .delete(deleteBook);

export default booksRouter;
