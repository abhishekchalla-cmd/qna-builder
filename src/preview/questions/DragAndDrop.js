import React, { useContext, useEffect, useState, useRef } from "react";
import _ from "lodash";
import GreenTick from "../assets/images/green-tick.svg";
import RedCross from "../assets/images/red-cross.svg";
import { PreviewContext } from "../components/PreviewContext";
import Draggable from "./DragAndDrop/Draggable";
import Droppable from "./DragAndDrop/Droppable";
import { Preview } from "react-dnd-preview";

// const highlight = (elem) => (elem.style.backgroundColor = "yellow");
// const unhighlight = (elem) => (elem.style.backgroundColor = "transparent");

export const ItemTypes = {
  draggable: "draggable",
  droppable: "droppable",
};

export default function DragAndDrop(props) {
  const { checkAnswer, addMarks } = useContext(PreviewContext);
  const { data, qNum, marks } = props;

  const droppables = data.droppables || {};
  const draggables = data.draggables || {};
  const [draggableAnswers, setDraggableAnswers] = useState({});
  // const [draggablePositions, setDraggablePositions] = useState({});

  const setAnswer = (draggableId, droppableId) => {
    setDraggableAnswers({ ...draggableAnswers, [draggableId]: droppableId });
    // setDraggablePositions({ ...draggablePositions, [draggableId]: position });
  };

  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    let result = true;
    if (checkAnswer) {
      Object.keys(draggables).map((draggableId) => {
        const answer = draggableAnswers[draggableId];
        if (!answer || answer !== draggables[draggableId].dropOn)
          result = false;
      });
      if (result) {
        setIsCorrect(true);
        addMarks(marks);
      } else setIsCorrect(false);
    }
  }, [checkAnswer]);

  // DRAG LOGIC

  // const dragEvents = (draggableId) => {
  //   function onPointerDown(e1) {
  //     const draggable = draggableElements.current[draggableId];
  //     const initCur = { x: e1.clientX, y: e1.clientY };
  //
  //     document.getElementsByTagName("body")[0].style.overflow = "hidden";
  //
  //     let targetNode = null;
  //
  //     function onPointerMove(e2) {
  //       draggable.style.transform = `translateX(${
  //         e2.clientX - initCur.x
  //       }px) translateY(${e2.clientY - initCur.y}px)`;
  //
  //       if (targetNode) unhighlight(targetNode);
  //       const nodes = document.elementsFromPoint(e2.clientX, e2.clientY);
  //       let i = 0;
  //       targetNode = nodes[i];
  //       while (targetNode && !targetNode.dataset.droppableId) {
  //         targetNode = nodes[++i];
  //       }
  //       if (targetNode) highlight(targetNode);
  //     }
  //
  //     function onPointerUp(e2) {
  //       draggable.style.transform = `translateX(0) translateY(0)`;
  //       document.getElementsByTagName("body")[0].style.overflow = "auto";
  //
  //       if (targetNode) {
  //         unhighlight(targetNode);
  //         setAnswer(draggableId, targetNode.dataset.droppableId);
  //       }
  //       window.removeEventListener("pointermove", onPointerMove);
  //       window.removeEventListener("pointerup", onPointerUp);
  //     }
  //
  //     window.addEventListener("pointermove", onPointerMove);
  //     window.addEventListener("pointerup", onPointerUp);
  //   }
  //
  //   return { onPointerDown };
  // };

  return (
    <div>
      {/* Drop Zones */}

      <div
        className={`flex items-center flex-wrap justify-center relative draggable-container ${
          data.isDroppableFree ? "free" : ""
        }`}
        style={{
          height:
            data.isDroppableFree && data.droppableContainerHeight
              ? data.droppableContainerHeight + "px"
              : "auto",
        }}
      >
        {Object.keys(droppables).map((droppableId) => (
          <Droppable
            droppable={droppables[droppableId]}
            isFree={data.isDroppableFree}
            draggables={Object.keys(draggableAnswers)
              .filter(
                (draggableId) => draggableAnswers[draggableId] === droppableId
              )
              .map((draggableId) => draggables[draggableId])}
            meta={{
              isDraggableFree: data.isDraggableFree,
            }}
            setAnswer={setAnswer}
          />
        ))}
      </div>

      {/* Draggables */}

      <div
        className={`my-20 flex flex-wrap justify-center sm:pl-8 sm:pr-8 relative draggable-container ${
          data.isDraggableFree ? "free" : ""
        }`}
        style={{
          height:
            data.isDraggableFree && data.draggableContainerHeight
              ? data.draggableContainerHeight + "px"
              : "auto",
        }}
      >
        {Object.keys(draggables)
          .filter((draggableId) => !draggableAnswers[draggableId])
          .map((draggableId) => (
            <Draggable
              draggable={draggables[draggableId]}
              isFree={data.isDraggableFree}
            />
          ))}
      </div>
      <div className={"flex w-100 justify-center"}>
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

      <Preview
        generator={({ item, style }) => {
          return (
            <div style={style}>
              <Draggable draggable={draggables[item.draggableId]} />
            </div>
          );
        }}
      />
    </div>
  );
}
