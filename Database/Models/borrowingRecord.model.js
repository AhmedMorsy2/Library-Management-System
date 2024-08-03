import { model, Schema, Types } from "mongoose";

const schema = new Schema(
  {
    book: { type: Types.ObjectId, ref: "Book" },
    patron: { type: Types.ObjectId, ref: "Patron" },
    borrow_date: Date,
    return_date: Date,
  },
  {
    versionKey: false,
  }
);

export const Borrow = model("Borrow", schema);
