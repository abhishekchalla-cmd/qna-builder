import React, { useContext, useEffect, useRef, useState } from "react";
import { types } from "../questions";
import { wireEventValue } from "../utils/form";
import { EditorContext } from "./EditorContext";

import Editor from "./Editor";

const QuestionWrapper = ({ question, name }) => {
  const editorCtx = useContext(EditorContext);
  const {
    addQuestion,
    updateQuestionDescription,
    updateQuestionData,
    updateQuestionMarks,
    updateQuestionExplanation,
    removeQuestion,
    currentPath,
    setPath,
  } = editorCtx;

  const isVisible = name === currentPath;

  // EDITOR
  const questionType = question.type;
  const qDescription = question.description;
  const qExplanation = question.explanation;
  const QuestionType = questionType && types[questionType];

  const updateQuestionType = (newType) => {
    editorCtx.updateQuestionData(name, {});
    editorCtx.updateQuestionType(name, newType);
  };

  const editor = isVisible ? (
    <div>
      <div className="header">
        <select
          onChange={wireEventValue(updateQuestionType)}
          value={questionType}
        >
          <option value="">Choose an option</option>
          {Object.keys(types).map((key) => (
            <option value={key}>{types[key].name}</option>
          ))}
        </select>

        <input
          type={"number"}
          onBlur={wireEventValue((value) => updateQuestionMarks(name, value))}
          placeholder={"Marks"}
          defaultValue={question.marks || ""}
        />

        <Editor
          onChange={(value) => {
            updateQuestionDescription(name, value);
          }}
          dep={currentPath}
          value={qDescription}
          id={name + "-description"}
        />
        <div style={{ height: "30px" }} />

        {QuestionType ? (
          <QuestionType.component
            {...(QuestionType.props || {})}
            key={name}
            data={question.data}
            update={(data) => updateQuestionData(name, data)}
          />
        ) : (
          "No component selected"
        )}

        <div style={{ height: "30px" }} />

        <Editor
          onChange={(value) => updateQuestionExplanation(name, value)}
          dep={currentPath}
          value={qExplanation}
          id={name + "-explanation"}
        />
      </div>
    </div>
  ) : (
    ""
  );

  // CHILDREN LIST

  const childrenList = isVisible && question.children && (
    <div>
      {question.children.map((childQuestion, index) => (
        <div className={"child-question justify-between flex"}>
          <div>
            <b>#{index + 1}</b> {childQuestion.label}
          </div>
          <div>
            <button onClick={() => setPath(`${name}.${index}`)}>Open</button>
            <button onClick={() => removeQuestion(`${name}.${index}`)}>
              Remove
            </button>
          </div>
        </div>
      ))}
      <button onClick={() => addQuestion(name)}>Add sub question</button>
    </div>
  );

  // CHILDREN

  // todo: render only the selected element and not all children
  const children = question.children
    ? question.children.map((childQuestion, index) => (
        <QuestionWrapper question={childQuestion} name={`${name}.${index}`} />
      ))
    : "";

  return (
    <>
      {editor}
      {childrenList}
      {children}
    </>
  );
};

export default QuestionWrapper;
