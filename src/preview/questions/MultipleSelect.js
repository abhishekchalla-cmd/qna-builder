import React, { useContext, useEffect, useState } from "react";
import { PreviewContext } from "../components/PreviewContext";
import Tick from "../assets/images/tick.svg";
import Cross from "../assets/images/cross.svg";
import ImageTextInputViewer from "../components/ImageTextInputViewer";

export default function MultipleSelect(props) {
  const { checkAnswer, addMarks } = useContext(PreviewContext);

  const { data, marks } = props;

  const { question } = data;
  const { text, options } = question;

  const { answer } = data;

  const [selectedValue, _setSelectedValue] = useState([]);
  const setSelectedValue = (value) => {
    if (!checkAnswer) {
      const index = selectedValue.indexOf(value);
      if (index > -1)
        _setSelectedValue(selectedValue.filter((e, idx) => idx !== index));
      else _setSelectedValue([...selectedValue, value]);
    }
  };

  useEffect(() => {
    if (
      checkAnswer &&
      JSON.stringify([...selectedValue].sort()) ===
        JSON.stringify([...answer].sort())
    ) {
      console.log("Correct");
      addMarks(marks);
    }
  }, [checkAnswer]);

  const option = ({ value, label }) => {
    const isCorrect = answer && answer?.includes(value);
    const selected = selectedValue?.includes(value);

    return (
      <div
        className={
          `box-11 bg-light-orange ` +
          (checkAnswer
            ? isCorrect
              ? ""
              : selected
              ? "bg-light-red border-red"
              : ""
            : "")
        }
        style={{ width: "auto !important", height: "auto !important" }}
        onClick={() => setSelectedValue(value)}
      >
        <p className="text-3xl font-semibold">
          <ImageTextInputViewer value={label} />
        </p>
        <div className="circle-11 p-1">
          {checkAnswer ? (
            isCorrect ? (
              <img src={Tick} />
            ) : selected ? (
              <img src={Cross} />
            ) : (
              ""
            )
          ) : selected ? (
            <img src={Tick} />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <section>
        <div className={"flex w-full flex-wrap justify-center"}>
          {options && options.map(option)}
        </div>
      </section>
    </div>
  );
}
