export function draw(deck, discardPile, numToDraw) {
  //0 (inclusive) to 1, (not inclusive)
  let hand = [];
  let deckCopy = [...deck];
  let discardCopy = [...discardPile];

  for (let i = 0; i < numToDraw; i++) {
    console.log(
      `hand: ${hand.length}, deckCopy: ${deckCopy.length}, discardCopy: ${discardCopy.length}`
    );
    if (!deckCopy.length) {
      deckCopy = discardCopy;
      discardCopy = [];
      console.log("reshuffled!", discardCopy);
    }
    const index = Math.floor(Math.random() * deckCopy.length);
    hand.push(deckCopy[index]);
    deckCopy.splice(index, 1);

    //set the discard pile to the new deck - shuffle
    //draw a card from it
  }
  return [hand, deckCopy, discardCopy];
}
export function calcDamage(target, card, attacker) {
  // console.log(target, card, attacker);
  const scaledAttack = Math.floor(
    (card.damage + attacker.strength) * (attacker.debuffs.weak ? 0.75 : 1)
  );
  // console.log(scaledAttack);
  const mitigatedDamage =
    Math.floor(scaledAttack * (target.debuffs.vulnerable ? 1.5 : 1)) -
    target.block;
  // console.log(mitigatedDamage);
  return mitigatedDamage;
}
