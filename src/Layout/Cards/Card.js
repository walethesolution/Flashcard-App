import React from "react";
import { useRouteMatch } from "react-router-dom";
import { Link } from "react-router-dom";

function Card({ card, handleCardDelete }) {
  const { url } = useRouteMatch();

  return (
    <div className="row border border-secondary">
      <div className="col col-6">
        <p>{card.front}</p>
      </div>
      <div className="col col-6">
        <p>{card.back}</p>
        <section className="d-flex justify-content-end mb-2">
          <Link
            to={`${url}/cards/${card.id}/edit`}
            className="btn btn-secondary mr-2"
          >
            <span className="oi oi-pencil"></span> Edit
          </Link>
          <button
            className="btn btn-danger float-right"
            onClick={handleCardDelete}
          >
            <span className="oi oi-trash"></span>
          </button>
        </section>
      </div>
    </div>
  );
}

export default Card;
