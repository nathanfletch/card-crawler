import React from "react";
import PropTypes from "prop-types";

export default function Deck({
  drawPile,
  hand,
  setSelectedCard,
  selectedCard,
}) {
  const mappedHand = hand.map((card) => {
    return (
      <div
        key={card.id}
        onClick={() => setSelectedCard(card)}
        style={{
          margin: "5px",
          padding: "5px",
          border: `1px solid ${
            selectedCard && card.id === selectedCard.id ? "yellow" : "black"
          }`,
        }}
      >
        <p>Cost: {card.cost}</p>
        <p>{card.name}</p>
        <p>{card.description}</p>
      </div>
    );
  });
  return (
    <div>
      <div>Draw Pile: {drawPile.length}</div>
      <div className="row">{mappedHand}</div>
    </div>
  );
}

Deck.propTypes = {
  drawPile: PropTypes.array,
  hand: PropTypes.array,
  selectedCard: PropTypes.object,
  setSelectedCard: PropTypes.func,
};

//figure out way to stop drawing cards on click
//cards need ids
//key for map divs
