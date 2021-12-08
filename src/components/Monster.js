import React from "react";

export default function Monster({ monster, turn, handleTargetCard, actionMessage }) {
  const debuffsString = Object.keys(monster.debuffs).map((debuffKey) => {
    if (monster.debuffs[debuffKey]) {
      return `${debuffKey}: ${monster.debuffs[debuffKey]} `;
    } else return "";
  });
  

  return (
    <div className="imageDiv">
      <p style={{ color: "blue" }}>{monster.intent}</p>
      <img
        onClick={handleTargetCard}
        alt="A scary monster"
        src="https://static.wikia.nocookie.net/slay-the-spire/images/c/c6/Cultist-pretty.png"
      />
      <p style={{ color: "yellow" }}>Block: {monster.block}</p>
      <p style={{ color: "red" }}>
        HP: {monster.currentHp}/{monster.maxHp}
      </p>
      <p style={{ color: "green" }}>{debuffsString}</p>
      {actionMessage ? <p>{actionMessage}</p>: null}
    </div>
  );
}
