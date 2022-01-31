import React, { useContext, useEffect, useState } from "react";
import GreenTick from "../assets/images/green-tick.svg";
import RedCross from "../assets/images/red-cross.svg";
import BlackArrow from "../assets/images/black-arrow.svg";
import { PreviewContext } from "../components/PreviewContext";
import ImageTextInputViewer from "../components/ImageTextInputViewer";
import { wireEventValue } from "../../qna/utils/form";

export default function MultipleChoice(props) {
  const { checkAnswer, addMarks } = useContext(PreviewContext);

  const { data, qNum, marks } = props;

  const { question } = data;
  const { text, options } = question || {};

  const [answer, setAnswer] = useState(
    Object.keys(options).reduce((acc, cur) => {
      acc[options[cur].id] = "";
      return acc;
    }, {})
  );

  const [selectedValue, _setSelectedValue] = useState(null);
  const setSelectedValue = (value) => {
    if (!checkAnswer) {
      _setSelectedValue(value);
    }
  };

  const updateAnswer = (id, value) => {
    setAnswer({ ...answer, [id]: value });
  };

  useEffect(() => {
    if (checkAnswer && selectedValue === answer) {
      addMarks(marks);
    }
  }, [checkAnswer]);

  const option = ({ value, label, id }) => {
    const isCorrect = answer && answer[id] == value;

    return (
      <div className={"flex items-center ml-10"}>
        <ImageTextInputViewer
          value={label}
          style={{ fontWeight: "bold", justifyContent: "flex-end" }}
          ignoreDimensions={true}
        />

        <input
          type={"text"}
          onBlur={wireEventValue((value) => updateAnswer(id, value))}
          className={"question-input ml-5"}
        />

        {checkAnswer ? (
          !isCorrect ? (
            <div className="ml-5 flex items-center">
              <img src={RedCross} />
              <p className="text-red-500 whitespace-nowrap ml-2">
                That's incorrect
              </p>
            </div>
          ) : (
            <div className="ml-5 flex items-center">
              <img src={GreenTick} />
              <p className="text-green-600 whitespace-nowrap ml-2">
                That's Right
              </p>
            </div>
          )
        ) : (
          ""
        )}
      </div>
    );
  };

  return (
    <div>
      <section>
        <div className={"flex flex-col w-full flex-wrap"}>
          {options && options.map(option)}
        </div>
      </section>
    </div>
  );
}
