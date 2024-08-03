import { Schema } from "mongoose";

const schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contact_information: {
    phone_number: { type: String },
    address: { type: String },
  },
});

export const Patron = model("Patron", schema);
