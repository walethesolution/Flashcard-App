import React from "react";
import { Link } from "react-router-dom";
import DeckList from "./DeckList";

function Home() {
  return (
    <div>
      <div>
        <Link to={`/decks/new`} type="button" className="btn btn-lg btn-dark">
          <span className="oi oi-plus"></span> Create Deck
        </Link>
      </div>
      <DeckList />
    </div>
  );
}

export default Home;
