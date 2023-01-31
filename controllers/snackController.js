const express = require("express");
const snacks = express.Router();
const {
  getAllSnacks,
  getSnack,
  createSnack,
  deleteSnack,
  updateSnack,
} = require("../queries/snacks");

const { checkName } = require("../Validation/check.js");

//INDEX
snacks.get("/", async (req, res) => {
  const allSnacks = await getAllSnacks();
  console.log(allSnacks);
  if (allSnacks[0]) {
    res.status(200).json(allSnacks);
  } else {
    res.status(500).json({ error: "server error" });
  }
});

// SHOW
snacks.get("/:id", async (req, res) => {
  const { id } = req.params;
  const snack = await getSnack(id);
  if (snack) {
    res.json(snack);
  } else {
    res.status(404).json({ error: "not found" });
  }
});

// CREATE
snacks.post("/", checkName, async (req, res) => {
  // console.log(req.body)
  if (!req.body.image) {
    req.body.image = 'https://dummyimage.com/400x400/6e6c6e/e9e9f5.png&text=No+Image'
  }
  if (!req.body.fiber) {
    req.body.fiber = 0
  }
  if (!req.body.protein) {
    req.body.protein = 0
  }
  if (!req.body.added_sugar) {
    req.body.added_sugar = 0
  }
  
  try {
    const snack = await createSnack(req.body);
    res.json(snack);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});

//DELETE
snacks.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedSnack = await deleteSnack(id);
  if (deletedSnack.id) {
    res.status(200).json(deletedSnack);
  } else {
    res.status(404).json("Snack not found");
  }
});

//UPDATE
snacks.put("/:id", checkName, async (req, res) => {
  const { id } = req.params;
  const updatedSnack = await updateSnack(id, req.body);
  res.status(200).json(updatedSnack);
});

module.exports = snacks;
