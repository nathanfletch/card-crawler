import React from "react";
import PropTypes from "prop-types";

export default function Battle({ setShownComponent }) {
  return (
    <div>
      <p>Battle Window</p>
      <button onClick={() => setShownComponent("start")}>Menu</button>
      <button onClick={() => setShownComponent("map")}>View Map</button>
    </div>
  );
}

Battle.propTypes = {
  setShownComponent: PropTypes.func,
};
