export function draw(deck, numToDraw) {
  //0 (inclusive) to 1, (not inclusive)
  let hand = [];
  let deckCopy = [...deck];
  for (let i = 0; i < numToDraw; i++) {
    const index = Math.floor(Math.random() * deckCopy.length);
    hand.push(deckCopy[index]);
    deckCopy.splice(index, 1);
  }
  return [hand, deckCopy];
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
