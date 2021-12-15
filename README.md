# Card Crawler

by Benjamin Wilson and Nathan Fletcher

## Description

A simplified web version of the roguelike deckbuilder Slay the Spire

## Technologies Used

- React (with hooks)
- Redux
- Firebase

## How to Play

- After combat starts, look at the monster's intended action message above its' head, and plan your actions.
- Click a defend card to select it and click the battlefield to use the card to block monster damage.
- Click an attack card to select it and click the monster to use the card to damage the monster.
- Cards cost energy. Your available energy resets every turn.
- Hit end turn to pass the turn to the monster. After the monster takes an action, your next turn will start automatically.

## Game Information

- Applying vulnerable to a monster will amplify the damage you deal to it by 50%.
- Applying weak to a monster will decrease the damage it deals to you by 25%.
- Monsters can apply the same debuffs to you.

## Credits

- Slay the Spire [official website](https://www.megacrit.com/)
- Game data [reference spreadsheet](https://docs.google.com/spreadsheets/d/1ZsxNXebbELpcCi8N7FVOTNGdX_K9-BRC_LMgx4TORo4/edit#gid=1989923881)

## Known Issues

- Sometimes vulnerable carries over to the next turn.
- Please contact me if you find any bugs or have suggestions.

## Future Plans

- Add more monsters.
- Add more cards.
- Add a map.
- Add items.
- Add an item shop.
- Improve styling.

## License

_[MIT](https://opensource.org/licenses/MIT)_
