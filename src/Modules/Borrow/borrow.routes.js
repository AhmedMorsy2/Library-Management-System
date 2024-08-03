import { Router } from "express";
import {
  allBorrowedBooks,
  borrowBook,
  returnBook,
} from "./borrow.controller.js";

const borrowRouter = Router();

borrowRouter.get("/", allBorrowedBooks);
borrowRouter.post("/:bookid/patron/:patronid", borrowBook);
borrowRouter.put("/:bookid/patron/:patronid", returnBook);

export default borrowRouter;
