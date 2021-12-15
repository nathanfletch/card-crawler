import * as c from "../actions/ActionTypes";
import { cultist, jawWorm } from "../game-data/monster-data";
import { calcDamage } from "../utilities";

export default function monsterReducer(state = {}, action) {
  const { type, monster, selectedCard, player, turn } = action;

  const calcNewMonsterHp = () => {
    const damage = calcDamage(monster, selectedCard, player);
    if (selectedCard.damage) {
      if (damage >= monster.currentHp) {
        return 0;
      } else {
        return monster.currentHp - damage;
      }
    } else {
      return monster.currentHp;
    }
  };

  switch (type) {
    case c.START_COMBAT:
    case c.RESET_COMBAT:
      console.log("starting new turn at combat start. turn number: " + 0);
      const newCombatMonster = Math.random() < 0.5 ? cultist : jawWorm;
      const newMonster = newCombatMonster.getNewTurnMonster(0);
      console.log(newMonster);

      const intentMessage = newMonster.getIntentMessage({
        ...player,
        block: 0,
      });

      return {
        ...newMonster,
        intent: intentMessage,
      };

    case c.RESOLVE_CARD:
      return {
        ...state,
        currentHp: calcNewMonsterHp(),
        debuffs: {
          vulnerable: selectedCard.debuffs.vulnerable
            ? (monster.debuffs.vulnerable += selectedCard.debuffs.vulnerable)
            : monster.debuffs.vulnerable,
          weak: selectedCard.debuffs.weak
            ? (monster.debuffs.weak += selectedCard.debuffs.weak)
            : monster.debuffs.weak,
        },
      };

    case c.RESOLVE_MONSTER_ACTION:
      return { ...state, block: 0 }.getBuffedMonsterFromAction();

    case c.START_NEXT_TURN:
      console.log("starting new turn at turn number: " + turn);
      //reset block to 0, then getNewTurn stuff
      const monsterCopy = { ...state };
      const decrementedBuffs = {};
      Object.keys(monsterCopy.debuffs).forEach((debuffKey) => {
        const prevDebuff = monsterCopy.debuffs[debuffKey];
        decrementedBuffs[debuffKey] = prevDebuff ? prevDebuff - 1 : prevDebuff;
      });
      let noBlockMonster = { ...monsterCopy, debuffs: decrementedBuffs };
      let newTurnMonster = noBlockMonster.getNewTurnMonster(turn);

      const newIntentMessage = newTurnMonster.getIntentMessage({
        ...player,
        block: 0,
      });
      return {
        ...newTurnMonster,
        intent: newIntentMessage,
      };
    default:
      return state;
  }
}
