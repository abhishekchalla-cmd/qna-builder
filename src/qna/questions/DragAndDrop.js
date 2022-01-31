import React, { useEffect, useRef, useState } from "react";
import { wireEventValue } from "../utils/form";
import ImageTextInput from "../components/ImageTextInput";
import "./DragAndDrop/index.css";

let count = 0;
const genId = () => new Date().getTime() + count++ + "";

const newDroppable = (opts = {}) => ({
  content: "",
  id: genId(),
  position: null,
  label: "",
  ...opts,
});

const newDraggable = (opts = {}) => ({
  content: "",
  id: genId(),
  position: null,
  dropOn: null,
  label: "",
  ...opts,
});

export const draggableAttributes = ({
  onDragEnd,
  ignoreContainerBounds,
  parent,
}) => {
  const onPointerDown = (e) => {
    parent = parent || e.target.parentNode;
    const {
      left: parentLeft,
      top: parentTop,
      width: parentWidth,
      height: parentHeight,
    } = parent.getBoundingClientRect();
    const { target } = e;
    if (!target.classList.contains("draggable")) return;
    const {
      height: targetHeight,
      width: targetWidth,
      left: targetInitialLeft,
      top: targetInitialTop,
    } = target.getBoundingClientRect();
    // const targetInitialLeft = _targetInitialLeft - parentLeft;
    // const targetInitialTop = _targetInitialTop - parentTop;

    let initPos = { x: e.clientX, y: e.clientY };

    const onPointerMove = (e2) => {
      const targetTop = targetInitialTop + e2.clientY - initPos.y;
      const targetLeft = targetInitialLeft + e2.clientX - initPos.x;

      if (
        parentTop < targetTop &&
        parentTop + parentHeight > targetTop + targetHeight
      ) {
        target.style.top = targetTop - parentTop + "px";
      }

      if (
        parentLeft < targetLeft &&
        parentLeft + parentWidth > targetLeft + targetWidth
      ) {
        target.style.left = targetLeft - parentLeft + "px";
      }
    };

    const onPointerUp = (e2) => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);

      const { top: targetTop, left: targetLeft } =
        target.getBoundingClientRect();

      onDragEnd({
        top: targetTop - parentTop,
        left: targetLeft - parentLeft,
      });
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  return { onPointerDown };
};

const DragAndDrop = ({ update, data }) => {
  const containerRef = useRef(null);

  // Droppables

  const { droppables, droppableContainerHeight } = data;
  const setDroppables = (newDroppables) =>
    update({ ...data, droppables: newDroppables });

  const { isDroppableFree } = data;
  const setIsDroppableFree = (value) =>
    update({ ...data, isDroppableFree: value });

  const addDroppable = () => {
    const _droppables = { ...droppables };
    const droppable = newDroppable();
    _droppables[droppable.id] = droppable;
    setDroppables(_droppables);
    setDroppableContainerHeight(_droppables);
  };
  const updateDroppable = (id, key, value) => {
    const _droppables = { ...droppables };
    const d = _droppables[id];
    if (d) d[key] = value;

    setDroppables(_droppables);
    setDroppableContainerHeight(_droppables);
  };
  const deleteDroppable = (id) => {
    const _droppables = { ...droppables };
    delete _droppables[id];
    setDroppables(_droppables);
    setDroppableContainerHeight(_droppables);
  };

  const setDroppableContainerHeight = (droppables) => {
    if (droppables) {
      let maxHeight = 0;
      Object.values(droppables).map((droppable) => {
        console.log(droppable);
        let droppableHeight = containerRef.current
          .getElementsByClassName("droppable-" + droppable.id)[0]
          ?.getBoundingClientRect().height;
        droppableHeight = droppableHeight < 0 ? 0 : droppableHeight;
        const height = droppableHeight + droppable.position?.top || 0;
        if (height > maxHeight) maxHeight = height;
      });
      update({ ...data, droppables, droppableContainerHeight: maxHeight });
    }
  };

  // Draggables

  const { draggables, draggableContainerHeight } = data;
  const setDraggables = (newDraggables) =>
    update({ ...data, draggables: newDraggables });

  const { isDraggableFree } = data;
  const setIsDraggableFree = (value) =>
    update({ ...data, isDraggableFree: value });

  const addDraggable = () => {
    const _draggables = { ...draggables };
    const draggable = newDraggable();
    _draggables[draggable.id] = draggable;
    setDraggables(_draggables);
    setDraggableContainerHeight(_draggables);
  };
  const updateDraggable = (id, key, value) => {
    const _draggables = { ...draggables };
    const d = _draggables[id];
    if (d) d[key] = value;
    setDraggables(_draggables);
    setDraggableContainerHeight(_draggables);
  };
  const deleteDraggable = (id) => {
    const _draggables = { ...draggables };
    delete _draggables[id];
    setDraggables(_draggables);
    setDraggableContainerHeight(_draggables);
  };

  const setDraggableContainerHeight = (draggables) => {
    if (draggables) {
      let maxHeight = 0;
      Object.values(draggables).map((draggable) => {
        let draggableHeight = containerRef.current
          .getElementsByClassName("draggable-" + draggable.id)[0]
          ?.getBoundingClientRect().height;
        draggableHeight = draggableHeight < 0 ? 0 : draggableHeight;
        const height = draggableHeight + draggable.position?.top || 0;
        if (height > maxHeight) maxHeight = height;
      });
      update({ ...data, draggables, draggableContainerHeight: maxHeight });
    }
  };

  return (
    <div ref={containerRef}>
      {/*Droppable list*/}
      <div>
        <button onClick={addDroppable}>Add new drop zone</button>
        <button onClick={() => setIsDroppableFree(!isDroppableFree)}>
          {isDroppableFree ? "Arrange by block" : "Arrange freely"}
        </button>

        <div
          className={
            "relative draggable-container " + (isDroppableFree ? "free" : "")
          }
          style={{
            height:
              isDroppableFree && droppableContainerHeight
                ? droppableContainerHeight + "px"
                : "auto",
          }}
        >
          {droppables &&
            Object.keys(droppables).map((droppableId) => {
              const { position, content, label } = droppables[droppableId];
              return (
                <div
                  className={`draggable droppable-${droppableId}`}
                  key={droppableId}
                  {...(isDroppableFree
                    ? draggableAttributes({
                        onDragEnd: (position) =>
                          updateDroppable(droppableId, "position", position),
                      })
                    : {})}
                  style={
                    position
                      ? {
                          top: position.top + "px",
                          left: position.left + "px",
                        }
                      : {}
                  }
                >
                  <ImageTextInput
                    onChange={(value) =>
                      updateDroppable(droppableId, "content", value)
                    }
                    fieldType={"inputField"}
                    value={content}
                  />
                  <input
                    type={"label"}
                    placeholder={"Label"}
                    onBlur={wireEventValue((value) =>
                      updateDroppable(droppableId, "label", value)
                    )}
                    defaultValue={label}
                  />
                  <button onClick={() => deleteDroppable(droppableId)}>
                    Delete
                  </button>
                </div>
              );
            })}
        </div>
      </div>

      {/*Draggable list*/}
      <div>
        <button onClick={addDraggable}>Add new draggable</button>
        <button onClick={() => setIsDraggableFree(!isDraggableFree)}>
          {isDraggableFree ? "Arrange by block" : "Arrange freely"}
        </button>

        <div
          className={
            "relative draggable-container " + (isDraggableFree ? "free" : "")
          }
          style={{
            height:
              isDraggableFree && draggableContainerHeight
                ? draggableContainerHeight + "px"
                : "auto",
          }}
        >
          {draggables &&
            Object.keys(draggables).map((draggableId) => {
              const draggable = draggables[draggableId];
              const { position, content, label } = draggable;
              if (draggable.dropOn && !droppables[draggable.dropOn])
                updateDraggable(draggableId, "dropOn", "");

              return (
                <div
                  className={`draggable draggable-${draggableId}`}
                  key={draggableId}
                  {...(isDraggableFree
                    ? draggableAttributes({
                        onDragEnd: (position) =>
                          updateDraggable(draggableId, "position", position),
                      })
                    : {})}
                  style={
                    position
                      ? {
                          top: position.top + "px",
                          left: position.left + "px",
                        }
                      : {}
                  }
                >
                  <ImageTextInput
                    onChange={(value) =>
                      updateDraggable(draggableId, "content", value)
                    }
                    fieldType={"inputField"}
                    value={content}
                  />
                  <input
                    type={"label"}
                    placeholder={"Label"}
                    onBlur={wireEventValue((value) =>
                      updateDraggable(draggableId, "label", value)
                    )}
                    defaultValue={label}
                  />
                  <select
                    onChange={wireEventValue((value) =>
                      updateDraggable(draggableId, "dropOn", value)
                    )}
                    value={draggable.dropOn || ""}
                  >
                    <option value={""}>Choose a drop zone</option>
                    {droppables &&
                      Object.keys(droppables).map((droppableId) => {
                        const droppable = droppables[droppableId];
                        return (
                          <option value={droppable.id}>
                            {droppable.label}
                          </option>
                        );
                      })}
                  </select>
                  <button onClick={() => deleteDraggable(draggableId)}>
                    Delete
                  </button>
                </div>
              );
            })}
        </div>
      </div>
      <div>{/*<button onClick={submit}>Submit</button>*/}</div>
    </div>
  );
};

export default DragAndDrop;
