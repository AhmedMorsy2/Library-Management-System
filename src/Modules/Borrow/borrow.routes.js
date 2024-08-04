import { Router } from "express";
import { protectedRoutes } from "../auth/auth.controller.js";
import {
  allBorrowedBooks,
  borrowBook,
  returnBook,
} from "./borrow.controller.js";

const borrowRouter = Router();

borrowRouter.use(protectedRoutes);
borrowRouter.get("/", allBorrowedBooks);

borrowRouter.post("/:bookId/patron/:patronId", borrowBook);

borrowRouter.put("/:bookId/patron/:patronId", returnBook);

export default borrowRouter;
