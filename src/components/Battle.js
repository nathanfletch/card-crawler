import React from "react";
import PropTypes from "prop-types";
import Field from "./Field";

export default function Battle({ setShownComponent }) {
  return (
    <div>
      <Field />
      <button onClick={() => setShownComponent("start")}>Menu</button>
      <button onClick={() => setShownComponent("map")}>View Map</button>
    </div>
  );
}

Battle.propTypes = {
  setShownComponent: PropTypes.func,
};
