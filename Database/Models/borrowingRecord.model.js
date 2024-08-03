import { Schema, Types } from "mongoose";

const schema = new Schema({
  book: { type: Types.ObjectId, ref: "Book" },
  patron: { type: Types.ObjectId, ref: "Patron" },
});

export const Patron = model("Patron", schema);
