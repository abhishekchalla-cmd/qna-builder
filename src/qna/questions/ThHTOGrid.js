import React, { useRef } from "react";
import { wireEventValue } from "../utils/form";

const ThHTOGrid = ({ data, update }) => {
  const updateAnswer = (value) => {
    if (value && Number(value) && Number(value) < 99999)
      update({ answer: value });
    else alert("The value should be between 0-99999");
  };

  return (
    <div>
      <input
        type="number"
        defaultValue={data.answer}
        onBlur={wireEventValue(updateAnswer)}
      />{" "}
    </div>
  );
};

export default ThHTOGrid;
