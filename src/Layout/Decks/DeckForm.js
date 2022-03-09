import React from "react";

function DeckForm({ formData, handleChange, handleSubmit }) {
  return (
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
          value={formData.name}
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
          value={formData.description}
          onChange={handleChange}
        />
      </div>
    </form>
  );
}

export default DeckForm;
