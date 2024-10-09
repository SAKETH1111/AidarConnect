const express = require("express");
const router = express.Router();
const Alien = require("../models/alien");
router.get("/", async (req, res) => {
  //console.log("Get Request");
  try {
    const aliens = await Alien.find();
    res.json(aliens);
  } catch (err) {
    res.send("Error" + err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const alien = await Alien.findById(req.params.id);
    if (!alien) {
      return res.status(404).json({ message: "Alien not found" });
    }
    res.json(alien);
  } catch (err) {
    console.error("Error fetching alien:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post("/", async (req, res) => {
  const { name, tech, sub } = req.body;

  // Basic validation to ensure required fields are provided
  if (!name || !tech || !sub) {
    return res
      .status(400)
      .json({ message: "Name, tech, and sub are required." });
  }

  const alien = new Alien({
    name,
    tech,
    sub,
  });

  try {
    const savedAlien = await alien.save();
    res
      .status(201)
      .json({ message: "Alien created successfully", data: savedAlien });
  } catch (err) {
    console.error("Error creating alien:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const alien = await Alien.findById(req.params.id);

    // Check if the alien exists before trying to update
    if (!alien) {
      return res.status(404).json({ message: "Alien not found" });
    }

    // Update only the fields that are provided in the request body
    if (req.body.name !== undefined) {
      alien.name = req.body.name;
    }
    if (req.body.tech !== undefined) {
      alien.tech = req.body.tech;
    }
    if (req.body.sub !== undefined) {
      alien.sub = req.body.sub;
    }

    const updatedAlien = await alien.save();
    res.json({ message: "Alien updated successfully", data: updatedAlien });
  } catch (err) {
    console.error("Error updating alien:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const alien = await Alien.findById(req.params.id);
    if (!alien) {
      return res.status(404).json({ message: "Alien not found" });
    }

    const result = await alien.deleteOne();
    res.json({ message: "Alien deleted successfully", data: result });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
