import React from "react";
//set player with gold, deck with a card, save to db
export default function GameOver({ player, success, monster, handleAcceptReward,handleSave }) {
  return (
    <div>
      {success ? (
        <div>
          <h2>You defeated {monster.name}!</h2>
          <div>
            <p>Rewards:</p>
            <button onClick={handleAcceptReward('gold')}>You won a card</button>
          
            <button onClick={handleAcceptReward('card')}>You won a card</button>
          </div>
          <button onClick={handleSave()}>Fight next monster</button>
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
