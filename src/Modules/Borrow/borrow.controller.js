import { Borrow } from "../../../Database/Models/borrowingRecord.model.js";
import { catchError } from "../../Middlewares/catchError.js";
import { AppError } from "../../utils/appError.js";

const borrowBook = catchError(async (req, res, next) => {
  let borrow = new Borrow(req.body);

  borrow.book = req.params.bookid;
  borrow.patron = req.params.patronid;
  borrow.borrow_date = Date.now();
  borrow.return_date = Date.now() + 604800000;

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

});

export { borrowBook, allBorrowedBooks, returnBook };
