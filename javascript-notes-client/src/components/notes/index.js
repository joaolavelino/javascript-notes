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

  const updateNote = async (oldNote, params) => {
    await NotesService.update(oldNote._id, params);
    //I don't want to fetch the notes upon every single text change, so I'm making a new note list that will be displayed on the noteList with the updated version
    fetchNotes();
    // const index = notes.indexOf(oldNote);
    // setBackupNotes(notes);
    // const temporaryList = notes;
    // temporaryList[index] = updatedNote.data;
    // setNotes(temporaryList);
    // setCurrentNote(updatedNote.data);
  };

  return (
    <>
      <Editor currentNote={currentNote} updateNote={updateNote} />
      <Sidebar
        sidebar={sidebar}
        setSidebar={setSidebar}
        notes={notes}
        currentNote={currentNote}
        selectNote={selectNote}
        createNote={createNote}
        deleteNote={deleteNote}
      />
    </>
  );
};

export default Notes;
