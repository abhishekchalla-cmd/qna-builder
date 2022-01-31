import React, { useContext, useEffect } from "react";
import { types } from "../questions";
import { PreviewContext } from "./PreviewContext";

export default function QuestionWrapper(props) {
  const { data: question, depth: _depth } = props;
  const depth = _depth || 0;
  let { type, data, children, marks, description, explanation } = question;
  description = description === "<p><br></p>" ? "" : description;

  const { checkAnswer } = useContext(PreviewContext);

  if (!type)
    return (
      <div
        style={{
          marginLeft: 10 * depth + "px",
        }}
      >
        No type selected
      </div>
    );
  else {
    const QuestionType = types[type];
    if (!QuestionType)
      return (
        <div
          style={{
            marginLeft: 10 * depth + "px",
          }}
        >
          Invalid type
        </div>
      );
    else {
      return (
        <div
          style={{
            marginLeft: 10 * depth + "px",
          }}
        >
          {description && (
            <div
              className={"text-4xl font-semibold mt-10 text-b px-10 pb-10"}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
          <QuestionType.component data={data} marks={marks} />
          {checkAnswer && explanation && (
            <div
              dangerouslySetInnerHTML={{ __html: explanation }}
              className={"text-4xl font-semibold mt-10 text-b px-10 pb-10"}
            />
          )}
          {children &&
            children.map((child) => (
              <QuestionWrapper data={child} depth={depth + 1} />
            ))}
        </div>
      );
    }
  }
}
