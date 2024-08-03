import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    title: String,
    author: String,
    publication_year: Date,
    ISBN: Number,
    status: {
      type: String,
      enum: ["available", "borrowed"],
      default: "available",
    },
  },
  {
    versionKey: false,
  }
);

export const Book = model("Book", schema);
