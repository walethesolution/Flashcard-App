import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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
      <BreadCrumb navItems={["Create Deck"]} />
      <h2>Create Deck</h2>
      <br />
      <DeckForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <br />
      <button type="reset" className="btn btn-dark mr-2">
        Cancel
      </button>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </div>
  );
};

export default CreateDeck;
