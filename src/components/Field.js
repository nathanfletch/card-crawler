import React, { useState, useEffect } from "react";
import Char from "./Char";
import Deck from "./Deck";
import Monster from "./Monster";
import GameOver from "./GameOver";
import { useFirestore } from "react-redux-firebase";
import { draw, calcDamage } from "../utilities";
import { monsterActions, cultist } from "../game-data/monster-data";
import { allCards } from "../game-data/card-data";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../actions";

function Field() {
  const firestore = useFirestore();

  const dispatch = useDispatch();

  //useSelector is the replacement for mapStateToProps in redux with hooks (gets data out of the store)
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
  //this is the hook equivalent of componentDidMount and componentDidUpdate - run some code on mounting and rerendering.
  //first arg: callback fn to run, 2nd arg: dependency array
  //dep array: 1. don't have it - always runs every render (doesn't depend on anything) 2. put a state variable in the array [deck]: only run this callback when this state has changed, 3. empty array [] - only run on mount, never on rerender

  useEffect(() => {
    //represents start of combat code
    firestore.get({ collection: "game", doc: "1" }).then((gameData) => {
      const objectFromDb = {
        deck: gameData.get("deck"),
        player: gameData.get("player"),
      };
      //
      //action type { type: "START_COMBAT", player: objectFromDb.player}
      //
      dispatch(actions.startCombat(objectFromDb.deck, objectFromDb.player));
      setDeck(objectFromDb.deck);
      // setPlayer(objectFromDb.player);
      // setCombatDeck(
      //   draw({ hand: [], drawPile: objectFromDb.deck, discardPile: [] }, 5)
      // );
    });
  }, [firestore]);

  //handle buff eventually

  function resolveCard() {
    //action: "RESOLVE_CARD" - pass to action

    dispatch(actions.resolveCard(combatDeck, selectedCard, player, monster));
    // setCombatDeck({
    //   ...combatDeck,
    //   hand: hand.filter((card) => card.id !== selectedCard.id),
    //   discardPile: [...discardPile, selectedCard],
    // });
    // setPlayer({
    //   ...player,
    //   currentEnergy: (player.currentEnergy -= selectedCard.cost),
    //   block: selectedCard.block
    //     ? (player.block += selectedCard.block)
    //     : player.block,
    // });
    // calc here?

    // setMonster({
    //   ...monster,
    //   currentHp: calcNewMonsterHp(),
    //   debuffs: {
    //     vulnerable: selectedCard.debuffs.vulnerable
    //       ? (monster.debuffs.vulnerable += selectedCard.debuffs.vulnerable)
    //       : monster.debuffs.vulnerable,
    //     weak: selectedCard.debuffs.weak
    //       ? (monster.debuffs.weak += selectedCard.debuffs.weak)
    //       : monster.debuffs.weak,
    //   },
    // });
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

  function startNextTurn() {
    //action: NEXT_TURN
    console.log(player);
    dispatch(actions.startNextTurn(combatDeck, selectedCard, player, monster));
    setTurn(turn + 1);
    // const currentAction = monsterActions["darkStrike"];
    //display before timeout

    // setPlayer((prevPlayerState) => {
    //   const decrementedBuffs = {};
    //   Object.keys(prevPlayerState.debuffs).forEach((debuffKey) => {
    //     const prevDebuff = prevPlayerState.debuffs[debuffKey];
    //     decrementedBuffs[debuffKey] = prevDebuff ? prevDebuff - 1 : prevDebuff;
    //   });

    //   return {
    //     ...prevPlayerState,
    //     block: 0,
    //     currentEnergy: prevPlayerState.maxEnergy,
    //     debuffs: decrementedBuffs,
    //   };
    // });

    // setCombatDeck(
    //   draw(
    //     {
    //       ...combatDeck,
    //       discardPile: discardPile.concat(hand),
    //       hand: [],
    //     },
    //     5
    //   )
    // );

    // setMonster((prevMonsterState) => {
    //   const decrementedBuffs = {};
    //   Object.keys(prevMonsterState.debuffs).forEach((debuffKey) => {
    //     const prevDebuff = prevMonsterState.debuffs[debuffKey];
    //     decrementedBuffs[debuffKey] = prevDebuff ? prevDebuff - 1 : prevDebuff;
    //   });
    //   //intentDamage not always equal to actual damage even when not blocking
    //   // console.log(prevMonsterState);
    //   const intentDamage = calcDamage({ ...player, block: 0 }, currentAction, {
    //     ...monster,
    //     strength: prevMonsterState.strength + 3,
    //   });
    //   const intentMessage = `The monster will attack for ${intentDamage} damage`;
    //   return {
    //     ...prevMonsterState,
    //     block: 0,
    //     debuffs: decrementedBuffs,
    //     intent: intentMessage,
    //     strength: prevMonsterState.strength + 3,
    //   };
    // });
    setIsMonsterTurn(false);
  }
  //end turn effects - don't have cards with these yet
  //turn 0: buffs self (does nothing)
  //turn 1: increments his strength by 3,

  function endTurn() {
    //this code is like the beginning of the monster turn, but I think we need to do this before the player has th
    const dealtDamage = calcDamage(player, monster.monsterActions[1], monster);
    setIsMonsterTurn(true);
    if (!turn) {
      setActionMessage(`The monster casts incantation!`);
    } else {
      // const dealtDamage = calcDamage(player, monster.monsterAction[1], monster);
      setActionMessage(`The monster strikes you for ${dealtDamage} damage!`);
    }
    //resolve end of turn effects END_TURN"
    setTimeout(() => {
      if (turn) {
        dispatch(actions.resolveMonsterAction(monster, player, dealtDamage));
        //action: "RESOLVE_MONSTER_ACTION"
        // const calcNewPlayerHp = () => {
        //   if (monster.monsterAction[1].damage) {
        //     if (dealtDamage >= player.currentHp) {
        //       return 0;
        //     } else {
        //       return player.currentHp - dealtDamage;
        //     }
        //   } else {
        //     return player.currentHp;
        //   }
        // };
        // setPlayer({
        //   ...player,
        //   currentHp: calcNewPlayerHp(),
        // });
      }
      setActionMessage(null);
      setTimeout(() => {
        startNextTurn();
      }, 500);
    }, 500);

    //check if battle is over/enemy defeated - maybe after every damage assignment
  }
  //   //start a new combat - new monster, refactor some of the logic to be encapsulated - monster ai/buffs

  //   //if player loses: displays game over - 2 buttons - play again/menu
  // }
  function handleAcceptReward(reward) {
    switch (reward) {
      case "gold":
        dispatch(actions.acceptReward(player, deck));
        // setPlayer((prevPlayerState) => {
        //   return {
        //     ...prevPlayerState,
        //     gold: prevPlayerState.gold + 10,
        //   };
        // });
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

    // setPlayer((prevPlayerState) => {
    //   return {
    //     ...prevPlayerState,
    //     currentEnergy: prevPlayerState.maxEnergy,
    //     strength: 0,
    //     block: 0,
    //     debuffs: {
    //       vulnerable: 0,
    //       weak: 0,
    //     },
    //   };
    // });

    // setMonster(cultist);

    //reset drawpile, turn
    // setCombatDeck(draw({ drawPile: deck, hand: [], discardPile: [] }, 5));
    setTurn(0);
    console.log("saved");
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
