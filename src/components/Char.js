import React from "react";
// import anime from 'animejs/lib/anime.es.js';

export default function Char(props) {
  const { player } = props;
  const debuffsString = Object.keys(player.debuffs).map((debuffKey) => {
    if (player.debuffs[debuffKey]) {
      return `${debuffKey}: ${player.debuffs[debuffKey]} `;
    } else return "";
  });

  return (
    <div className="imageDiv">
      <img
        alt="The character"
        src="https://static.wikia.nocookie.net/slay-the-spire/images/7/70/Ironclad.png"
      />
      <p style={{color: "yellow"}}>Block: {player.block}</p>
      <p style={{color: "red"}}>HP: {player.currentHp}/{player.maxHp}</p>
    <p style={{ color: "green" }}>{debuffsString}</p>
    <p style={{color: "blue"}}>Energy: {player.currentEnergy}/{player.maxEnergy}</p>
    </div>
  );
}
