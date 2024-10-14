const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get a specific user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Create a new user
router.post("/", async (req, res) => {
  const { fullName, email, password, profession } = req.body;

  // Basic validation to ensure required fields are provided
  if (!fullName || !email || !password || !profession) {
    return res
      .status(400)
      .json({ message: "Full name, email, password, and profession are required." });
  }

  const user = new User({
    fullName,
    email,
    password,
    profession,
  });

  try {
    const savedUser = await user.save();
    res
      .status(201)
      .json({ message: "User created successfully", data: savedUser });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Update a user's details
router.patch("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    // Check if the user exists before trying to update
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update only the fields that are provided in the request body
    if (req.body.fullName !== undefined) {
      user.fullName = req.body.fullName;
    }
    if (req.body.email !== undefined) {
      user.email = req.body.email;
    }
    if (req.body.password !== undefined) {
      user.password = req.body.password;
    }
    if (req.body.profession !== undefined) {
      user.profession = req.body.profession;
    }

    const updatedUser = await user.save();
    res.json({ message: "User updated successfully", data: updatedUser });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Delete a user
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const result = await user.deleteOne();
    res.json({ message: "User deleted successfully", data: result });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
