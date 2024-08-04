import { Book } from "../../../Database/Models/book.model.js";
import { Borrow } from "../../../Database/Models/borrowingRecord.model.js";
import { catchError } from "../../Middlewares/catchError.js";
import { AppError } from "../../utils/appError.js";

const borrowBook = catchError(async (req, res, next) => {
  let borrow = new Borrow(req.body);

  let book = await Book.findById(req.params.bookId);
  if (!book) return next(new AppError("Book not found", 404));

  if (book.status == "borrowed")
    return next(new AppError("Book is already borrowed", 409));

  book.status = "borrowed";
  book.save();
  borrow.book = req.params.bookId;
  borrow.patron = req.params.patronId;
  borrow.borrow_date = Date.now();

  await borrow.save();
  res.status(201).json({ message: "success", data: borrow });
});

const allBorrowedBooks = catchError(async (req, res, next) => {
  let books = await Borrow.find({ status: "borrowed" })
    .populate("book")
    .populate("patron", " name contact_information");
  if (books.length === 0)
    return next(new AppError("There is no borrowed books", 404));
  res.status(200).json({ message: "success", data: books });
});

const returnBook = catchError(async (req, res, next) => {
  let borrow = await Borrow.findOneAndUpdate({
    patron: req.params.patronId,
    book: req.params.bookId,
  });
  if (!borrow) return next(new AppError("There is no recorded data ", 404));
  await Book.findByIdAndUpdate(req.params.bookId, { status: "available" });
  borrow.return_date = Date.now();
  borrow.save();
  res.status(200).json({ message: "success", data: borrow });
});

export { borrowBook, allBorrowedBooks, returnBook };
