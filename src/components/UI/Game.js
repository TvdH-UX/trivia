import { useState } from "react";
import ScoreCounter from "./ScoreCounter";
import ResetButton from "./ResetButton";
import GameEnded from "./GameEnded";
import mySound from "../../correct.wav";
import useSound from "use-sound";
import Question from "../Questions/Question";
import AnswerButton from "./AnswerButton";

export const Game = ({ triviaData, resetGame }) => {
  //Re-named currentQuestion to currentQuestionIndex
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [chosenAnswer, setChosenAnswer] = useState(null);
  const [play] = useSound(mySound);
  const triviaSize = triviaData.length;
  const isPlaying = currentQuestionIndex < triviaSize - 1;
  const { question, answers, correctAnswer } = triviaData[currentQuestionIndex];

  const handleAnswerClick = (event) => {
    setChosenAnswer(event.target.value);
  };

  const handleResetClick = () => {
    resetGame();
  };

  const onNextButtonClick = () => {
    if (chosenAnswer === correctAnswer) {
      setCorrectAnswers((correctAnswers) => correctAnswers + 1);
      play();
    }
    setCurrentQuestionIndex((currentQuestionIndex) => currentQuestionIndex + 1);
    setChosenAnswer(null);
  };

  return isPlaying ? (
    <>
      <ScoreCounter
        correctAnswers={correctAnswers}
        triviaSize={triviaSize}
        currentQuestion={currentQuestionIndex}
      />
      {chosenAnswer ? <p>Correct answer: {correctAnswer}</p> : null}
      <Question question={question} />

      <div>
        <ul className="list">
          {triviaData &&
            answers.map((answer) => (
              <AnswerButton
                answer={answer}
                onClick={handleAnswerClick}
                isSelected={answer === chosenAnswer}
                isDisabled={chosenAnswer}
              />
            ))}
        </ul>
      </div>
      {chosenAnswer ? (
        <div className="nextBtn">
          <button onClick={onNextButtonClick}>Next</button>
        </div>
      ) : null}
      <ResetButton onClick={handleResetClick} isPlaying={isPlaying} />
    </>
  ) : (
    <div className="endScreen">
      <GameEnded correctAnswers={correctAnswers} triviaSize={triviaSize} />
      <ResetButton onClick={handleResetClick} isPlaying={isPlaying} />
    </div>
  );
};
