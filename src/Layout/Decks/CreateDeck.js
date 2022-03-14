import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api";
import BreadCrumb from "../BreadCrumb";
// import DeckForm from "./DeckForm";

const CreateDeck = () => {
  const history = useHistory();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleNameChange = (event) => setName(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);

  // const initialFormState = {
  //   name: "",
  //   description: "",
  // };

  // const [formData, setFormData] = useState({ ...initialFormState });

  // const handleChange = ({ target }) => {
  //   setFormData(
  //     (current) =>
  //       (current = {
  //         ...current,
  //         [target.name]: target.value,
  //       })
  //   );
  // };

  const handleSubmit = (event) => {
    const abortController = new AbortController();
    event.preventDefault();

    const formData = {
      name: name,
      description: description,
    };

    createDeck(formData, abortController.signal).then((response) =>
      history.push(`/decks/${response.id}`)
    );
  };

  return (
    <div>
      <BreadCrumb navItems={["Create Deck"]} />
      <h2>Create Deck</h2>
      <br />
      {/* <DeckForm
      // formData={formData}
      // handleChange={handleChange}
      // handleSubmit={handleSubmit}
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
            value={name}
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
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
      </form>

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
