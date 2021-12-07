export const cultist = {
  name: "Cultist",
  type: "Normal",
  currentHp: 51,
  maxHp: 51,
  str: 0,
  attack: 6,
  id: "1",
  // startTurnFunction: this.str += 3;
};
//hits for 0 on turn 1 - casts a spell on himself called "ritual" - gives him +3 strength every turn
// in our "start of turn logic" we have to increment his str - might be a way to automate with a function
