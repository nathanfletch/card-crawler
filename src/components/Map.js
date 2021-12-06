import React from "react";
import PropTypes from "prop-types";

export default function Map({ setShownComponent }) {
  return (
    <div>
      <p>Map Window</p>
      <button onClick={() => setShownComponent("start")}>Menu</button>
      <button onClick={() => setShownComponent("battle")}>Start Battle</button>
    </div>
  );
}

Map.propTypes = {
  setShownComponent: PropTypes.func,
};
