import React, { useContext, useEffect, useState } from "react";
import GreenTick from "../assets/images/green-tick.svg";
import RedCross from "../assets/images/red-cross.svg";
import BlackArrow from "../assets/images/black-arrow.svg";
import { PreviewContext } from "../components/PreviewContext";
import ImageTextInputViewer from "../components/ImageTextInputViewer";
import CorrectMessage from "../components/correct-message";

export default function MultipleChoice(props) {
  const { checkAnswer, addMarks } = useContext(PreviewContext);

  const { data, qNum, marks } = props;

  const { question } = data;
  const { text, options } = question || {};

  const { answer } = data;

  const [selectedValue, _setSelectedValue] = useState(null);
  const setSelectedValue = (value) => {
    if (!checkAnswer) {
      _setSelectedValue(value);
    }
  };

  useEffect(() => {
    if (checkAnswer && selectedValue === answer) {
      addMarks(marks);
    }
  }, [checkAnswer]);

  const option = ({ value, label }) => {
    const isCorrect = answer && value === answer;
    const selected = selectedValue === value;

    return (
      <div
        className={"relative mx-2 my-6"}
        onClick={() => setSelectedValue(value)}
      >
        <div
          className={
            "text-4xl text-white font-semibold mcq-option " +
            (checkAnswer && !isCorrect && selected
              ? "red"
              : checkAnswer && isCorrect
              ? "green"
              : "blue") +
            " " +
            (selected ? "selected" : "")
          }
        >
          <ImageTextInputViewer value={label} ignoreDimensions={true} />
        </div>
        {((selected && !isCorrect) || isCorrect) && (
          <CorrectMessage
            isCorrect={isCorrect}
            checkAnswer={checkAnswer}
            className={"mcq-message"}
          />
        )}
      </div>
    );
  };

  return (
    <div>
      <section>
        {/*<div*/}
        {/*  className=""*/}
        {/*  dangerouslySetInnerHTML={{ __html: text }}*/}
        {/*/>*/}

        <div className={"flex w-full flex-wrap justify-center"}>
          {options && options.map(option)}
        </div>
      </section>
    </div>
  );
}
