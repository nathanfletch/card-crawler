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
  const [discardPile, setDiscardPile] = useState([]);
  const [deck, setDeck] = useState(null);
  const [actionMessage, setActionMessage] = useState(null);
  const [monster, setMonster] = useState({
    name: "Cultist",
    type: "Normal",
    currentHp: 51,
    maxHp: 51,
    strength: 0,
    block: 0,
    id: "1",
    debuffs: {
      vulnerable: 10,
      weak: 10,
    },
    intent: "Will buff with a ritual",
    // actionMessage: "The monster intends to buff himself", //The monster deals x damage to you
    // setIntent: function(turnNumber) {this.in} // buff, attack, defend, debuff - eventually have a function setIntent()
  });
  const [player, setPlayer] = useState({
    maxHp: 80,
    currentHp: 80,
    maxEnergy: 3,
    strength: 0,
    block: 0,
    currentEnergy: 3, //update when we play a card
    debuffs: {
      vulnerable: 10,
      weak: 10,
    },
  });
  const [turn, setTurn] = useState(0);
  //this is the hook equivalent of componentDidMount and componentDidUpdate - run some code on mounting and rerendering.
  //first arg: callback fn to run, 2nd arg: dependency array
  //dep array: 1. don't have it - always runs every render (doesn't depend on anything) 2. put a state variable in the array [deck]: only run this callback when this state has changed, 3. empty array [] - only run on mount, never on rerender

  //select card - add a check if we have energy
  //play card, updates energy, implements effect
  //end turn will proc monster action, advance turn, restore energy

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

  function resolveCard() {
    setDiscardPile([...discardPile, selectedCard]);
    setHand(hand.filter((card) => card.id !== selectedCard.id));
    //handle buff eventually
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

  function endTurn() {
    //end turn effects - don't have cards with these yet
    //take monster turn (if hp > 0) - similar to resolving a card play - might be able to share logic a bit
    //turn 0: buffs self (does nothing)
    //turn 1: increments his strength by 3,
    const monsterActions = {
      darkStrike: {
        description: "Deal 6 damage", //similar to intent
        name: "Dark Strike",
        type: "Attack",
        damage: 3,
        debuffs: {
          vulnerable: 0,
          weak: 0,
        },
      },
      incantation: {
        description: "Cast a buff to increase strength", //similar to intent
        name: "Incantation",
        type: "Buff",
        damage: 0, // can we leave this off?
        buffs: {
          ritual: 3,
        },
        debuffs: {
          vulnerable: 0,
          weak: 0,
        },
      },
    };
    let currentAction;
    if (!turn) {
      setActionMessage(`The monster casts incantation`);
    } else {
      currentAction = monsterActions["darkStrike"];
      setMonster({
        ...monster,
        strength: (monster.strength += 3),
      });
      const dealtDamage = calcDamage(player, currentAction, monster);
      setActionMessage(`The monster strikes you for ${dealtDamage}`);
    }

    setTimeout(() => {
      if (turn) {
        setPlayer({
          ...player,
          currentHp:
            player.currentHp - calcDamage(player, currentAction, monster),
        });
      }
      setActionMessage(null);

      //increment to next turn - reset some values - energy, decrement all buffs/debuffs by 1
      setTurn(turn + 1);
      setPlayer((prevPlayerState) => {
        const decrementedBuffs = {};
        Object.keys(prevPlayerState.debuffs).forEach((debuffKey) => {
          const prevDebuff = prevPlayerState.debuffs[debuffKey];
          decrementedBuffs[debuffKey] = prevDebuff
            ? prevDebuff - 1
            : prevDebuff;
        });

        return {
          ...prevPlayerState,
          block: 0,
          currentEnergy: prevPlayerState.maxEnergy,
          debuffs: decrementedBuffs,
        };
      });
      setMonster((prevMonsterState) => {
        const decrementedBuffs = {};
        Object.keys(prevMonsterState.debuffs).forEach((debuffKey) => {
          const prevDebuff = prevMonsterState.debuffs[debuffKey];
          decrementedBuffs[debuffKey] = prevDebuff
            ? prevDebuff - 1
            : prevDebuff;
        });

        const intentDamage =
          calcDamage(
            { ...player, block: 0 },
            monsterActions["darkStrike"],
            monster
          ) + 3;
        const intentMessage = `The monster will attack for ${intentDamage} damage`;
        return {
          ...prevMonsterState,
          block: 0,
          debuffs: decrementedBuffs,
          intent: intentMessage,
        };
        //damage number it wants to do before any block is considered - maybe can get this with calcDamage with a copy of the player object that has the block set to 0 calcDamage({...player, block: 0}, action,
      });
    }, 2000);

    //check if battle is over/enemy defeated - maybe after every damage assignment
  }

  return (
    <>
      {hand && deck && drawPile ? (
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
