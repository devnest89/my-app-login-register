// schema/schema.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  file: { type: String, required: true }, // image filename
  range: { type: String, default: "" },
  order: { type: Number, default: 0 },
  select: { type: String, default: "" },
  dateTime: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
export default User;
