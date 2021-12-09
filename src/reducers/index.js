import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import playerReducer from "./player-reducer";
import monsterReducer from "./monster-reducer";
import combatDeckReducer from "./combat-deck-reducer";

const rootReducer = combineReducers({
  firestore: firestoreReducer,
  player: playerReducer,
  monster: monsterReducer,
  combatDeck: combatDeckReducer,
});

export default rootReducer;
