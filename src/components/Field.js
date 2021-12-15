import React, { useState, useEffect } from "react";
import Char from "./Char";
import Deck from "./Deck";
import Monster from "./Monster";
import GameOver from "./GameOver";
import { useFirestore } from "react-redux-firebase";
import { allCards } from "../game-data/card-data";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../actions";

function Field() {
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const player = useSelector((state) => state.player);
  const monster = useSelector((state) => state.monster);
  const combatDeck = useSelector((state) => state.combatDeck);
  const { hand, drawPile, discardPile } = combatDeck;

  //local
  const [selectedCard, setSelectedCard] = useState(null);
  const [deck, setDeck] = useState(null);
  const [actionMessage, setActionMessage] = useState(null);
  const [isMonsterTurn, setIsMonsterTurn] = useState(false);
  const [turn, setTurn] = useState(0);

  //start of combat code
  useEffect(() => {
    firestore.get({ collection: "game", doc: "1" }).then((gameData) => {
      const objectFromDb = {
        deck: gameData.get("deck"),
        player: gameData.get("player"),
      };
      dispatch(actions.startCombat(objectFromDb.deck, objectFromDb.player));
      setDeck(objectFromDb.deck);
    });
  }, [firestore, dispatch]);

  function resolveCard() {
    dispatch(actions.resolveCard(combatDeck, selectedCard, player, monster));
    setSelectedCard(null);
  }

  function handleUntargetted() {
    if (!selectedCard || selectedCard.targetted) return;
    resolveCard();
  }

  function handleTargetCard() {
    if (!selectedCard || !selectedCard.targetted) return;
    resolveCard();
  }

  function endTurn() {
    setIsMonsterTurn(true);
    setTimeout(() => {
      dispatch(actions.resolveMonsterAction(player, monster));
      //maybe get a new turn variable, increment, then pass to turn state and dispatch to avoid update error
      console.log("incrementing turn from " + turn);
      let newTurn = turn + 1;
      setTurn(newTurn);
      setActionMessage("Starting a new turn");
      setTimeout(() => {
        dispatch(actions.startNextTurn(combatDeck, player, monster, newTurn));
        setActionMessage(null);
        setIsMonsterTurn(false);
      }, 1000);
    }, 1000);
  }

  function handleAcceptReward(reward) {
    switch (reward) {
      case "gold":
        dispatch(actions.acceptReward(player, deck));

        break;
      case "card":
        setDeck((prevDeckState) => [
          ...prevDeckState,
          { ...allCards.bludgeon, id: prevDeckState.length + 1 },
        ]);
        break;
      default:
        alert(`There was an error!`);
    }
  }

  function handleSave() {
    dispatch(actions.resetCombat(player, monster, combatDeck, deck));
    setTurn(0);
    return firestore.update(
      { collection: "game", doc: "1" },
      { player: player, deck: deck }
    );
  }

  return (
    <>
      {hand && drawPile && player ? (
        <>
          {monster.currentHp <= 0 || player.currentHp <= 0 ? (
            <GameOver
              player={player}
              success={player.currentHp > 0}
              monster={monster}
              handleAcceptReward={handleAcceptReward}
              handleSave={handleSave}
            />
          ) : (
            <>
              <div onClick={handleUntargetted} className="row">
                <Char player={player} />
                <Monster
                  turn={turn}
                  monster={monster}
                  handleTargetCard={handleTargetCard}
                  actionMessage={actionMessage}
                />
              </div>
              <Deck
                drawPile={drawPile}
                discardPile={discardPile}
                hand={hand}
                selectedCard={selectedCard}
                setSelectedCard={setSelectedCard}
                energy={player.currentEnergy}
              />{" "}
              <button onClick={endTurn} disabled={isMonsterTurn}>
                End Turn
              </button>
              <p>Turn: {turn}</p>
            </>
          )}
        </>
      ) : (
        <div>
          <p>Loading...</p>
        </div>
      )}
    </>
  );
}

export default Field;
