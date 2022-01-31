import React, { useContext, useEffect, useState } from "react";
import QuestionWrapper from "./components/QuestionWrapper";
import EditorContextProvider, {
  EditorContext,
} from "./components/EditorContext";
import Preview from "../preview";
import "./assets/css/index.css";
import { DndProvider } from "react-dnd";
import MultiBackend from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/dist/esm/HTML5toTouch";

const EditorMain = () => {
  const { currentPath, setPath, setHead, head, uploadImages } =
    useContext(EditorContext);
  const splitPath = currentPath.split(".");

  const [saved, setSaved] = useState(true);
  useEffect(() => {
    if (saved) setSaved(false);
  }, [JSON.stringify(head)]);

  const saveChanges = async () => {
    await uploadImages();
    setHead({ ...head });
    setSaved(true);
    console.log(head);
  };

  const initialName = "root";

  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className={"editor-container"}>
      {/*Breadcrumbs*/}
      <div className={"flex"}>
        <button onClick={() => setShowPreview(!showPreview)}>
          {showPreview ? "Edit" : "Preview"}
        </button>
        <div className={"flex"}>
          {splitPath.map((route, index) => (
            <span
              onClick={() => setPath(splitPath.slice(0, index + 1).join("."))}
            >
              <b>{route === "root" ? "Main" : `#${Number(route) + 1}`}</b> &gt;
            </span>
          ))}
        </div>
      </div>

      {/*QuestionWrapper*/}
      {!showPreview ? (
        <QuestionWrapper name={initialName} question={head} />
      ) : (
        <Preview data={head} />
      )}

      {/*Submit Button*/}
      <button disabled={saved} onClick={saveChanges}>
        {saved ? "Saved" : "Save changes"}
      </button>
    </div>
  );
};

const Editor = () => (
  <DndProvider backend={MultiBackend} options={HTML5toTouch}>
    <EditorContextProvider>
      <EditorMain />
    </EditorContextProvider>
  </DndProvider>
);

export default Editor;
