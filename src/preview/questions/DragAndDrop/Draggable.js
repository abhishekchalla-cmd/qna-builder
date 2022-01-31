import React from "react";
import ImageTextInputViewer from "../../components/ImageTextInputViewer";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../DragAndDrop";

export default function Draggable(props) {
  const { draggable, isFree } = props;
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: ItemTypes.draggable,
      item: () => ({ draggableId: draggable.id }),
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [draggable.id]
  );

  return (
    <div
      className="drag-box"
      ref={dragRef}
      style={{
        ...(isFree && {
          position: "absolute",
          ...draggable.position,
        }),
        opacity: isDragging ? "0.5" : "1",
      }}
    >
      <ImageTextInputViewer value={draggable.content} />
    </div>
  );
}
