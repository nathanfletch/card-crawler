import * as c from "../actions/ActionTypes";

export default function playerReducer(state = {}, action) {
  const { type, selectedCard, player, dealtDamage, monster } = action;

  const calcNewPlayerHp = () => {
    if (monster.monsterActions[1].damage) {
      if (dealtDamage >= player.currentHp) {
        return 0;
      } else {
        return player.currentHp - dealtDamage;
      }
    } else {
      return player.currentHp;
    }
  };

  switch (type) {
    case c.START_COMBAT:
      return player;

    case c.RESOLVE_CARD:
      return {
        ...state,
        currentEnergy: player.currentEnergy - selectedCard.cost,
        block: selectedCard.block
          ? player.block + selectedCard.block
          : player.block,
      };

    case c.RESOLVE_MONSTER_ACTION:
      return {
        ...state,
        currentHp: calcNewPlayerHp(),
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
