import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Librarians } from "../../../Database/Models/librarian.model.js";
import { catchError } from "../../Middlewares/catchError.js";
import { AppError } from "../../utils/appError.js";

const signup = catchError(async (req, res) => {
  let librarian = new Librarians(req.body);
  await librarian.save();
  let token = jwt.sign(
    { librarianId: librarian._id, role: librarian.role },
    process.env.JWT_KEY
  );
  res.status(200).json({ message: "success", token });
});

const signin = catchError(async (req, res, next) => {
  let librarian = await Librarians.findOne({ email: req.body.email });
  if (librarian && bcrypt.compareSync(req.body.password, librarian.password)) {
    let token = jwt.sign(
      { librarianId: librarian._id, role: librarian.role },
      process.env.JWT_KEY
    );
    return res.status(200).json({ message: "success", token });
  }
  next(new AppError("Incorrect email or password", 401));
});

const protectedRoutes = catchError(async (req, res, next) => {
  let { token } = req.headers;
  let librarianPayload = null;
  if (!token) return next(new AppError("Token not provided", 401));
  jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
    if (err) return next(new AppError(err, 401));
    librarianPayload = payload;
  });

  let librarian = await Librarians.findById(librarianPayload.librarianId);
  if (!librarian) next(new AppError("librarian not found", 401));

  if (
    librarian.passwordChangedAt &&
    librarian.passwordChangedAt instanceof Date
  ) {
    let time = parseInt(librarian.passwordChangedAt.getTime() / 1000);
    if (time > librarianPayload.iat) {
      return next(new AppError("Invalid token ... login again", 401));
    }
  }
  req.librarian = librarian;
  next();
});

export { protectedRoutes, signin, signup };
