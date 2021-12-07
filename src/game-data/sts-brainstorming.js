/*
manage combat with redux store state or local state
at the end of combat, make 1 write to update the database

add ids to newDeck cards before putting in firestore
*/


// import allCards from './card-data';
// const {strike, block, bash} = allCards
// const deck = [strike, strike, strike, strike, strike, block, block, block, block, bash]

//pass this as an initial value somewhere to firebase

//start game - push some stuff 
//when you play a card: applies damage (may be null), block, buffs, debuffs, check if exhausted/discard

/* project todos
setup React project 
  component layout - done
setup Redux
  install, add 
  createStore index.js

setup Firebase
  install
  project creation in console
  imports
  firebase.js
  .env
  setting up hooks
  config in index.js
  need some state - deck

basic ui: RPGUI

combat: 

map:



*/

/* static data
map - how to connect "path"
node: {
  type: monster | boss | shop | event | fire | elite
  currentMonster: monsterId,
  combat: {},
  lower: {
    node1: null,
    node2: null,
  },
  upper: {
    node1: id?
  },
}
starting and possible cards
possible monsters

*/

/*state
game:
floor number - current monster
deck: []

combat: {
  turnNumber: 0,
  currentMonster: null,
  monsterTurn: false,
}
player: {
  hand: [],
  discard,
  exhaust
  maxHp:
  currentHp:
  relics: []
  gold: 0,
  potions: []
  debuffs: {

  },
  powers: {

  },
}
*/
