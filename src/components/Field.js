import React, { useState } from "react";
import Char from "./Char";
import Deck from "./Deck";
import Monster from "./Monster";
// import { connect } from 'react-redux'
// import PropTypes from 'prop-types';
// import { allCards } from '../game-data/card-data';
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { draw } from "../utilities";

function Field() {
  useFirestoreConnect([{ collection: "game" }]);
  const game = useSelector((state) => state.firestore.ordered.game);
  const [selectedCard, setSelectedCard] = useState(null);

  if (isLoaded(game)) {
    //start combat logic: lifec
    const deck = game[0].deck;
    const [hand, drawPile] = draw(deck, 5);
    console.log(hand, drawPile);
    //draw a hand, show the hand
    return (
      <>
        <div>
          <Char />
          <Monster />
        </div>
        <Deck
          drawPile={drawPile}
          hand={hand}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
        />
      </>
    );
  } else {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
  //sort through deck
  //shuffle 5 random cards (make functions)
  //remainder of deck should be draw pile
  //add logic to play a card (up to action limit)
  //click handler on card to set selectedcard target
  //click handler on enemy to set selectedEnemy target and then resolve
  //end turn button - resolve some end turn effects -
  //enemy turn setTimeout - 2 s - animation library: anime.js, resolve their attacks/debuffs, etc
}

export default Field;
