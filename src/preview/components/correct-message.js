import React from "react";
import RedCross from "../assets/images/red-cross.svg";
import GreenTick from "../assets/images/green-tick.svg";

export default function CorrectMessage(props) {
  const { isCorrect, checkAnswer, className } = props;
  if (checkAnswer) console.log("isCorrect:", isCorrect);
  return checkAnswer ? (
    !isCorrect ? (
      <div className={className + " flex items-center"}>
        <img src={RedCross} />
        <p className="text-red-500 whitespace-nowrap ml-2">That's incorrect</p>
      </div>
    ) : isCorrect ? (
      <div className={className + " flex items-center"}>
        <img src={GreenTick} />
        <p className="text-green-600 whitespace-nowrap ml-2">That's Right</p>
      </div>
    ) : (
      ""
    )
  ) : null;
}
