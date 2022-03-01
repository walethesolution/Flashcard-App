import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api";
import BreadCrumb from "../BreadCrumb";
import DeckForm from "./DeckForm";

const CreateDeck = () => {
  const history = useHistory();

  const initialFormState = {
    name: "",
    description: "",
  };

  const [formData, setFormData] = useState({ ...initialFormState });

  const handleChange = ({ target }) => {
    setFormData(
      (current) =>
        (current = {
          ...current,
          [target.name]: target.value,
        })
    );
  };

  const handleSubmit = (event) => {
    const abortController = new AbortController();
    event.preventDefault();

    createDeck(formData, abortController.signal).then((response) =>
      history.push(`/decks/${response.id}`)
    );
  };

  return (
    <div>
      <BreadCrumb url={"/decks/new"} pageName={"Create Deck"} />
      <h1>Create Deck</h1>
      <br />
      <DeckForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <br />
      <Link to="/" className="btn btn-secondary">
        Cancel
      </Link>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </div>
  );
};

export default CreateDeck;
