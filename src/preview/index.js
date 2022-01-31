import React, { useContext } from "react";
import PreviewContextProvider, {
  PreviewContext,
} from "./components/PreviewContext";
import QuestionWrapper from "./components/QuestionWrapper";
import "./assets/css/index.css";
import BlackArrow from "./assets/images/black-arrow.svg";

const PreviewMain = (props) => {
  const { checkAnswer, setCheckAnswer } = useContext(PreviewContext);

  return (
    <div>
      <QuestionWrapper data={props.data} />
      <div className="flex items-center justify-between sm:px-10">
        <button
          className="flex items-center justify-between px-12 border my-10 sm:w-80 rounded-xl"
          disabled={true}
        >
          <img
            src={BlackArrow}
            className="inline-block transform rotate-180 py-8 "
          />
          <p className="text-2xl text-green1 font-semibold hidden sm:block">
            Previous
          </p>
        </button>
        {!checkAnswer ? (
          <button
            className="flex items-center justify-between px-12 border bc-orange my-10 sm:w-80 rounded-xl"
            onClick={() => setCheckAnswer(true)}
          >
            <p className="text-2xl font-semibold hidden center sm:block py-6">
              Submit
            </p>
            {/*<img src={BlackArrow} className="py-8 " />*/}
          </button>
        ) : (
          <button
            className="flex items-center justify-between px-12 border bc-orange my-10 sm:w-80 rounded-xl"
            // onClick={() => setCheckAnswer(true)}
          >
            <p className="text-2xl font-semibold hidden sm:block">Next</p>
            <img src={BlackArrow} className="py-8 " />
          </button>
        )}
      </div>
    </div>
  );
};

const Preview = (props) => (
  <PreviewContextProvider>
    <PreviewMain {...props} />
  </PreviewContextProvider>
);

export default Preview;
