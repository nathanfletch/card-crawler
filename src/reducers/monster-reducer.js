import * as c from "../actions/ActionTypes";
import { cultist } from "../game-data/monster-data";
import { calcDamage } from "../utilities";

export default function monsterReducer(state = {}, action) {
  const { type, monster, selectedCard, player } = action;

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
      return cultist;

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

    case c.START_NEXT_TURN:
      const decrementedBuffs = {};
      Object.keys(state.debuffs).forEach((debuffKey) => {
        const prevDebuff = state.debuffs[debuffKey];
        decrementedBuffs[debuffKey] = prevDebuff ? prevDebuff - 1 : prevDebuff;
      });
      const intentDamage = calcDamage(
        { ...player, block: 0 },
        state.monsterActions[1],
        {
          ...state,
          strength: state.strength + 3,
        }
      );
      const intentMessage = `The monster will attack for ${intentDamage} damage`;
      return {
        ...state,
        block: 0,
        debuffs: decrementedBuffs,
        intent: intentMessage,
        strength: state.strength + 3,
      };
    default:
      return state;
  }
}
