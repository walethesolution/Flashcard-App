import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./Header";
import Home from "./Decks/Home";
import CreateDeck from "./Decks/CreateDeck";
import NotFound from "./NotFound";
import CreateCard from "./Cards/CreateCard";
import EditCard from "./Cards/EditCard";
import Deck from "./Decks/Deck";
import EditDeck from "./Decks/EditDeck";
import StudyDeck from "./Decks/StudyDeck";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/decks/new">
            <CreateDeck />
          </Route>

          <Route path="/decks/:deckId/cards/new">
            <CreateCard />
          </Route>

          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>

          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>

          <Route path="/decks/:deckId/study">
            <StudyDeck />
          </Route>

          <Route path="/decks/:deckId">
            <Deck />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
