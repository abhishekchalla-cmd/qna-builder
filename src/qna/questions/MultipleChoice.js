import React, { useEffect, useRef, useState } from "react";
import { wireEventValue } from "../utils/form";
import { toggleValue } from "../utils/array";
import initImageResize from "../components/CKEditorImageResizePlugin";
import ImageTextInput from "../components/ImageTextInput";
// import SimpleUploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter";

const MultipleChoice = ({ type, update, data }) => {
  const isSingle = type === "single";
  const isMultiple = type === "multiple";
  const isInput = type === "input";

  const id = useRef(new Date().getTime());

  // const [options, setOptions] = useState([]);
  const { question } = data;
  const options = question?.options;
  const setOptions = (newOptions) =>
    update({ ...data, question: { ...data.question, options: newOptions } });

  const addOption = (label, value) => {
    const id = new Date().getTime();
    if (type != "input") value = id + "";
    setOptions([...(options || []), { label, value, id }]);
  };
  const removeOption = (id) => setOptions(options.filter((e) => e.id !== id));
  const updateOption = (id, props) =>
    setOptions(
      options.map((e) => {
        if (e.id === id) return { ...e, ...props };
        else return e;
      })
    );
  // const getOptionById = (id) => options.find((o) => o.id === id);

  // const [answer, _setAnswer] = useState([]);
  const answer = data.answer || [];
  const _setAnswer = (ans) => update({ ...data, answer: ans });
  const setAnswer = (optionId) => {
    console.log(answer, optionId);
    if (!isSingle) _setAnswer(toggleValue(answer, optionId));
    else _setAnswer(optionId);
  };

  return (
    <div className="flex">
      <div name="controller w-50">
        <button onClick={() => addOption()}>Add option</button>
        {options &&
          options.map((option) => {
            const update = (props) => updateOption(option.id, props);
            return (
              <div className="flex" key={option.id}>
                {type !== "input" && (
                  <input
                    type={type === "multiple" ? "checkbox" : "radio"}
                    name={id.current}
                    value={option.value}
                    onBlur={wireEventValue(setAnswer)}
                    defaultChecked={
                      answer === option.value || answer?.includes(option.value)
                    }
                  />
                )}
                {/*<input*/}
                {/*  type="text"*/}
                {/*  onBlur={wireEventValue((label) => update({ label }))}*/}
                {/*  placeholder="Option Label"*/}
                {/*  className="w-40"*/}
                {/*  defaultValue={option.label}*/}
                {/*/>*/}
                <ImageTextInput
                  onChange={(label) => update({ label })}
                  value={option.label}
                  fieldType={"inputField"}
                />
                {type == "input" && (
                  <input
                    type="text"
                    onBlur={wireEventValue((value) => update({ value }))}
                    placeholder={
                      type === "input" ? "Correct answer" : "Option Value"
                    }
                    className="w-40"
                    defaultValue={option.value}
                  />
                )}
                <button onClick={() => removeOption(option.id)}>Remove</button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MultipleChoice;
