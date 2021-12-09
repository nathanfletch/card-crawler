import { cultist } from "../game-data/monster-data";

describe("cultist", () => {
  test("getNewTurnMonster sets turn 0 action to incantation", () => {
    const newMonster = cultist.getNewTurnMonster(0);

    expect(newMonster.currentAction.name).toEqual("Incantation");
  });
  test("getNewTurnMonster sets turn 1 action to dark strike", () => {
    const newMonster = cultist.getNewTurnMonster(1);

    expect(newMonster.currentAction.name).toEqual("Dark Strike");
  });
  test("getBuffedMonsterFromAction applies ritual", () => {
    const newMonster = cultist.getNewTurnMonster(0);
    const buffedMonster = newMonster.getBuffedMonsterFromAction();
    console.log(buffedMonster.buffs);

    expect(buffedMonster.buffs.ritual).toEqual(3);
  });
  test("getBuffedMonsterFromAction increases strength", () => {
    const turn0Monster = cultist.getNewTurnMonster(0);
    const buffed0Monster = turn0Monster.getBuffedMonsterFromAction();
    const turn1Monster = buffed0Monster.getNewTurnMonster(1);
    const buffed1Monster = turn1Monster.getBuffedMonsterFromAction();
    console.log(buffed1Monster.buffs);
    expect(buffed1Monster.strength).toEqual(3);
  });
});
