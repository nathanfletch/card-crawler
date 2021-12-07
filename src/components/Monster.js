import React from "react";

export default function Monster({ monster, turn }) {
  return (
    <div className="imageDiv">

      <p style={{color: "blue"}}>{monster.intent[turn]}</p>
      <img
        alt="A scary monster"
        src="https://static.wikia.nocookie.net/slay-the-spire/images/c/c6/Cultist-pretty.png"
      />
      <p style={{color: "red"}}>{monster.currentHp}/{monster.maxHp}</p>
    </div>
  );
}
