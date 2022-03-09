import React, { useState, useEffect } from "react";
// import { useRouteMatch } from "react-router-dom";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, deleteDeck } from "../../utils/api/index";
import BreadCrumb from "../BreadCrumb";
import CardList from "../Cards/CardList";

function Deck() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  // const { url } = useRouteMatch;

  //load deck & cards

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then(setDeck)
      .catch((e) => console.log(e.message));
    return () => abortController.abort();
  }, [deckId]);

  //delete the deck
  const handleDeckDelete = async () => {
    const confirm = window.confirm(
      "Delete this deck? You will not be able to recover it."
    );
    if (confirm) {
      await deleteDeck(deckId);
      history.push("/");
    }
  };

  if (deck.id) {
    // console.log(deckId);
    // console.log(url);
    return (
      <div>
        <div className="mb-5">
          <BreadCrumb navItems={[deck.name]} />
          <h3>{deck.name}</h3>
          <p>{deck.description}</p>
          <Link
            to={`${deckId}/edit`}
            type="button"
            className="btn btn-secondary  mr-2"
          >
            <span className="oi oi-pencil"></span> Edit
          </Link>
          <Link to={`${deckId}/study`} className="btn btn-primary  mr-2">
            <span className="oi oi-book"></span> Study
          </Link>
          <Link
            to={`${deckId}/cards/new`}
            type="button"
            className="btn btn-primary  mr-2"
          >
            <span className="oi oi-plus"></span> Add Cards
          </Link>
          <button
            type="button"
            onClick={handleDeckDelete}
            className="btn btn-danger  mr-2 float-right"
          >
            <span className="oi oi-trash "></span>
          </button>
        </div>
        <div>
          <CardList cards={deck.cards} />
        </div>
      </div>
    );
  }
  return "No deck here! Please create a new deck.";
}

export default Deck;
