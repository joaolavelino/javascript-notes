import React from "react";
import "../../styles/sidebar.scss";

import { Button, Column, Section } from "rbx";
import NotesList from "./noteList";
import { ColumnGroup } from "rbx/grid/columns/column-group";

const Sidebar = ({
  sidebar,
  setSidebar,
  notes,
  currentNote,
  selectNote,
  createNote,
  deleteNote,
}) => {
  return (
    <>
      <div
        className={`shadow ${sidebar ? "" : "transparent"}`}
        onClick={() => setSidebar(!sidebar)}
      />
      <aside className={`${sidebar ? "" : "hidden"}`}>
        <section>
          <h2>Search</h2>
        </section>
        <section>
          <NotesList
            notes={notes}
            currentNote={currentNote}
            selectNote={selectNote}
            createNote={createNote}
            deleteNote={deleteNote}
          />
        </section>
      </aside>
    </>
  );
};

export default Sidebar;
