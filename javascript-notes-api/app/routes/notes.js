//--PART EIGHT-2---
const express = require("express");
const router = express.Router();
const Note = require("../models/note");
//6--PART EIGHT-6---
const withAuth = require(`../middlewares/auth`);

//--CREATE A NEW NOTE--
router.post("/", withAuth, async (req, res) => {
  //get the info from the request body
  const { title, body } = req.body;
  //create a new note with those infos (the author is from the request user provided by the WithAuth middleware)
  try {
    let note = new Note({ title: title, body: body, author: req.user._id });
    //try to save the note
    await note.save();
    //if it succeds, respond with the success status and the created note
    res.status(200).json(note);
  } catch (error) {
    //if it doesn't, throw the internal sever error status and an error
    res.status(500).json({ error: "Problems on creating new note" });
  }
});

module.exports = router;
