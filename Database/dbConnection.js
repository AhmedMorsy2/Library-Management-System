import mongoose from "mongoose";

export const db = mongoose
  .connect("mongodb://localhost:27017/Library")
  .then(() => {
    console.log("DataBase Connection Successfully");
  });
