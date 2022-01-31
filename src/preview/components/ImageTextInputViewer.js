import React from "react";

export default function ImageTextInputViewer(props) {
  const { style, className, ignoreDimensions } = props;
  const { type, data, dims } = props.value || {};

  return data ? (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{
        width: !ignoreDimensions ? dims[0] + "px" : "auto",
        height: !ignoreDimensions ? dims[1] + "px" : "auto",
        ...style,
      }}
    >
      {type === 0 ? (
        <span>{data}</span>
      ) : (
        <img src={data} style={{ maxHeight: "100%", maxWidth: "100%" }} />
      )}
    </div>
  ) : (
    ""
  );
}
