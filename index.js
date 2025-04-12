import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 5000;

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/omar")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Schema
const userSchema = mongoose.Schema({
  email: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

// ✅ Register
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send("User already exists");

    // Create and save new user
    const newUser = new User({ email, password });
    await newUser.save();

    res.status(201).send("User registered successfully");
  } catch (error) {
    res.status(500).send("Error registering user");
  }
});

// ✅ GET All Users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    res.json(users);
  } catch (error) {
    res.status(500).send("Error fetching users");
  }
});

// ✅ GET Single User by Email
app.get("/users/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).send("User not found");

    res.json(user);
  } catch (error) {
    res.status(500).send("Error fetching user");
  }
});

// ✅ Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).send("User not found");
  if (user.password !== password) return res.status(401).send("Incorrect password");

  res.send("Login Successfully");
});

app.listen(PORT, () => console.log("Express running on port", PORT));