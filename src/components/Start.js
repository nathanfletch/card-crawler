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
    setShownComponent("battle"); // check here if we have a bug
    const { strike, defend, bash } = allCards;
    const newDeck = [
      strike,
      strike,
      strike,
      strike,
      strike,
      defend,
      defend,
      defend,
      defend,
      bash,
    ];
    // firestore.setValue( { collection: "deck" }, { newDeck })
    // var batch = firestore.batch();
    // newDeck.forEach((card) => {
    //   var cardRef = firestore.collection("deck").doc(); //automatically generate unique id
    //   batch.set(cardRef, card);
    // });
    // batch.commit();
    return firestore.update(
      { collection: "game", doc: "1" },
      { deck: newDeck }
    );
    //how do we access it in the future? id?
    //game: [{newDeck: [{damage:6},]}] access: game[0].newDeck
  };

  /*
  var db = firebase.firestore();
in you array add updates


*/
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
