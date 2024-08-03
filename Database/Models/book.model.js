import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    title: String,
    author: String,
    publication_year: Date,
    ISBN: Number,
  },
  {
    versionKey: false,
  }
);

export const Book = model("Book", schema);
