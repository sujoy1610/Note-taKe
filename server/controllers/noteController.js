import Note from "../models/Note.js";

export const getNotes = async (req, res) => {
  const { email } = req.query;
  const notes = await Note.find({ userEmail: email });
  res.json(notes);
};

export const createNote = async (req, res) => {
  const { title, content, email } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });

  const note = await Note.create({ title, content, userEmail: email });
  res.status(201).json(note);
};

export const deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Note deleted" });
};
