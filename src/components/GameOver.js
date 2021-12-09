import React, { useState } from "react";

export default function GameOver({
  player,
  success,
  monster,
  handleAcceptReward,
  handleSave,
}) {
  const [acceptedGold, setAcceptedGold] = useState(false);
  const [acceptedCard, setAcceptedCard] = useState(false);
  return (
    <div>
      {success ? (
        <div>
          <h2>You defeated {monster.name}!</h2>
          <div>
            <p>Rewards:</p>
            {acceptedGold ? null : (
              <button
                onClick={() => {
                  setAcceptedGold(true);
                  handleAcceptReward("gold");
                }}
              >
                You won some gold
              </button>
            )}

            {acceptedCard ? null : (
              <button
                onClick={() => {
                  setAcceptedCard(true);
                  handleAcceptReward("card");
                }}
              >
                You won a Bludgeon
              </button>
            )}
          </div>
          <button onClick={() => handleSave()}>Fight next monster</button>
        </div>
      ) : (
        <div>
          <h2>You lost...</h2>
          <button>New Game</button>
          <button>Back to Start</button>
        </div>
      )}
    </div>
  );
}
