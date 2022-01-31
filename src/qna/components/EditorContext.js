import React, { createContext, useState } from "react";
import { pseudoToPath, ensafe, findItems } from "../utils/function";
import axios from "axios";

export const EditorContext = createContext();

const EditorContextProvider = (props) => {
  const [currentPath, setPath] = useState("root");

  const [head, setHead] = useState(
    props.data || {
      data: "",
      children: [],
      type: "",
      marks: 0,
    }
  );

  const getQuestion = (path) => {
    path = pseudoToPath(path);
    return ensafe(() => eval(`head${path}`));
  };

  const addQuestion = (path) => {
    path = pseudoToPath(path);
    const _head = { ...head };
    const parent = ensafe(() => eval(`_head${path}`));
    if (parent) {
      if (!parent.children) parent.children = [];
      parent.children.push({ data: "", children: [], type: "" });
      setHead(_head);
    } else console.error("The parent doesn't exist");
  };

  const updateQuestion = (path, key, value) => {
    path = pseudoToPath(path);
    const question = ensafe(() => eval(`head${path}`));
    if (question) {
      question[key] = value;
      setHead({ ...head });
    } else console.error("Question doesn't exist");
  };

  const updateQuestionDescription = (path, description) => {
    updateQuestion(path, "description", description);
  };

  const updateQuestionData = (path, data) => updateQuestion(path, "data", data);

  const updateQuestionType = (path, type) => updateQuestion(path, "type", type);

  const updateQuestionMarks = (path, marks) =>
    updateQuestion(path, "marks", marks);

  const updateQuestionExplanation = (path, explanation) =>
    updateQuestion(path, "explanation", explanation);

  const removeQuestion = (path) => {
    const originalPath = path;
    path = pseudoToPath(path);
    const _head = { ...head };
    const question = ensafe(() => eval(`_head${path}`));
    if (question) {
      if (originalPath.toLowerCase() !== "root") {
        const pathSplit = path.split(".");
        const parentPath = pathSplit.slice(0, pathSplit.length - 1).join(".");
        const parent = ensafe(() => eval(`_head${parentPath}`));

        const originalPathSplit = originalPath.split(".");
        const childIndex = Number(
          originalPathSplit[originalPathSplit.length - 1]
        );
        parent.children.splice(childIndex, 1);

        setHead(_head);
      } else console.error("Cannot remove root question");
    } else console.error("Question doesn't exist");
  };

  const uploadImages = () =>
    new Promise((res, rej) => {
      const _head = { ...head };

      const results = findItems(
        _head,
        (obj) => obj["uc-image-text-component"] && obj.type == 1
      );
      const finish = res;
      let completed = 0;
      if (results.length === 0) {
        res();
        return;
      }
      for (const result of results) {
        fetch(result.data)
          .then((e) => e.blob())
          .then((blob) => {
            const formData = new FormData();
            formData.append("file", blob);
            axios
              .post(
                "https://api.testing.classzone.in/util/uploadMedia",
                formData
              )
              .then(({ data }) => {
                result.type = 2;
                result.data = data.src;
                completed++;
                if (completed === results.length) finish();
              });
          });
      }
    });

  return (
    <EditorContext.Provider
      value={{
        currentPath,
        setPath,
        head,
        setHead,
        getQuestion,
        addQuestion,
        updateQuestionDescription,
        updateQuestionData,
        updateQuestionType,
        updateQuestionMarks,
        updateQuestionExplanation,
        removeQuestion,
        uploadImages,
      }}
    >
      {props.children}
    </EditorContext.Provider>
  );
};

export default EditorContextProvider;
