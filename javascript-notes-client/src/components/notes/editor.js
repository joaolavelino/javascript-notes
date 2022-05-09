import { Column, Control, Field, Input, Label, Section, Textarea } from "rbx";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css"; // ES6

const Editor = ({ currentNote, updateNote }) => {
  const [currentContent, setCurrentContent] = useState({ title: "", body: "" });
  const [timer, setTimer] = useState(null);

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
      setCurrentContent(content);
      setTimer(
        setTimeout(() => {
          console.log("saving");
          completeUpdateMethod(content);
        }, 3000)
      );
    }
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
      <ReactQuill
        theme="snow"
        value={currentContent}
        modules={modules}
        onChange={handleChange}
      />
    </>

    // <Section>
    //   <Column size={12}>
    //     <Field>
    //       <Label size="small">Title</Label>
    //       <Control>
    //         <Input
    //           type="text"
    //           name="title"
    //           value={currentContent.title}
    //           onChange={handleChange}
    //         />
    //       </Control>
    //     </Field>
    //     <Field>
    //       <Label size="small">Content</Label>
    //       <Control>
    //         <Textarea
    //           name="body"
    //           value={currentContent.body}
    //           onChange={handleChange}
    //         />
    //       </Control>
    //     </Field>
    //   </Column>
    // </Section>
  );
};

export default Editor;
