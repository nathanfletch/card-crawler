export const allCards = {
  bash: {
    name: "Bash",
    type: "Attack",
    rarity: "Basic",
    cost: 2,
    debuff: {
      duration: 2,
      type: "Vulnerable",
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
    rarity: "Basic",
    cost: 1,
    upgraded: false,
    damage: 6,
  },
  defend: {
    description: "Block 5 damage",
    name: "Defend",
    type: "Ability",
    rarity: "Basic",
    cost: 1,
    upgraded: false,
    block: 5,
  },
};
