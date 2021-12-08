// export function draw(deck, discardPile, numToDraw) {
//   let hand = [];
//   let deckCopy = [...deck];
//   let discardCopy = [...discardPile];
//   for (let i = 0; i < numToDraw; i++) {
//     console.log(
//       `hand: ${hand.length}, deckCopy: ${deckCopy.length}, discardCopy: ${discardCopy.length}`
//     );
//     if (!deckCopy.length) {
//       deckCopy = discardCopy;
//       discardCopy = [];
//       console.log("reshuffled!", discardCopy);
//     }
//     const index = Math.floor(Math.random() * deckCopy.length);
//     hand.push(deckCopy[index]);
//     deckCopy.splice(index, 1);
//   }
//   return [hand, deckCopy, discardCopy];
// }
export function draw({ hand, drawPile, discardPile }, numToDraw) {
  let handCopy = [...hand];
  let drawCopy = [...drawPile];
  let discardCopy = [...discardPile];
  for (let i = 0; i < numToDraw; i++) {
    if (!drawCopy.length) {
      drawCopy = discardCopy;
      discardCopy = [];
      console.log("reshuffled!", discardCopy);
    }
    const index = Math.floor(Math.random() * drawCopy.length);
    handCopy.push(drawCopy[index]);
    drawCopy.splice(index, 1);
  }
  // console.log(
  //   `hand: ${handCopy.length}, drawCopy: ${drawCopy.length}, discardCopy: ${discardCopy.length}`
  // );
  return { hand: handCopy, drawPile: drawCopy, discardPile: discardCopy };
}

export function calcDamage(target, card, attacker) {
  const scaledAttack = Math.floor(
    (card.damage + attacker.strength) * (attacker.debuffs.weak ? 0.75 : 1)
  );
  const mitigatedDamage =
    Math.floor(scaledAttack * (target.debuffs.vulnerable ? 1.5 : 1)) -
    target.block;
  return mitigatedDamage;
}
