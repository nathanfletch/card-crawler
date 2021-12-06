import React, { useState } from "react";
import Start from "./Start";
import Map from "./Map";
import Battle from "./Battle";
// import { allCards } from '../game-data/card-data';

export default function GameControl() {
  //state to show different components
  const [shownComponent, setShownComponent] = useState("start");

  return (
    <>
      {shownComponent === "battle" ? (
        <Battle setShownComponent={setShownComponent} />
      ) : shownComponent === "map" ? (
        <Map setShownComponent={setShownComponent} />
      ) : (
        <Start setShownComponent={setShownComponent} />
      )}
    </>
  );
}
