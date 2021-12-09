import React, { useState } from "react";
import Start from "./Start";
import Map from "./Map";
import Battle from "./Battle";

export default function GameControl() {
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
