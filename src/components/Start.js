import React from "react";
import PropTypes from "prop-types";
import { allCards } from "../game-data/card-data";
import { useFirestore } from "react-redux-firebase";
/*
return firestore.collection("tickets").add({
      names: event.target.names.value,
      location: event.target.location.value,
      issue: event.target.issue.value,
      timeOpen: firestore.FieldValue.serverTimestamp(),
    });
*/

export default function Start({ setShownComponent }) {
  const firestore = useFirestore();
  const createGame = () => {
    // setShownComponent("battle"); // check here if we have a bug
    const { strike } = allCards;
    console.log(firestore);
    // const deck = [
    //   "strike",
    //   "strike",
    //   "strike",
    //   "strike",
    //   "strike",
    //   "block",
    //   "block",
    //   "block",
    //   "block",
    //   "bash",
    // ];
    return firestore.collection("deck").add(strike);
  };

  return (
    <div>
      <p>Start Window</p>
      <button onClick={createGame}>Start Battle</button>
      <button onClick={() => setShownComponent("map")}>View Map</button>
    </div>
  );
}

Start.propTypes = {
  setShownComponent: PropTypes.func,
};
