import React from "react";
import { Link } from "react-router-dom";
import DeckList from "./DeckList";

function Home() {
  return (
    <div>
      <div>
        <Link to="/decks/new">
          <button className="btn btn-primary mb-2 btn-large">
            <i className="bi bi-plus"></i>Create Deck
          </button>
        </Link>
      </div>
      <DeckList />
    </div>
  );
}

export default Home;
