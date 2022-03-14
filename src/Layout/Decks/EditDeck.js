import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
// import DeckForm from "./DeckForm";
import BreadCrumb from "../BreadCrumb";
import { readDeck, updateDeck } from "../../utils/api/index";

function EditDeck() {
  const initialFormState = {
    name: "",
    description: "",
  };

  const [deck, setDeck] = useState({ ...initialFormState });
  const history = useHistory();
  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      try {
        const loadedDeck = await readDeck(deckId, abortController.signal);
        setDeck(loadedDeck);
      } catch (error) {
        if (error.name !== "AbortError") {
          throw error;
        }
      }
    }
    loadDeck();
    return () => abortController.abort();
  }, [deckId]);

  const handleChange = ({ target }) => {
    setDeck({
      ...deck,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    async function updateDeckData() {
      await updateDeck(deck);
      history.push(`/decks/${deck.id}`);
    }
    updateDeckData();
  };

  return (
    <div>
      <BreadCrumb navItems={[deck.name, "Edit Deck"]} />

      <h1>Edit Deck</h1>
      <br />
      {/* <DeckForm
        formData={deck}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      /> */}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="newDeck"
            placeholder="Deck Name"
            required
            value={deck.name}
            onChange={handleChange}
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
            value={deck.description}
            onChange={handleChange}
          />
        </div>
      </form>

      <Link to={`/decks/${deckId}`}>
        <button className="btn btn-secondary mr-1">Cancel</button>
      </Link>
      <button type="submit" className="btn btn-primary">
        Save
      </button>
    </div>
  );
}

export default EditDeck;
