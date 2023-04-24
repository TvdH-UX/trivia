import "./AnswerButton.css";
import React, { useState } from "react";
import { createMarkup } from "../Util/helpers";

const AnswerButton = ({ answer, onClick, isSelected, isDisabled }) => {
  return (
    <button
      disabled={isDisabled}
      className={isDisabled && !isSelected ? "wrongAnswer" : "answerBtn"}
      onClick={onClick}
      key={Math.random()}
      value={answer}
    >
      {answer}
    </button>
  );
};

export default AnswerButton;
