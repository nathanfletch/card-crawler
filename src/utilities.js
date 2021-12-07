export function draw(deck, numToDraw) { //0 (inclusive) to 1, (not inclusive)
  let hand = []
  let deckCopy = [...deck]
  for (let i = 0; i < numToDraw; i++) {
    const index = Math.floor(Math.random()*(deckCopy.length)); 
    hand.push(deckCopy[index]);
    deckCopy.splice(index, 1)
  }
  return [hand, deckCopy];
}