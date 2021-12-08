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
import { draw, calcDamage } from "../utilities";
import { monsterActions, cultist } from "../game-data/monster-data";

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
  /*
  maybe group all of these up into one "piles" object to clean it up:
  {
    drawPile: [],
    hand: [],
    discard [],
    deck: arrayFromDb
  }
  */
  // const [hand, setHand] = useState(null);
  // const [drawPile, setDrawPile] = useState(null);
  // const [discardPile, setDiscardPile] = useState([]);
  //refactor: replace all sets setCombatDeck
  const [combatDeck, setCombatDeck] = useState({
    hand: [],
    drawPile: [],
    discardPile: [],
  });
  const { hand, drawPile, discardPile } = combatDeck;

  const [actionMessage, setActionMessage] = useState(null);
  const [monster, setMonster] = useState(cultist);
  const [player, setPlayer] = useState({
    maxHp: 80,
    currentHp: 80,
    maxEnergy: 3,
    strength: 0,
    block: 0,
    currentEnergy: 3,
    debuffs: {
      vulnerable: 0,
      weak: 0,
    },
  });
  const [turn, setTurn] = useState(0);
  //this is the hook equivalent of componentDidMount and componentDidUpdate - run some code on mounting and rerendering.
  //first arg: callback fn to run, 2nd arg: dependency array
  //dep array: 1. don't have it - always runs every render (doesn't depend on anything) 2. put a state variable in the array [deck]: only run this callback when this state has changed, 3. empty array [] - only run on mount, never on rerender

  useEffect(() => {
    //represents start of combat code
    firestore.get({ collection: "game", doc: "1" }).then((gameData) => {
      const objectFromDb = {
        deck: gameData.get("deck"),
      };
      setCombatDeck({ ...combatDeck, drawPile: objectFromDb.deck });
      const [handLoaded, drawPileLoaded, discardPileLoaded] = draw(
        objectFromDb.deck,
        discardPile,
        5
      );
      setCombatDeck({
        hand: handLoaded,
        drawPile: drawPileLoaded,
        discardPile: discardPileLoaded,
      });
    });
  }, [firestore]);

  //handle buff eventually

  function resolveCard() {
    setCombatDeck({
      ...combatDeck,
      hand: hand.filter((card) => card.id !== selectedCard.id),
      discardPile: [...discardPile, selectedCard],
    });
    setPlayer({
      ...player,
      currentEnergy: (player.currentEnergy -= selectedCard.cost),
      block: selectedCard.block
        ? (player.block += selectedCard.block)
        : player.block,
    });
    setMonster({
      ...monster,
      currentHp: selectedCard.damage
        ? monster.currentHp - calcDamage(monster, selectedCard, player)
        : monster.currentHp,
      debuffs: {
        vulnerable: selectedCard.debuffs.vulnerable
          ? (monster.debuffs.vulnerable += selectedCard.debuffs.vulnerable)
          : monster.debuffs.vulnerable,
        weak: selectedCard.debuffs.weak
          ? (monster.debuffs.weak += selectedCard.debuffs.weak)
          : monster.debuffs.weak,
      },
    });
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
    setTurn(turn + 1);
    const currentAction = monsterActions["darkStrike"];
    //display before timeout
    setPlayer((prevPlayerState) => {
      const decrementedBuffs = {};
      Object.keys(prevPlayerState.debuffs).forEach((debuffKey) => {
        const prevDebuff = prevPlayerState.debuffs[debuffKey];
        decrementedBuffs[debuffKey] = prevDebuff ? prevDebuff - 1 : prevDebuff;
      });

      return {
        ...prevPlayerState,
        block: 0,
        currentEnergy: prevPlayerState.maxEnergy,
        debuffs: decrementedBuffs,
      };
    });
    //draw somewhere around here
    //discard hand: figure this out, maybe use tests, handle monster/player death, refactor to use redux, maybe implement different monster
    console.log("end of turn ", turn - 1);
    console.log("hand: " + hand.length);
    console.log("discardPile: " + discardPile.length);
    const newDiscard = discardPile.concat(hand);
    console.log("newDiscard: " + newDiscard.length);
    // setCombatDeck({ ...combatDeck, discardPile: newDiscard, hand: [] });
    console.dir({ ...combatDeck });
    const [newHand, newDrawPile, newDiscardPile] = draw(
      drawPile,
      newDiscard,
      5
    );
    setCombatDeck({
      hand: newHand,
      drawPile: newDrawPile,
      discardPile: newDiscardPile,
    });
    setMonster((prevMonsterState) => {
      const decrementedBuffs = {};
      Object.keys(prevMonsterState.debuffs).forEach((debuffKey) => {
        const prevDebuff = prevMonsterState.debuffs[debuffKey];
        decrementedBuffs[debuffKey] = prevDebuff ? prevDebuff - 1 : prevDebuff;
      });
      //intentDamage not always equal to actual damage even when not blocking
      const intentDamage = calcDamage({ ...player, block: 0 }, currentAction, {
        ...monster,
        strength: (prevMonsterState.strength += 3),
      });
      const intentMessage = `The monster will attack for ${intentDamage} damage`;
      return {
        ...prevMonsterState,
        block: 0,
        debuffs: decrementedBuffs,
        intent: intentMessage,
        strength: (prevMonsterState.strength += 3),
      };
      //damage number it wants to do before any block is considered - maybe can get this with calcDamage with a copy of the player object that has the block set to 0 calcDamage({...player, block: 0}, action,
    });
  }
  //end turn effects - don't have cards with these yet
  //turn 0: buffs self (does nothing)
  //turn 1: increments his strength by 3,
  function endTurn() {
    //this code is like the beginning of the monster turn, but I think we need to do this before the player has th
    let currentAction = monsterActions["darkStrike"];
    if (!turn) {
      setActionMessage(`The monster casts incantation!`);
    } else {
      const dealtDamage = calcDamage(player, currentAction, monster);
      setActionMessage(`The monster strikes you for ${dealtDamage} damage!`);
    }
    setTimeout(() => {
      //resolve end of turn effects
      if (turn) {
        setPlayer({
          ...player,
          currentHp:
            player.currentHp - calcDamage(player, currentAction, monster),
        });
      }
      setActionMessage(null);

      //increment to next turn - reset some values - energy, decrement all buffs/debuffs by 1
      startNextTurn(currentAction);
      // setTurn(turn + 1);
      // currentAction = monsterActions["darkStrike"];
      // //display before timeout
      // setPlayer((prevPlayerState) => {
      //   const decrementedBuffs = {};
      //   Object.keys(prevPlayerState.debuffs).forEach((debuffKey) => {
      //     const prevDebuff = prevPlayerState.debuffs[debuffKey];
      //     decrementedBuffs[debuffKey] = prevDebuff
      //       ? prevDebuff - 1
      //       : prevDebuff;
      //   });

      //   return {
      //     ...prevPlayerState,
      //     block: 0,
      //     currentEnergy: prevPlayerState.maxEnergy,
      //     debuffs: decrementedBuffs,
      //   };
      // });
      // //draw somewhere around here
      // //discard hand: figure this out, maybe use tests, handle monster/player death, refactor to use redux, maybe implement different monster
      // const newDiscard = [...discardPile, ...hand];
      // setCombatDeck({...combatDeck, discardPile: newDiscard, hand: []})
      // const [newHand, newDrawPile, newDiscardPile] = draw(drawPile, discardPile, 5);
      // setCombatDeck({ hand: newHand, drawPile: newDrawPile, discardPile: newDiscardPile })
      // setMonster((prevMonsterState) => {
      //   const decrementedBuffs = {};
      //   Object.keys(prevMonsterState.debuffs).forEach((debuffKey) => {
      //     const prevDebuff = prevMonsterState.debuffs[debuffKey];
      //     decrementedBuffs[debuffKey] = prevDebuff
      //       ? prevDebuff - 1
      //       : prevDebuff;
      //   });
      //   //intentDamage not always equal to actual damage even when not blocking
      //   const intentDamage =
      //     calcDamage(
      //       { ...player, block: 0 },
      //       monsterActions["darkStrike"],
      //       { ...monster, strength: prevMonsterState.strength += 3 }
      //     );
      //   const intentMessage = `The monster will attack for ${intentDamage} damage`;
      //   return {
      //     ...prevMonsterState,
      //     block: 0,
      //     debuffs: decrementedBuffs,
      //     intent: intentMessage,
      //     strength: (prevMonsterState.strength += 3),
      //   };
      //   //damage number it wants to do before any block is considered - maybe can get this with calcDamage with a copy of the player object that has the block set to 0 calcDamage({...player, block: 0}, action,
      // });
    }, 2000);

    //check if battle is over/enemy defeated - maybe after every damage assignment
  }

  return (
    <>
      {hand && drawPile ? (
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
          <button onClick={endTurn}>End Turn</button>
          <p>Turn: {turn}</p>
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

export default Field;
