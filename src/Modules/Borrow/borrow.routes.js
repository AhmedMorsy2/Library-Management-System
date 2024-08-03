import { Router } from "express";
import {
  allBorrowedBooks,
  borrowBook,
  returnBook,
} from "./borrow.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const borrowRouter = Router();

borrowRouter.use(protectedRoutes);
borrowRouter.get("/", allowedTo("admin"), allBorrowedBooks);

borrowRouter.post("/:bookid", allowedTo("user", "admin"), borrowBook);

borrowRouter.put("/:bookid", allowedTo("user", "admin"), returnBook);

export default borrowRouter;
