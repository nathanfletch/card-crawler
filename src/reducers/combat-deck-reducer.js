import * as c from "../actions/ActionTypes";
import { draw } from "../utilities";

export default function combatDeckReducer(state = {}, action) {
  const { selectedCard, type, deck } = action;
  switch (type) {
    case c.START_COMBAT:
    case c.RESET_COMBAT:
      return draw({ hand: [], drawPile: deck, discardPile: [] }, 5);

    case c.RESOLVE_CARD:
      return {
        ...state,
        hand: state.hand.filter((card) => card.id !== selectedCard.id),
        discardPile: [...state.discardPile, selectedCard],
      };

    case c.START_NEXT_TURN:
      return draw(
        {
          ...state,
          discardPile: state.discardPile.concat(state.hand),
          hand: [],
        },
        5
      );
    // case :
    default:
      return state;
  }
}
