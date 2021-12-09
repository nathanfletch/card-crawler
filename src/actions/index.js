import * as c from "./ActionTypes";
export const startCombat = (deck, player) => ({
  type: c.START_COMBAT,
  deck,
  player,
});

export const resolveCard = (combatDeck, selectedCard, player, monster) => ({
  type: c.RESOLVE_CARD,
  combatDeck,
  selectedCard,
  player,
  monster,
});

export const resolveMonsterAction = (player, monster) => ({
  type: c.RESOLVE_MONSTER_ACTION,
  player,
  monster,
});

export const startNextTurn = (combatDeck, player, monster, turn) => ({
  type: c.START_NEXT_TURN,
  combatDeck,
  player,
  monster,
  turn
});

export const acceptReward = (reward, player, deck) => ({
  type: c.ACCEPT_REWARD,
  reward,
  player,
  deck,
});

export const resetCombat = (player, monster, combatDeck, deck) => ({
  type: c.RESET_COMBAT,
  player,
  monster,
  combatDeck,
  deck,
});
