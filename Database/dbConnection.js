import mongoose from "mongoose";

export const db = mongoose
  .connect("mongodb://localhost:27017/DataBaseName")
  .then(() => {
    console.log("DataBase Connection Successfully");
  });
