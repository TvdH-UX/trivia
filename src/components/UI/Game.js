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
  //re-named this to 'play' instead of 'playSound'
  const [play] = useSound(mySound);

  //We don't need side-effects for triviaSize and isPlaying so we can stop using useState
  const triviaSize = triviaData.length;
  const isPlaying = currentQuestionIndex < triviaSize - 1;

  //find current trivia object based on currentQuestionIndex and destructure properties
  //This way you don't need to repeat triviaData[currentQuestion].whatEverYouNeedHere
  const { question, answers, correctAnswer } = triviaData[currentQuestionIndex];

  const handleAnswerClick = (event) => {
    setChosenAnswer(event.target.value);
  };

  const handleResetClick = () => {
    //Resetgame is now handled by setting Triviadata to null in App.js
    //As this component gets unmounted when Triviadata is null we don't need to reset currentQuestionIndex,
    //correctAnswers and chosenAnswer anymore
    resetGame();
  };

  const onNextButtonClick = () => {
    // setChosenAnswer(null);
    // //The next button will only show when playing so this check is redundant
    // if (isPlaying) {
    //   //chosenAnswer will always be null (setChosenAnswer(null);) and thus the answer will always be incorrect
    //   if (chosenAnswer === correctAnswer) {
    //     setCorrectAnswers((correctAnswers) => correctAnswers + 1);
    //     play();
    //   }
    //   setCurrentQuestionIndex(
    //     (currentQuestionIndex) => currentQuestionIndex + 1
    //   );
    // }
    if (chosenAnswer === correctAnswer) {
      setCorrectAnswers((correctAnswers) => correctAnswers + 1);
      play();
    }
    setCurrentQuestionIndex((currentQuestionIndex) => currentQuestionIndex + 1);
    setChosenAnswer(null);
  };

  //I created a ternary instead of the previous render function
  //Functions within components are created on each render and can lead to performance issues
  //https://stackoverflow.com/questions/41369296/react-functions-inside-render

  return isPlaying ? (
    <>
      <ScoreCounter
        correctAnswers={correctAnswers}
        triviaSize={triviaSize}
        currentQuestion={currentQuestionIndex}
      />
      {/* Iets van hasAnswered om juiste antwoord te laten zien => */}
      {/* Just a nitpick: Re-named to question instead of questions */}
      <Question question={question} />

      <div>
        <ul className="list">
          {triviaData &&
            answers.map((answer) => (
              // With all these different type of buttons I think we can create a re-usable Button for all these cases
              <AnswerButton
                answer={answer}
                onClick={handleAnswerClick}
                isSelected={answer === chosenAnswer}
                isDisabled={chosenAnswer}
              />
            ))}
        </ul>
      </div>
      {chosenAnswer ? <button onClick={onNextButtonClick}>Next</button> : null}
      <ResetButton onClick={handleResetClick} isPlaying={isPlaying} />
    </>
  ) : (
    <div className="endScreen">
      <GameEnded correctAnswers={correctAnswers} triviaSize={triviaSize} />
      <ResetButton onClick={handleResetClick} isPlaying={isPlaying} />
    </div>
  );
};
