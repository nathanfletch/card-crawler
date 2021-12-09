import React from "react";
import PropTypes from "prop-types";

export default function Deck({
  drawPile,
  discardPile,
  hand,
  setSelectedCard,
  selectedCard,
  energy,
}) {
  function handleSelect(card) {
    if (energy >= card.cost) {
      setSelectedCard(card);
    } else {
      alert("not enough energy!");
    }
  }
  const mappedHand = hand.map((card) => {
    return (
      <div
        key={card.id}
        onClick={() => handleSelect(card)}
        style={{
          margin: "5px",
          padding: "5px",
          border: `1px solid ${
            selectedCard && card.id === selectedCard.id ? "yellow" : "black"
          }`,
          borderRadius: "10px",
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
      <div>Discard Pile: {discardPile.length}</div>
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
