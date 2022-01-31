import React, { useEffect, useState } from "react";
import { wireEventValue } from "../utils/form";

const Scale = ({ update, data }) => {
  const rangeStart = data.rangeStart;
  const setRangeStart = (rangeStart) => update({ ...data, rangeStart });
  const rangeEnd = data.rangeEnd;
  const setRangeEnd = (rangeEnd) => update({ ...data, rangeEnd });
  const answer = data.answer;
  const setAnswer = (answer) => update({ ...data, answer });

  const [bufferAnswer, setBufferAnswer] = useState(answer?.join(",") || "");

  const updateData = () => {
    if (bufferAnswer) {
      let ans = bufferAnswer.split(",").map((e) => Number(e.trim()));
      const { largest, smallest } =
        ans.reduce((acc, current) => {
          if (!acc.smallest) acc.smallest = current;
          if (!acc.largest) acc.largest = current;

          if (acc.smallest > current) acc.smallest = current;
          else if (acc.largest < current) acc.largest = current;

          return acc;
        }, {}) || 1;

      const rs = rangeStart || Math.floor(smallest * Math.random());
      const re = rangeEnd || Math.ceil(largest + (largest / 2) * Math.random());

      let allOk = true;
      ans.map((number) => {
        let ok = false;
        if (!number) alert("Please enter a valid number");
        else if (number < rs || number > re)
          alert("The number " + number + " exceeds the range");
        else ok = true;

        allOk = allOk && ok;
      });

      if (allOk) update({ rangeStart: rs, rangeEnd: re, answer: ans });
    } else alert("Please add an answer");
  };

  useEffect(() => {
    if (answer || bufferAnswer) updateData();
  }, [rangeStart, rangeEnd, JSON.stringify(answer), bufferAnswer]);

  return (
    <div>
      <li>
        <b>Answer(s) (Separate with a comma if there are multiple points) *:</b>
        <input
          type="text"
          onBlur={wireEventValue(setBufferAnswer)}
          defaultValue={bufferAnswer}
        />
      </li>
      <li>
        <b>Range Start:</b>{" "}
        <input
          type="number"
          onBlur={wireEventValue((e) => setRangeStart(Number(e)))}
          defaultValue={rangeStart}
        />
      </li>
      <li>
        <b>Range End:</b>
        <input
          type="number"
          onBlur={wireEventValue((e) => setRangeEnd(Number(e)))}
          defaultValue={rangeEnd}
        />
      </li>
    </div>
  );
};

export default Scale;
