import React, { useEffect, useState } from "react";
import "../../styles/notes.scss";
import Sidebar from "./sidebar";
import NotesService from "../../services/notes";
import Editor from "./editor";

const Notes = ({ sidebar, setSidebar }) => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({});
  const [backupNotes, setBackupNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    console.log("fetching data");
    const response = await NotesService.index();
    if (response.data.length >= 1) {
      setNotes(response.data.reverse());
      setCurrentNote(response.data[0]);
    } else {
      setNotes([]);
    }
  };

  const selectNote = (id) => {
    const note = notes.find((note) => {
      return note._id == id;
    });
    setCurrentNote(note);
    setSidebar(false);
  };

  const createNote = async () => {
    await NotesService.create();
    fetchNotes();
  };

  const deleteNote = async (note) => {
    const confirm = window.confirm(
      `Are you sure to delete this note: ${note.title.replace(
        /(<([^>]+)>)/gi,
        ""
      )}`
    );
    if (!confirm) {
      return;
    } else {
      await NotesService.delete(note._id);
      fetchNotes();
      setSidebar(true);
    }
  };

  //this is for the auto-save function - it creates this temporary list so the client doesn't need to fetch the data for every single change on the note
  const updateNote = async (oldNote, params) => {
    const updatedNote = await NotesService.update(oldNote._id, params);
    //I don't want to fetch the notes upon every single text change, so I'm making a new note list that will be displayed on the noteList with the updated version
    const index = notes.indexOf(oldNote);
    setBackupNotes(notes);
    const temporaryList = notes;
    temporaryList[index] = updatedNote.data;
    setNotes(temporaryList);
    setCurrentNote(updatedNote.data);
  };

  // this is the intentional save button, so the user doesn't need to wait for the auto-save when the changes are done.
  const updateNoteDirectSave = async (oldNote, params) => {
    const updatedNote = await NotesService.update(oldNote._id, params);
    await fetchNotes();
    setCurrentNote(updatedNote.data);
    setSidebar(true);
  };

  const searchNote = async (query) => {
    const response = await NotesService.search(query);
    setNotes(response.data.reverse());
  };

  return (
    <>
      <Editor
        currentNote={currentNote}
        updateNote={updateNote}
        updateNoteDirectSave={updateNoteDirectSave}
      />
      <Sidebar
        sidebar={sidebar}
        setSidebar={setSidebar}
        notes={notes}
        currentNote={currentNote}
        selectNote={selectNote}
        createNote={createNote}
        deleteNote={deleteNote}
        searchNote={searchNote}
        fetchNotes={fetchNotes}
      />
    </>
  );
};

export default Notes;
