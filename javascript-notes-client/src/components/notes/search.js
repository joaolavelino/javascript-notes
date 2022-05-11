import { Field, Section, Title } from "rbx";
import React, { useState } from "react";
import { faSearch, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchNotes = ({ searchNote, fetchNotes }) => {
  const [query, setQuery] = useState("");

  //para procurar dando enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchNote(query);
    }
  };

  const clearSearch = () => {
    console.log("clear search");
    fetchNotes();
    setQuery("");
  };

  return (
    <>
      <div className="search-bar ">
        <Title size={5}>Search Notes</Title>
        <div className="field is-flex is-flex is-flex-direction-column">
          <p className="control">
            <input
              type="text"
              className="input"
              placeholder="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </p>
          <p className="control is-flex is-justify-content-flex-end">
            <button className="button " onClick={() => searchNote(query)}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
            <button className="button">
              <FontAwesomeIcon icon={faClose} onClick={clearSearch} />
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default SearchNotes;
