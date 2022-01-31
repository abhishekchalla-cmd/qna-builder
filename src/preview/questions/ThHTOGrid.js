import React, { useContext, useEffect, useState } from "react";
import GreenTick from "../assets/images/green-tick.svg";
import RedCross from "../assets/images/red-cross.svg";
import BlackArrow from "../assets/images/black-arrow.svg";
import { PreviewContext } from "../components/PreviewContext";
import ImageTextInputViewer from "../components/ImageTextInputViewer";
import { wireEventValue } from "../../qna/utils/form";
import CorrectMessage from "../components/correct-message";

export default function ResizableGrid(props) {
  const { checkAnswer, addMarks } = useContext(PreviewContext);
  const { data, qNum, marks } = props;

  const [answer, _setAnswer] = useState({});
  const setAnswer = (unit, factor) => {
    if (answer[unit] === factor) factor = undefined;
    _setAnswer({ ...answer, [unit]: factor });
  };

  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    const ans = Object.keys(answer).reduce(
      (acc, unit) => acc + unit * (answer[unit] || 0),
      0
    );
    if (checkAnswer && ans === Number(data.answer)) {
      setIsCorrect(true);
      addMarks(marks);
    } else setIsCorrect(false);
  }, [checkAnswer]);

  return (
    <div>
      <div className={"flex mt-10"}>
        <DigitSelector
          unit={10000}
          onChange={(unit, factor) => setAnswer(unit, factor)}
          disable={checkAnswer}
          factor={answer[10000]}
        />
        <DigitSelector
          unit={1000}
          onChange={(unit, factor) => setAnswer(unit, factor)}
          disable={checkAnswer}
          factor={answer[1000]}
        />
        <DigitSelector
          unit={100}
          onChange={(unit, factor) => setAnswer(unit, factor)}
          disable={checkAnswer}
          factor={answer[100]}
        />
        <DigitSelector
          unit={10}
          onChange={(unit, factor) => setAnswer(unit, factor)}
          disable={checkAnswer}
          factor={answer[10]}
        />
        <DigitSelector
          unit={1}
          onChange={(unit, factor) => setAnswer(unit, factor)}
          disable={checkAnswer}
          factor={answer[1]}
        />
      </div>
      <div className={"p-5"}>
        <CorrectMessage checkAnswer={checkAnswer} isCorrect={isCorrect} />
      </div>
    </div>
  );
}

const DigitSelector = (props) => {
  const factor = props.factor || 0;

  return (
    <div className={"flex flex-col"}>
      <div style={{ transform: "rotate(-90deg) translateX(50%)" }}>
        {props.unit}
      </div>
      {new Array(9).fill("").map((e, index) => (
        <div
          className={`fill-cube ${index < factor ? "selected" : ""}`}
          onClick={() =>
            !props.disable && props.onChange(props.unit, index + 1)
          }
        />
      ))}
    </div>
  );
};
