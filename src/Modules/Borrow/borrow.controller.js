import { Book } from "../../../Database/Models/book.model.js";
import { Borrow } from "../../../Database/Models/borrowingRecord.model.js";
import { catchError } from "../../Middlewares/catchError.js";
import { AppError } from "../../utils/appError.js";

const borrowBook = catchError(async (req, res, next) => {
  let borrow = new Borrow(req.body);
  await Book.findByIdAndUpdate(req.params.bookid, {
    status: "borrowed",
  });
  borrow.book = req.params.bookid;
  borrow.patron = req.params.patronid;
  borrow.borrow_date = Date.now();

  await borrow.save();
  res.status(201).json({ message: "Book borrowed successfully", data: borrow });
});

const allBorrowedBooks = catchError(async (req, res, next) => {
  let books = await Borrow.find().populate("book").populate("patron");
  if (books.length === 0)
    return next(new AppError("There is no borrowed books", 404));
  res.status(200).json({ message: "success", data: books });
});

const returnBook = catchError(async (req, res, next) => {
  let borrow = await Borrow.findOneAndUpdate({
    patron: req.params.patronid,
    book: req.params.bookid,
  });
  if (!borrow) return next(new AppError("There is no recorded data ", 404));
  await Book.findByIdAndUpdate(req.params.bookid, {
    status: "available",
  });
  borrow.return_date = Date.now();
  res.status(200).json({ message: "Book returned successfully", data: borrow });
});

export { borrowBook, allBorrowedBooks, returnBook };
