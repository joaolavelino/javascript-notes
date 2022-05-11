import React from "react";
import Moment from "moment";
import { Button, Column, Heading, List, Section, Tag, Title } from "rbx";
import "../../styles/notesList.scss";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NotesList = ({
  notes,
  currentNote,
  selectNote,
  createNote,
  deleteNote,
}) => {
  return (
    <>
      <div className="notes-header is-flex is-align-items-center is-justify-content-space-around">
        <Heading size={6}>{notes.length} notes</Heading>
        <Button
          className="button is-12 is-primary has-text-weight-bold "
          onClick={createNote}
        >
          New note
        </Button>
      </div>
      <List className="notes-list">
        {notes.map((item, key) => (
          <List.Item
            as="div"
            key={key}
            onClick={() => selectNote(item._id)}
            active={item == currentNote}
            className="notes-list-item"
          >
            <Title size={5}>
              {item.title.replace(/(<([^>]+)>)/gi, "").substring(0, 30)}
            </Title>
            <Title size={6}>
              {item.body.replace(/(<([^>]+)>)/gi, "").substring(0, 70)}...
            </Title>
            <Column.Group breakpoint="mobile">
              <Column
                size={12}
                className="is-flex is-justify-content-space-between is-align-items-center	"
              >
                <Tag color="dark">
                  {Moment(item.created_at).format("DD/MM")}
                </Tag>
                <div className="field is-grouped">
                  <p className="control">
                    <Button className="is-small is-primary has-text-weight-bold">
                      <FontAwesomeIcon icon={faPen} />
                    </Button>
                  </p>
                  <p className="control">
                    <Button
                      onClick={() => deleteNote(item)}
                      className="is-small is-danger has-text-weight-bold"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </p>
                </div>
              </Column>
            </Column.Group>
          </List.Item>
        ))}
      </List>
    </>
  );
};

export default NotesList;
