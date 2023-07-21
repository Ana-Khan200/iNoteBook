const express = require("express");
const finduser = require("../middleware/finduser");
const router = express.Router();

const Notes = require("../models/Notes");

//Route 1:  addNotes
router.post("/addNotes", finduser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    if (!title || !description) {
      return res
        .status(422)
        .json({ error: "please fill all the required feild" });
    }

    const note = new Notes({ user: req.user.id, title, description, tag });
    await note.save();

    res.status(200).json({ message: "note added successfully" });
  } catch (error) {
    console.log(error);
  }
});

// route to find all notes of a user
router.get("/fetchnotes", finduser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});

//Route 3 update an existing notes
router.put("/updateNote/:id", finduser, async (req, res) => {
  const { title, description, tag } = req.body;
  const newNote = {};
  if (title) newNote.title = title;
  if (description) newNote.description = description;
  if (tag) newNote.tag = tag;
  let note = await Notes.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Noass");
  }

  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }

  note = await Notes.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  );

  res.json({ note });
});

//Route 3: delete note
router.delete("/deleteNote/:id", finduser, async (req, res) => {
  let note = await Notes.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Not fonud");
  }

  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }

  note = await Notes.findByIdAndDelete(req.params.id);
  res.send({ success: "successfully deleted" });
});
module.exports = router;
