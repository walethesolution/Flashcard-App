import React from "react";

function CardForm({ formData, handleChange, handleSubmit }) {
  return (
    <div className="form-group">
      <form onSubmit={handleSubmit}>
        <label htmlFor="front">Front </label>
        <br />
        <textarea
          id="front"
          name="front"
          className="form-control"
          value={formData.front}
          onChange={handleChange}
          placeholder="Front of Card"
          rows="4"
          required
        />
        <br />
        <label htmlFor="back">Back </label>
        <br />
        <textarea
          id="back"
          name="back"
          className="form-control"
          value={formData.back}
          onChange={handleChange}
          placeholder="Back of Card"
          rows="4"
          required
        />
      </form>
    </div>
  );
}

export default CardForm;
