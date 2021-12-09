// import playerReducer from "../../reducers/player-reducer"
// import { draw } from "../../utilities"
// import * as c from "./../../actions/ActionTypes";
// import { cultist } from "../../game-data/monster-data";

// // export const resolveMonsterAction = (player, dealtDamage, monster) => ({
// //   type: c.RESOLVE_MONSTER_ACTION,
// //   player,
// //   dealtDamage,
// //   monster,
// // });
// describe("playerReducer", () => {
  
//   test("should reshuffle discard pile and draw 5", () => {
//     const piles = {
//       discardPile: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
//       hand: [],
//       drawPile: [],
//     };
//     const { hand, drawPile, discardPile } = draw(piles, 5);
//     // console.log(expectedHand)
//     expect(hand.length).toEqual(5);
//     expect(drawPile.length).toEqual(5);
//     expect(discardPile.length).toEqual(0);
//   });
//   // test("should equal one of the previous elements in the draw pile", () => {
//   //   const discardPile = ["f"];
//   //   // const hand = ["g", "h", "i", "j"];
//   //   const drawPile = ["a", "b", "c", "d", "e"];
//   //   const [expectedHand, expectedDrawpile, expectedDiscardPile] = draw(
//   //     drawPile,
//   //     discardPile,
//   //     1
//   //   );
//   //   expect(expectedHand[0] === "a" || expectedHand[0] === "b" || expectedHand[0] === "c" || expectedHand[0] === "d" || expectedHand[0] === "e").toBeTruthy();
//   //   // expect(expectedDrawpile.length).toEqual(4);
//   //   // expect(expectedDiscardPile.length).toEqual(0);
//   // });

//   // test("Should successfully add new ticket data to mainTicketList", () => {
//   //   const { names, location, issue, id } = ticketData;
//   //   action = {
//   //     type: c.ADD_TICKET,
//   //     names: names,
//   //     location: location,
//   //     issue: issue,
//   //     id: id,
//   //   };
//   //   expect(ticketListReducer({}, action)).toEqual({
//   //     [id]: {
//   //       names: names,
//   //       location: location,
//   //       issue: issue,
//   //       id: id,
//   //     },
//   //   });
//   // });
// });
