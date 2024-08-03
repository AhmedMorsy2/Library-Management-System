import { Patron } from "../../../Database/Models/patron.model.js";
import { catchError } from "../../Middlewares/catchError.js";
import { AppError } from "../../utils/appError.js";

const getAllPatrons = catchError(async (req, res, next) => {
  let patrons = await Patron.find();
  if (patrons.length === 0)
    return next(new AppError("There is no patrons", 404));
  res.status(200).json({ message: "success", data: patrons });
});

const getSpecificPatron = catchError(async (req, res, next) => {
  let patron = await Patron.findById(req.params.id);
  if (!patron) return next(new AppError("Patron not found", 404));
  res.status(200).json({ message: "success", data: patron });
});

const addPatron = catchError(async (req, res, next) => {
  let patron = new Patron(req.body);
  await patron.save();
  res.status(201).json({ message: "success", data: patron });
});

const updatePatron = catchError(async (req, res, next) => {
  let patron = await Patron.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!patron) return next(new AppError("Patron not found", 404));
  res.status(200).json({ message: "success", data: patron });
});

const deletePatron = catchError(async (req, res, next) => {
  let patron = await Patron.findByIdAndDelete(req.params.id);
  if (!patron) return next(new AppError("Patron not found", 404));
  res.status(200).json({ message: "success", data: patron });
});

export {
  getAllPatrons,
  getSpecificPatron,
  addPatron,
  updatePatron,
  deletePatron,
};
