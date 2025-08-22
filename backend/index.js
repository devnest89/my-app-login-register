// index.js
import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";
import bcrypt from "bcrypt";
import User from "./schema/schema.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 },
  })
);

app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 8000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

app.post("/api/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err)
      return res.status(500).json({ success: false, message: "Logout error" });
    res.clearCookie("connect.sid");
    res.json({ success: true, message: "Logged out successfully" });
  });
});

app.delete("/api/user/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found ❌" });
    }
    res.json({ success: true, message: "User deleted ✅" });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ success: false, message: "Server Error ⚠️" });
  }
});

app.post("/api/register", upload.single("file"), async (req, res) => {
  try {
    const { username, email, password, range, order, select } = req.body;
    const file = req.file ? req.file.filename : null;

    if (!username || !email || !password || !file) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      file,
      range: range || "",
      order: Number(order) || 0,
      select: select || "",
      dateTime: new Date(),
    });
    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "User registered successfully ✅" });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ success: false, message: "Server Error ⁉️" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });

    req.session.userId = user._id;

    res.status(200).json({ success: true, message: "Login Successful ✅" });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.get("/api/user/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).select("-__v -password");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error("Get User Error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.get("/api/user/id/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-__v -password");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found ❌" });
    res.json({ success: true, user });
  } catch (err) {
    console.error("Get User by ID Error:", err);
    res.status(500).json({ success: false, message: "Server Error ⚠️" });
  }
});

app.put("/api/user/:id", upload.single("file"), async (req, res) => {
  try {
    const { username, email, range, order, select } = req.body;
    const file = req.file ? req.file.filename : null;
    const updateData = {
      username,
      email,
      range,
      order: Number(order) || 0,
      select,
    };
    if (file) updateData.file = file;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select("-password -__v");
    if (!updatedUser)
      return res
        .status(404)
        .json({ success: false, message: "User not found ❌" });
    res.json({ success: true, message: "User updated ✅", user: updatedUser });
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ success: false, message: "Server Error ⚠️" });
  }
});
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB ✅"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
