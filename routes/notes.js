const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteControler");

router.post("/createNotes", noteController.createNote);
router.get("/getNotes", noteController.getAllNotes);

// Get a single note by ID
router.get("/getNotesById/:id", noteController.getNoteById);

// Update a note
router.put("/updateNotes/:id", noteController.updateNote);

// Delete a note
router.delete("/delteNotes/:id", noteController.deleteNote);

module.exports = router;
