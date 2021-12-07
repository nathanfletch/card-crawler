import React from "react";


export default function Char(props) {
  const { player } = props;
  return (
    <div className="imageDiv">
      <img
        alt="The character"
        src="https://static.wikia.nocookie.net/slay-the-spire/images/7/70/Ironclad.png"
      />
      <p style={{color: "red"}}>{player.currentHp}/{player.maxHp}</p>
    <p style={{color: "blue"}}>{player.currentEnergy}/{player.maxEnergy}</p>
    </div>
  );
}
