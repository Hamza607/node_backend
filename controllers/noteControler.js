const Note = require("../models/Note");

exports.createNote = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Title is required" });
    }

    if (!description || description.trim() === "") {
      return res.status(400).json({ error: "Description is required" });
    }
    const note = new Note({ title, description });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ date: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { title, description } = req.body;
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { title, description, date: Date.now() },
      { new: true }
    );
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json({ message: "note updated successfully", note });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
