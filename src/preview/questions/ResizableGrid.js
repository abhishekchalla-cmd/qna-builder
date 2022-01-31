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

  const map = data.map || [];
  const [answerMap, setAnswerMap] = useState(
    map.map((row) => row.map((column) => ""))
  );
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    let answer = true;
    map.map((row, rowIndex) =>
      row.map((column, columnIndex) => {
        if (
          column.type === "answers" &&
          column.value.data != answerMap[rowIndex][columnIndex]
        )
          answer = false;
      })
    );
    if (answer) {
      addMarks(marks);
    }
  }, [checkAnswer]);

  return (
    <div>
      <div
        className="border border-yellow-600 m-5 w-full"
        style={{
          gridTemplateRows: map.map((e) => "1fr").join(" "),
          width: "max-content",
        }}
      >
        {map.map((row, rowIndex) => {
          return (
            <div
              className="sudoku items-center justify-center"
              style={{
                display: "grid",
                gridTemplateColumns: map[0]?.map((e) => "1fr").join(" "),
              }}
            >
              {row.map((column, columnIndex) => {
                if (column.type === "answers")
                  return (
                    <div
                      className={"sudoku"}
                      style={{ height: "100%", width: "100%" }}
                    >
                      <input
                        type="number"
                        onBlur={wireEventValue((value) => {
                          answerMap[rowIndex][columnIndex] = value;
                          setAnswerMap([...answerMap]);
                        })}
                        style={{
                          ...(checkAnswer
                            ? column.value.data !=
                              answerMap[rowIndex][columnIndex]
                              ? { color: "red" }
                              : { color: "green" }
                            : {}),
                          width: column.dims ? column.dims[0] + "px" : "5rem",
                          height: column.dims ? column.dims[1] + "px" : "5rem",
                        }}
                      />
                    </div>
                  );
                else
                  return (
                    <div
                      className="sudoku"
                      style={{ height: "100%", width: "100%" }}
                    >
                      <ImageTextInputViewer value={column.value} />
                    </div>
                  );
              })}
            </div>
          );
        })}
      </div>
      <CorrectMessage
        isCorrect={isCorrect}
        checkAnswer={checkAnswer}
        className="ml-5 mt-10"
      />
    </div>
  );
}
