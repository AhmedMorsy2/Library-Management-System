import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
const schema = new Schema(
  {
    name: { type: String, required: true },
    contact_information: {
      phone_number: { type: Number },
      address: { type: String },
    },
    passwordChangedAt: Date,
  },
  {
    versionKey: false,
  }
);

export const Patron = model("Patron", schema);
