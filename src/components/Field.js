import React, { useState, useEffect } from "react";
import Char from "./Char";
import Deck from "./Deck";
import Monster from "./Monster";
// import { connect } from 'react-redux'
// import PropTypes from 'prop-types';
// import { allCards } from '../game-data/card-data';
// import { useSelector } from "react-redux";
//replace with the .get
import { useFirestore } from "react-redux-firebase";
import { draw } from "../utilities";
// import { cultist } from "../game-data/monster-data";

function Field() {
  //start combat - monster data, display intent - player data - hp energy
  //monster
  //player
  //select a card
  //play a card - click listener on the monster - update energy used
  //end turn - button - displays once monster and card/s are selected
  const firestore = useFirestore();

  //put everything in useState hooks - first var is the state, 2nd is the function to set it
  const [selectedCard, setSelectedCard] = useState(null);
  const [hand, setHand] = useState(null);
  const [drawPile, setDrawPile] = useState(null);
  const [deck, setDeck] = useState(null);
  const [monster, setMonster] = useState({
    name: "Cultist",
    type: "Normal",
    currentHp: 51,
    maxHp: 51,
    str: 0,
    attack: 6,
    id: "1",
    intent: ["buff", "attack"],
    // setIntent: function(turnNumber) {this.in} // buff, attack, defend, debuff - eventually have a function setIntent()
  });
  const [player, setPlayer] = useState({
    maxHp: 80,
    currentHp: 80,
    maxEnergy: 3,
    currentEnergy: 3, //update when we play a card
  });
  const [turn, setTurn] = useState(0);
  const [isMonsterTurn, setIsMonsterTurn] = useState(false);

  //this is the hook equivalent of componentDidMount and componentDidUpdate - run some code on mounting and rerendering.
  //first arg: callback fn to run, 2nd arg: dependency array
  //dep array: 1. don't have it - always runs every render (doesn't depend on anything) 2. put a state variable in the array [deck]: only run this callback when this state has changed, 3. empty array [] - only run on mount, never on rerender

  useEffect(() => {
    //represents start of combat code
    // console.log("should only run once - start combat");
    firestore.get({ collection: "game", doc: "1" }).then((gameData) => {
      //
      const objectFromDb = {
        deck: gameData.get("deck"),
      };
      // console.log(objectFromDb.deck);
      setDeck(objectFromDb.deck);
      const [handLoaded, drawPileLoaded] = draw(objectFromDb.deck, 5);
      setHand(handLoaded);
      setDrawPile(drawPileLoaded);
    });
  }, [firestore]);

  return (
    <>
      {hand && deck && drawPile ? (
        <>
          <div className="row">
            <Char player={player}/>
            <Monster turn={turn} monster={monster}/>
          </div>
          
          <Deck
            drawPile={drawPile}
            hand={hand}
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}
          />{" "}
        </>
      ) : (
        <div>
          <p>Loading...</p>
        </div>
      )}
    </>
  );

  // return (
  //
  // );
  // }
  //sort through deck
  //shuffle 5 random cards (make functions)
  //remainder of deck should be draw pile
  //add logic to play a card (up to action limit)
  //click handler on card to set selectedcard target
  //click handler on enemy to set selectedEnemy target and then resolve
  //end turn button - resolve some end turn effects -
  //enemy turn setTimeout - 2 s - animation library: anime.js, resolve their attacks/debuffs, etc
}

// handleChangingSelectedTicket = (id) => {
//   this.props.firestore
//     .get({ collection: "tickets", doc: id })
//     .then((ticket) => {
//       const firestoreTicket = {
//         names: ticket.get("names"),
//         location: ticket.get("location"),
//         issue: ticket.get("issue"),
//         id: ticket.id,
//       };
//       this.setState({ selectedTicket: firestoreTicket });
//     });
// };

export default Field;
