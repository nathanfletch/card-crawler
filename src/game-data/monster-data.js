import { calcDamage } from "../utilities";

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
  const damageMessage = this.currentAction.damage ? `${damage} damage ` : "";
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
  url: "https://static.wikia.nocookie.net/slay-the-spire/images/c/c6/Cultist-pretty.png",
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

export const jawWorm = {
  name: "Jaw Worm",
  type: "Normal",
  url: "https://static.wikia.nocookie.net/slay-the-spire/images/d/d5/Jaw-worm-pretty.png",
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
      description: "11 damage",
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
      random < 0.45
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
