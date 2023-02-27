// Use map to transform the received answer options into dynamically generated buttons
// map is similar to a for.. each item of an array

// Example from course:
// {props.items.map((expense) => (
//   <ExpenseItem
//     title={expense.title}
//     amount={expense.amount}
//     date={expense.date}
//   />
// ))}
import "./AnswerButton.css";
import React, { useState } from "react";
import { createMarkup } from "../Util/helpers";

/*
This component should update whenever we've clicked one of the answers
It should then conditionally load in the next set of answers
Use state
*/

const AnswerButton = ({ answer, onClick, isSelected, isDisabled }) => {
  // console.log(isSelected);
  return (
    <button
      disabled={isDisabled}
      className={isDisabled && !isSelected ? "wrongAnswer" : "answerBtn"}
      // className="answer_btn" //stijl op basis van is geselecteerd
      onClick={onClick}
      key={Math.random()}
      value={answer}
      dangerouslySetInnerHTML={createMarkup(answer)}
    ></button>
  );
};

export default AnswerButton;
