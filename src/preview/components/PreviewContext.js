import React, { createContext, useEffect, useState } from "react";

export const PreviewContext = createContext();

const PreviewContextProvider = (props) => {
  const [checkAnswer, setCheckAnswer] = useState(false);
  const [marks, setMarks] = useState(0);

  let marksBuffer = marks;
  const addMarks = (additionalMarks = 0) => {
    marksBuffer += additionalMarks;
    console.log("Adding marks", marksBuffer);
    setMarks(marksBuffer);
  };

  useEffect(() => {
    if (!checkAnswer) setMarks(0);
  }, [checkAnswer]);

  return (
    <PreviewContext.Provider
      value={{
        marks,
        addMarks,
        checkAnswer,
        setCheckAnswer,
      }}
    >
      {props.children}
    </PreviewContext.Provider>
  );
};

export default PreviewContextProvider;
