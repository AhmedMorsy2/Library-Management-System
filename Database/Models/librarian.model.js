import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
const schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String },
    passwordChangedAt: Date,
  },
  {
    versionKey: false,
  }
);

schema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 8);
});

schema.pre("findOneAndUpdate", function () {
  if (this._update.password)
    this._update.password = bcrypt.hashSync(this._update.password, 8);
});

export const Librarians = model("Librarians", schema);