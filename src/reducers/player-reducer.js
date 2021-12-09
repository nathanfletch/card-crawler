import * as c from "../actions/ActionTypes";
import { calcDamage } from "../utilities";

export default function playerReducer(state = {}, action) {
  const { type, selectedCard, player, monster } = action;

  switch (type) {
    case c.START_COMBAT:
      return player;

    case c.RESOLVE_CARD:
      return {
        ...state,
        currentEnergy: state.currentEnergy - selectedCard.cost,
        block: selectedCard.block
          ? state.block + selectedCard.block
          : state.block,
      };

    case c.RESOLVE_MONSTER_ACTION:
      let newHp;
      if (monster.currentAction.damage) {
        const dealtDamage = calcDamage(state, monster.currentAction, monster);
        if (dealtDamage >= state.currentHp) {
          newHp = 0;
        } else {
          newHp = state.currentHp - dealtDamage;
        }
      } else {
        newHp = state.currentHp;
      }
      return {
        ...state,
        currentHp: newHp,
      };

    case c.START_NEXT_TURN:
      const decrementedBuffs = {};
      Object.keys(state.debuffs).forEach((debuffKey) => {
        const prevDebuff = state.debuffs[debuffKey];
        decrementedBuffs[debuffKey] = prevDebuff ? prevDebuff - 1 : prevDebuff;
      });
      return {
        ...state,
        block: 0,
        currentEnergy: state.maxEnergy,
        debuffs: decrementedBuffs,
      };

    case c.ACCEPT_REWARD:
      return { ...state, gold: state.gold + 10 };

    case c.RESET_COMBAT:
      return {
        ...state,
        currentEnergy: state.maxEnergy,
        strength: 0,
        block: 0,
        debuffs: {
          vulnerable: 0,
          weak: 0,
        },
      };

    default:
      return state;
  }
}
