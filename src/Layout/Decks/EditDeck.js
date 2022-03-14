import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { updateDeck, readDeck } from "../../utils/api";
import BreadCrumb from "../BreadCrumb";

function EditDeck() {
  const [deckName, setDeckName] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const history = useHistory();
  const { deckId } = useParams();

  const handleNameChange = (event) => setDeckName(event.target.value);
  const handleDescriptionChange = (event) =>
    setDeckDescription(event.target.value);

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then((deck) => {
        setDeckName(deck.name);
        setDeckDescription(deck.description);
      })
      .catch(() => history.push("/NotFound"));
    return () => abortController.abort();
  }, [deckId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    const editedDeck = {
      id: deckId,
      name: deckName,
      description: deckDescription,
    };
    updateDeck(editedDeck, abortController.signal).then(({ id }) => {
      history.push(`/decks/${id}`);
    });
  };

  return (
    <div>
      <BreadCrumb navItems={[deckName, "Edit Deck"]} />
      <h2>Edit Deck</h2>

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
        <Link to={`/decks/${deckId}`} className="btn btn-dark mr-2">
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
export default EditDeck;
