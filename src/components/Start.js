import React from "react";
import PropTypes from "prop-types";
import { newDeck } from "../game-data/card-data";
import { newPlayer } from "../game-data/player-data";
import { useFirestore } from "react-redux-firebase";

export default function Start({ setShownComponent }) {
  const firestore = useFirestore();
  const createGame = () => {
    setShownComponent("battle");
    return firestore.update(
      { collection: "game", doc: "1" },
      { player: newPlayer, deck: newDeck }
    );
  };

  return (
    <div>
      <p>Start Window</p>
      <button onClick={createGame}>Start New Game</button>
      <button onClick={() => setShownComponent("map")}>View Map</button>
    </div>
  );
}

Start.propTypes = {
  setShownComponent: PropTypes.func,
};
