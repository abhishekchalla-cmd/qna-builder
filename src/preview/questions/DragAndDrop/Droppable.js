import React from "react";
import ImageTextInputViewer from "../../components/ImageTextInputViewer";
import Draggable from "./Draggable";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../DragAndDrop";

export default function Droppable(props) {
  const { droppable, draggables, isFree, meta, setAnswer } = props;
  const [{ isOver }, dropRef] = useDrop(
    () => ({
      accept: ItemTypes.draggable,
      drop: (item) => {
        setAnswer(item.draggableId, droppable.id);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [setAnswer]
  );

  return (
    <div
      className={`droppable relative m-6`}
      ref={dropRef}
      style={{
        ...(isFree && {
          position: "absolute",
          ...droppable.position,
        }),
        backgroundColor: isOver ? "yellow" : "transparent",
      }}
    >
      <ImageTextInputViewer value={droppable.content} />
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {draggables.map((draggable) => (
          <Draggable draggable={draggable} isFree={meta.isDraggableFree} />
        ))}
      </div>
    </div>
  );
}
