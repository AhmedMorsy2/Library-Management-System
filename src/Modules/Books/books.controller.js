import { Book } from "../../../Database/Models/book.model.js";
import { catchError } from "../../Middlewares/catchError.js";
import { AppError } from "../../utils/appError.js";

const getAllBooks = catchError(async (req, res, next) => {
  let books = await Book.find();
  if (books.length === 0) return next(new AppError("There is no books", 404));
  res.status(200).json({ message: "success", data: books });
});

const getSpecificBook = catchError(async (req, res, next) => {
  let book = await Book.findById(req.params.id);
  if (!book) return next(new AppError("Book not found", 404));
  res.status(200).json({ message: "success", data: book });
});

const addBook = catchError(async (req, res, next) => {
  let book = new Book(req.body);
  await book.save();
  res.status(201).json({ message: "success", data: book });
});

const updateBook = catchError(async (req, res, next) => {
  let book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!book) return next(new AppError("Book not found", 404));
  res.status(200).json({ message: "success", data: book });
});

const deleteBook = catchError(async (req, res, next) => {
  let book = await Book.findByIdAndDelete(req.params.id);
  if (!book) return next(new AppError("Book not found", 404));
  res.status(200).json({ message: "success", data: book });
});
export { getAllBooks, getSpecificBook, addBook, updateBook, deleteBook };
