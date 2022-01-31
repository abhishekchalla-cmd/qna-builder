import React, { useEffect, useState, useRef } from "react";
import "./ImageTextInput/index.css";
import Resizable from "./Resizable";
import { wireEventValue } from "../utils/form";

const defaultDims = {
  inputField: [150, 30],
  square: [50, 50],
};

export default function ImageTextInput(props) {
  const { className } = props;
  const onChange = props.onChange || (() => {});

  const dims = props.value?.dims || defaultDims[props.fieldType] || [50, 50];
  const [width, height] = dims;

  const setDims = (_dims) => onChange({ ...state, dims: _dims });
  // const setDims = (_dims) => {};

  const type = props.value?.type || 0;
  const data = props.value?.data || "";
  const setData = (_data) => onChange({ ...state, data: _data });

  const setType = (_type) => onChange({ ...state, type: _type });
  const [textData, setTextData] = useState((type === 0 && data) || "");

  const fileInputRef = useRef(null);
  const [imageData, setImageData] = useState((type === 1 && data) || "");
  const [imageUrl, setImageUrl] = useState((type === 2 && data) || null);

  const state = {
    "uc-image-text-component": true,
    dims,
    type,
    data,
  };

  useEffect(() => {
    if (type === 0) setTextData(data);
    else if (type === 1) setImageData(data);
    else {
      setImageUrl(data);
      setImageData("");
    }
  }, [type, data]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      let data;
      reader.onloadend = () => {
        data = reader.result;
        if (data) setData(data);
      };
      reader.readAsDataURL(file);
    }
  };
  // useEffect(() => {
  //   if (onChange) onChange(state);
  // }, [JSON.stringify(state)]);

  return (
    <Resizable onChange={({ dims }) => setDims(dims)}>
      <div
        className={"iti-container " + className}
        style={{ height: (height || 50) + "px", width: (width || 50) + "px" }}
      >
        <div className={"iti-options"}>
          <button onClick={() => setType((type + 1) % 2)}>
            {type === 1 ? "Image" : "Text"}
          </button>
        </div>
        {type === 0 ? (
          <textarea
            className={"iti-text"}
            key={"text"}
            onBlur={wireEventValue(setData)}
            defaultValue={textData}
          />
        ) : (
          <div
            onClick={() => fileInputRef.current.click()}
            className={"w-full h-full flex items-center justify-center"}
            style={{ background: imageData || imageUrl ? "none" : "#eee" }}
          >
            <input
              type={"file"}
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileUpload}
            />

            {(imageData || imageUrl) && (
              <img
                src={type === 1 ? imageData : imageUrl}
                className={"iti-image"}
              />
            )}
          </div>
        )}
      </div>
    </Resizable>
  );
}
