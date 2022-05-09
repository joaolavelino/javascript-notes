import React, { useState } from "react";
import HeaderLogged from "../../../components/header_logged";
import Notes from "../../../components/notes";

const NotesScreen = () => {
  const [sidebar, setSidebar] = useState(true);

  return (
    <>
      <HeaderLogged sidebar={sidebar} setSidebar={setSidebar} />
      <Notes sidebar={sidebar} setSidebar={setSidebar} />
    </>
  );
};
export default NotesScreen;
