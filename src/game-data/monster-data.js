import { calcDamage } from "../utilities";

// export const monsterActions = {
//   darkStrike: {
//     description: "Deal 6 damage", //similar to intent
//     name: "Dark Strike",
//     type: "Attack",
//     damage: 3,
//     debuffs: {
//       vulnerable: 0,
//       weak: 0,
//     },
//   },
//   incantation: {
//     description: "Cast a buff to increase strength", //similar to intent
//     name: "Incantation",
//     type: "Buff",
//     damage: 0, // can we leave this off?
//     buffs: {
//       ritual: 3,
//     },
//     debuffs: {
//       vulnerable: 0,
//       weak: 0,
//     },
//   },
// };

function getBuffedMonsterFromAction() {
  return {
    ...this,
    buffs: {
      ...this.buffs,
      ...this.currentAction.buffs,
    },
    strength: this.strength + this.currentAction.strength,
    block: this.block + this.currentAction.block,
  };
}

function getIntentMessage(player) {
  const damage = calcDamage(player, this.currentAction, this);
  const damageMessage = damage ? `${damage} damage ` : "";
  const blockMessage = this.currentAction.block
    ? `${this.currentAction.block} block `
    : "";
  const strengthMessage = this.currentAction.strength
    ? `${this.currentAction.strength} strength `
    : "";
  const buffMessage = Object.values(this.currentAction.buffs).some(
    (value) => value > 0
  )
    ? `Powering up `
    : "";
  // const debuffMessage = Object.keys(this.currentAction.debuffs).length
  //   ? `Debuffing `
  //   : "";

  const message = damageMessage + blockMessage + strengthMessage + buffMessage;
  return message.trim();
}

export const cultist = {
  name: "Cultist",
  type: "Normal",
  currentHp: 50,
  maxHp: 50,
  strength: 0,
  block: 0,
  id: "1",
  buffs: { ritual: 0 },
  debuffs: {
    vulnerable: 0,
    weak: 0,
  },
  actions: {
    incantation: {
      description: "Powering up",
      name: "Incantation",
      type: "Buff",
      damage: 0,
      block: 0,
      strength: 0,
      buffs: {
        ritual: 3,
      },
      debuffs: {
        vulnerable: 0,
        weak: 0,
      },
    },
    darkStrike: {
      //3, similar to intent
      name: "Dark Strike",
      type: "Attack",
      strength: 0,
      block: 0,
      damage: 3,
      buffs: {},
      debuffs: {
        vulnerable: 0,
        weak: 0,
      },
    },
  },
  currentAction: null,

  getNewTurnMonster: function (turnNumber) {
    console.log(turnNumber);
    return {
      ...this,
      currentAction: turnNumber
        ? this.actions.darkStrike
        : this.actions.incantation,
      strength: this.strength + this.buffs.ritual,
    };
  },
  getBuffedMonsterFromAction: getBuffedMonsterFromAction,
  getIntentMessage,
};

// Jaw Worm	40-44	Bellow	Thrash	Chomp					Always starts with Chomp. Afterwards, has a 45-30-25 split between Bellow, Thrash and Chomp, but cannot use Thrash three times in a row or Chomp or Bellow twice in a row.

export const jawWorm = {
  name: "Jaw Worm",
  type: "Normal",
  currentHp: 42,
  maxHp: 42,
  strength: 0,
  block: 0,
  id: "2",
  debuffs: {
    vulnerable: 0,
    weak: 0,
  },
  actions: {
    chomp: {
      description: "11 damage", //similar to intent
      name: "Chomp",
      type: "Attack",
      damage: 11,
      block: 0,
      debuffs: {
        vulnerable: 0,
        weak: 0,
      },
      buffs: {},
      strength: 0,
    },
    thrash: {
      name: "Thrash",
      type: "Attack",
      damage: 7,
      block: 5,
      debuffs: {
        vulnerable: 0,
        weak: 0,
      },
      buffs: {},
      strength: 0,
    },
    bellow: {
      name: "Bellow",
      type: "Ability",
      damage: 0,
      block: 6,
      debuffs: {
        vulnerable: 0,
        weak: 0,
      },
      buffs: {},
      strength: 3,
    },
  },
  currentAction: null,
  getNewTurnMonster: function (turnNumber) {
    let random = Math.random();
    const newAction =
      random < 0.4
        ? this.actions.chomp
        : random < 0.75
        ? this.actions.thrash
        : this.actions.bellow;
    return {
      ...this,
      currentAction: newAction,
    };
  },
  getBuffedMonsterFromAction,
  getIntentMessage,
};

//hits for 0 on turn 1 - casts a spell on himself called "ritual" - gives him +3 strength every turn
// in our "start of turn logic" we have to increment his str - might be a way to automate with a function
