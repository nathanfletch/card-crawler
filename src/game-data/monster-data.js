export const monsterActions = {
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

export const cultist = {
  name: "Cultist",
  type: "Normal",
  currentHp: 1,
  maxHp: 1,
  strength: 0,
  block: 0,
  id: "1",
  debuffs: {
    vulnerable: 0,
    weak: 0,
  },
  intent: "Will buff with a ritual",
  monsterActions: [monsterActions.incantation, monsterActions.darkStrike]
};

//hits for 0 on turn 1 - casts a spell on himself called "ritual" - gives him +3 strength every turn
// in our "start of turn logic" we have to increment his str - might be a way to automate with a function
