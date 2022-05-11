import { isDisabled } from "@testing-library/user-event/dist/utils";
import {
  Button,
  Column,
  Control,
  Field,
  Input,
  Label,
  Section,
  Textarea,
} from "rbx";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css"; // ES6

const Editor = ({ currentNote, updateNote, updateNoteDirectSave }) => {
  const [currentContent, setCurrentContent] = useState();
  const [timer, setTimer] = useState(null);
  const [saveButton, setSaveButton] = useState(false);

  useEffect(() => {
    setCurrentContent(`${currentNote.body}`);
  }, [currentNote]);

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
    ],
  };

  //content é o conteudo no editor, o source é quem fez a ediçao.
  const handleChange = (content, delta, source) => {
    clearTimeout(timer);
    if (source == "user") {
      setSaveButton(true);
      setCurrentContent(content);
      setTimer(
        setTimeout(() => {
          console.log("saving");
          completeUpdateMethod(content);
        }, 5000)
      );
    }
  };

  const handleSave = () => {
    const title = currentContent.replace(/(<([^>]+)>)/gi, "").slice(0, 30);
    updateNoteDirectSave(currentNote, {
      title: title,
      body: currentContent,
    });
    setSaveButton(false);
  };

  const completeUpdateMethod = (content) => {
    const title = content.replace(/(<([^>]+)>)/gi, "").slice(0, 30);
    //bring that method that we created on the notes file
    updateNote(currentNote, {
      title: title,
      body: content,
    });
  };

  return (
    <>
      <ReactQuill theme="snow" value={currentContent} onChange={handleChange} />
      <Section>
        <Button
          className="button is-success has-text-weight-bold"
          disabled={!saveButton}
          onClick={handleSave}
        >
          Save
        </Button>
      </Section>
    </>
  );
};

export default Editor;
