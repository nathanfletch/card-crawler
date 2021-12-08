export const allCards = {
  bash: {
    name: "Bash",
    type: "Attack",
    targetted: true,
    rarity: "Basic",
    cost: 2,
    debuffs: {
      vulnerable: 2,
      weak: 0,
    },
    upgraded: false,
    description: "Apply 2 Vulnerable",
    damage: 8,
    block: 0,
  },
  strike: {
    description: "Deal 6 damage",
    name: "Strike",
    type: "Attack",
    targetted: true,
    rarity: "Basic",
    cost: 1,
    upgraded: false,
    damage: 6,
    debuffs: {
      vulnerable: 0,
      weak: 0,
    },
  },
  bludgeon: {
    description: "Deal 32 damage",
    name: "Bludgeon",
    type: "Attack",
    targetted: true,
    rarity: "Rare",
    cost: 3,
    upgraded: false,
    damage: 32,
    debuffs: {
      vulnerable: 0,
      weak: 0,
    },
  },
  defend: {
    description: "Block 5 damage",
    name: "Defend",
    type: "Ability",
    targetted: false,
    rarity: "Basic",
    cost: 1,
    upgraded: false,
    block: 5,
    debuffs: {
      vulnerable: 0,
      weak: 0,
    },
  },
};
const { strike, defend, bash } = allCards;

export const newDeck = [
  { ...strike, id: 1 },
  { ...strike, id: 2 },
  { ...strike, id: 3 },
  { ...strike, id: 4 },
  { ...strike, id: 5 },
  { ...defend, id: 6 },
  { ...defend, id: 7 },
  { ...defend, id: 8 },
  { ...defend, id: 9 },
  { ...bash, id: 10 },
  //move stuff here, give ids
];
