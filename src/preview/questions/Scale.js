import React, { useContext, useEffect, useState, useRef } from "react";
import { PreviewContext } from "../components/PreviewContext";

export default function Scale(props) {
  const { checkAnswer, addMarks } = useContext(PreviewContext);
  const { data, marks } = props;
  const { rangeStart, rangeEnd, answer } = data;
  const sliderRef = useRef(null);

  const [isCorrect, setIsCorrect] = useState(false);

  const length = 500;
  const minUnitWidth = 20;
  const [unitWidth, setUnitWidth] = useState(length);
  const [unitValue, setUnitValue] = useState(1);
  const points = new Array(length / unitWidth)
    .fill("")
    .map((e, index) => index * unitValue);
  points.push(rangeEnd);

  const allowMultiple = answer.length > 1;
  const [plotters, setPlotters] = useState(
    allowMultiple ? [] : [Math.floor((rangeEnd - rangeStart) / 2)]
  );
  const addPlotter = (e) => {
    console.log("adding plotter");
    const { left: sliderLeft } = sliderRef.current.getBoundingClientRect();
    const value = Math.round((e.clientX - sliderLeft) / unitWidth);
    if (value >= 0 || value <= rangeEnd) setPlotters([...plotters, value]);
  };
  const removePlotter = (plotterIndex) => {
    console.log("removing plotter at " + plotterIndex);
    plotters.splice(plotterIndex, 1);
    setPlotters([...plotters]);
  };

  useEffect(() => {
    console.log(answer, plotters);
    if (
      checkAnswer &&
      JSON.stringify([...answer].sort()) ===
        JSON.stringify([...plotters].map((e) => e + rangeStart).sort())
    ) {
      setIsCorrect(true);
      addMarks(marks);
    } else setIsCorrect(false);
  }, [checkAnswer]);

  useEffect(() => {
    const totalUnits = rangeEnd - rangeStart;
    let unit = length / totalUnits;
    let unitValue = 1;

    if (unit < minUnitWidth) {
      unitValue = minUnitWidth / unit;
      unit = minUnitWidth;
    }

    setUnitWidth(unit);
    setUnitValue(unitValue);
  }, [data]);

  const initiateDrag = (e, plotterIndex) => {
    const { left: sliderLeft } = sliderRef.current.getBoundingClientRect();
    const plotter = document.getElementById(`plotter-${plotterIndex}`);
    const label = plotter.getElementsByTagName("div")[0];
    const { left: initLeft } = plotter.getBoundingClientRect();
    const { clientX: initX } = e;

    let value = plotters[plotterIndex];
    let moved = false;

    const pointerMoveCallback = (e2) => {
      const { clientX: x } = e2;
      moved = true;
      value =
        plotters[plotterIndex] +
        Math.floor((x - initX) / (unitWidth / unitValue));
      if (value >= 0 && value <= rangeEnd) {
        label.innerHTML = rangeStart + value + "";
        plotter.style.left = x - sliderLeft + "px";
      }
    };

    const pointerUpCallback = (e2) => {
      if (!moved && allowMultiple) removePlotter(plotterIndex);
      else {
        plotters[plotterIndex] = value;
        setPlotters([...plotters]);
      }
      window.removeEventListener("pointermove", pointerMoveCallback);
      window.removeEventListener("pointerup", pointerUpCallback);
    };

    window.addEventListener("pointermove", pointerMoveCallback);
    window.addEventListener("pointerup", pointerUpCallback);
  };

  return (
    <div className={"flex flex-col items-center"}>
      <div
        className={
          "w-100 flex flex-col justify-center items-center bg-black-200"
        }
        style={{ height: "100px" }}
      >
        <div
          style={{ display: "inline-block", userSelect: "none" }}
          className={"ml-10"}
        >
          <div
            className={"bg-yellow-200"}
            style={{
              height: "2px",
              width: length + "px",
              position: "relative",
            }}
            ref={sliderRef}
          >
            <div
              className={"relative w-100"}
              onClick={!checkAnswer && allowMultiple && addPlotter}
            >
              {points.map((point, pointIndex) => (
                <div
                  style={{ left: pointIndex * unitWidth + "px" }}
                  className={"slider-point bg-yellow-200"}
                >
                  <div
                    className={"absolute top-5"}
                    style={{ transform: "translateX(-50)" }}
                  >
                    {rangeStart + pointIndex * unitValue}
                  </div>
                </div>
              ))}
            </div>

            {plotters.map((plotter, plotterIndex) => (
              <div
                className={"slider-point plotter"}
                style={{
                  zIndex: "10",
                  width: "15px",
                  height: "15px",
                  left: plotter * unitWidth - 7.5 + "px",
                }}
                onPointerDown={
                  !checkAnswer && ((e) => initiateDrag(e, plotterIndex))
                }
                id={"plotter-" + plotterIndex}
              >
                <div
                  className={"absolute -top-5"}
                  style={{
                    transform: "translateX(-50)",
                  }}
                >
                  {rangeStart + plotter}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {checkAnswer ? (
        isCorrect ? (
          <div className={"text-green-500"}>
            <b>Correct!</b>
          </div>
        ) : (
          <div className={"text-red-500"}>
            <b>Wrong!</b>
          </div>
        )
      ) : (
        ""
      )}
    </div>
  );
}
