import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api";
import BreadCrumb from "../BreadCrumb";

function CreateDeck() {
  const [deckName, setDeckName] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const history = useHistory();

  const handleNameChange = (event) => setDeckName(event.target.value);
  const handleDescriptionChange = (event) =>
    setDeckDescription(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    const deck = {
      name: deckName,
      description: deckDescription,
    };

    createDeck(deck, abortController.signal).then(({ id }) =>
      history.push(`/decks/${id}`)
    );
  };

  return (
    <div>
      <BreadCrumb navItems={["Create Deck"]} />
      <h2>Create Deck</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="deckName">Name</label>
          <input
            type="text"
            className="form-control"
            id="deckName"
            aria-describedby="newDeck"
            placeholder="Deck Name"
            required
            value={deckName}
            onChange={handleNameChange}
          />
          <small id="newDeck" className="form-text text-muted">
            This field is requuired
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            placeholder="Brief description of the deck"
            rows="3"
            required
            value={deckDescription}
            onChange={handleDescriptionChange}
          />
        </div>
        <button type="reset" className="btn btn-dark mr-2">
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
export default CreateDeck;
