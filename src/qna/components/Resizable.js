import React, { useRef } from "react";

// Standalone component
export default function Resizable(props) {
  let { children, heightStep, widthStep, onChange, canResize } = props;
  heightStep = heightStep || 1;
  widthStep = widthStep || 1;
  const containerRef = useRef(null);

  const initiateDrag = (e) => {
    const container = containerRef.current;
    const { height: containerHeight, width: containerWidth } =
      container.getBoundingClientRect();

    const resizeBox = container.getElementsByClassName("resize-box")[0];
    resizeBox.style.width = containerWidth + "px";
    resizeBox.style.height = containerHeight + "px";
    resizeBox.classList.add("active");

    const initPos = { x: e.clientX, y: e.clientY };

    let finalWidth = containerWidth,
      finalHeight = containerHeight;

    const pointerMoveCallback = (e2) => {
      e2.preventDefault();
      const dX = e2.clientX - initPos.x;
      const dY = e2.clientY - initPos.y;

      finalWidth = containerWidth + Math.floor(dX / widthStep) * widthStep;
      finalHeight = containerHeight + Math.floor(dY / heightStep) * heightStep;
      resizeBox.style.width = finalWidth + "px";
      resizeBox.style.height = finalHeight + "px";
    };

    const pointerUpCallback = () => {
      onChange({ dims: [finalWidth, finalHeight] });
      window.removeEventListener("pointermove", pointerMoveCallback);
      window.removeEventListener("pointerup", pointerUpCallback);
      resizeBox.classList.remove("active");
    };

    window.addEventListener("pointermove", pointerMoveCallback);
    window.addEventListener("pointerup", pointerUpCallback);
  };

  return canResize === false ? (
    children
  ) : (
    <div
      ref={containerRef}
      className={"relative"}
      style={{ height: "max-content", width: "max-content" }}
    >
      {children}
      <div className={"resize-box"} />
      <div
        className="anchor"
        style={{ bottom: "-10px", right: "-10px", zIndex: "100" }}
        onPointerDown={initiateDrag}
      />
    </div>
  );
}
