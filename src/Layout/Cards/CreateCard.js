import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CardForm from "./CardForm";
import BreadCrumb from "../BreadCrumb";
import { readDeck, createCard } from "../../utils/api/index";
import NotFound from "../NotFound";

function CreateCard() {
  const { deckId } = useParams();

  const initialFormState = {
    front: "",
    back: "",
  };

  const [deck, setDeck] = useState({});
  const [formData, setFormData] = useState({ ...initialFormState });

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then(setDeck)
      .catch((e) => {
        return <NotFound />;
      });
    return () => abortController.abort();
  }, [deckId]);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    async function cardCreate() {
      try {
        await createCard(deckId, formData);
        setFormData({ ...initialFormState });
      } catch (error) {
        if (error.name !== "AbortError") {
          throw error;
        }
      }
    }
    cardCreate();
  };

  return (
    <div>
      <BreadCrumb navItems={[deck.name, "Add Card"]} />
      <div className="row">
        <h2>{deck.name}: Add Card</h2>
        <br />
      </div>
      <CardForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <br />
      <div className="row">
        <Link
          to={`/decks/${deckId}`}
          className="form-button btn btn-lg btn-secondary mr-2"
        >
          Done
        </Link>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default CreateCard;
