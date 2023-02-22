import "./App.css";
import Question from "./components/Questions/Question";
import AnswerButton from "./components/UI/AnswerButton";
import React, { useState } from "react";
import useSound from "use-sound";
import { useFetch } from "../src/hooks/useFetch";
import { toTriviaInformation } from "./components/Util/helpers";
import { useEffect } from "react";

import Description from "./components/UI/Description";
import Footer from "./components/Footer/Footer";
import NewQuestionsForm from "./components/Questions/NewQuestionsForm";
import ScoreCounter from "./components/UI/ScoreCounter";
import ResetButton from "./components/UI/ResetButton";
import GameEnded from "./components/UI/GameEnded";
import mySound from "./correct.wav";

// api no input
// https://opentdb.com/api.php?amount=10

// api full input *excl. category
// https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple

// api full input, first category
// https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple

// loading spinner maken terwijl aan het fetchen (traag internet) leuke spinner maken css
// Kijken naar error staat
// Categorieen ophalen met fetch functie
// Even laten zien welk antwoord wél goed was

function App() {
  const { data, isLoading, error, fetchData } = useFetch();
  const [triviaData, setTriviaData] = useState(null);

  //dit hoort eigenlijk in game component
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [triviaSize, setTriviaSize] = useState();
  const [isPlaying, setIsPlaying] = useState(true);
  const [chosenAnswer, setChosenAnswer] = useState(null);
  const [playSound] = useSound(mySound);

  useEffect(() => {
    if (data) {
      setTriviaData(toTriviaInformation(data.results));
    }
  }, [data]);

  const getTriviaLength = (amount) => {
    setTriviaSize(amount);
  };

  const handleAnswerClick = (event) => {
    console.log(event.target.value);
    // eerst iets met chosen answer
    setChosenAnswer(event.target.value);
    console.log(chosenAnswer);
    if (event.target.value === triviaData[currentQuestion].correctAnswer) {
      setCorrectAnswers((correctAnswers) => correctAnswers + 1);
      playSound();
    }
  };
  // console.log(chosenAnswer);

  const handleResetClick = () => {
    setTriviaData(null);
    setCurrentQuestion(0);
    setCorrectAnswers(0);
    setIsPlaying(true);
  };

  const onNextButtonClick = () => {
    // if (chosenAnswer === triviaData[currentQuestion].correctAnswer) {
    //   setCorrectAnswers((correctAnswers) => correctAnswers + 1);
    //   playSound();
    // }
    if (currentQuestion < triviaSize - 1) {
      setCurrentQuestion((currentQuestion) => currentQuestion + 1);
    } else {
      setIsPlaying(false);
    }
    setChosenAnswer(null);
  };

  // triviaData && console.log(triviaData);
  // omzetten naar een los component -> game component
  // end game state op basis van laatste vraag gehad?
  const render = (isPlaying) => {
    switch (isPlaying) {
      case true:
        return (
          <>
            <ScoreCounter
              correctAnswers={correctAnswers}
              triviaSize={triviaSize}
              currentQuestion={currentQuestion}
            />
            {/* Iets van hasAnswered om juiste antwoord te laten zien => */}
            {chosenAnswer ? (
              <p>Correct answer: {triviaData[currentQuestion].correctAnswer}</p>
            ) : null}
            <Question questions={triviaData[currentQuestion].question} />

            <div>
              <ul className="list">
                {triviaData &&
                  triviaData[currentQuestion].answers.map((answer) => (
                    <AnswerButton
                      answer={answer}
                      onClick={handleAnswerClick}
                      isSelected={answer === chosenAnswer}
                      isDisabled={chosenAnswer} // weer op null zetten naar volgende vraag
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
        );
      case false:
        return (
          <div className="endScreen">
            <GameEnded
              correctAnswers={correctAnswers}
              triviaSize={triviaSize}
            />
            <ResetButton onClick={handleResetClick} isPlaying={isPlaying} />
          </div>
        );
    }
  };
  //side effect -> data -> start game
  //
  return (
    <div>
      <Description />
      {/* {triviaData ? <Game triviaData={triviaData}/> : null} */}
      {triviaData ? (
        <>{render(isPlaying)}</>
      ) : (
        <>
          <NewQuestionsForm
            fetchData={fetchData}
            setTriviaSize={getTriviaLength}
            isLoading={isLoading}
          />
        </>
      )}
      <Footer />
    </div>
  );
}

export default App;

// oude probeersels 1
/*
// const [selectedID, setSelectedID] = useState();
  // const [answerArray, setAnswerArray] = useState(undefined);

  // useEffect(() => {
  //   fetchQuestions().then((data) => setAnswerArray(data));
  // }, []);

  // const handleAnswerClick = (event) => {
  //   setSelectedID(event.target.value);
  // };

  // console.log(answerArray);
  // console.log(selectedID);
  // // answerArray &&
  // //   answerArray.length > 0 &&
  // // console.log(answerArray["results"][0]);

  // return (
  //   <div>
  //     <Question />
  //     {answerArray &&
  //       answerArray["results"][0]["incorrect_answers"].map((answer) => {
  //         return (
  //           <AnswerButton
  //             answer={answer}
  //             onClick={handleAnswerClick}
  //             key={answer.id}
  //           />
  //         );
  //       })}
  //   </div>
  // );
*/

// oude probeersels 2
/*
  // const fetchQuestions = async () => {
  //   const respone = await fetch("https://opentdb.com/api.php?amount=10");
  //   return respone.json();
  // };

  // useEffect(() => {
  //   fetchQuestions().then((data) => setAnswerArray(data));
  // }, []);

  // console.log(answerArray);

  // useEffect(() => {
  //   async function fetchQuestions() {
  //     try {
  //       let response = await fetch("https://opentdb.com/api.php?amount=10");
  //       response = await response.json();
  //       response = response.results;
  //       dataSet(response);
  //     } catch (e) {
  //       console.log("fail");
  //     }
  //   }
  //   fetchQuestions();
  // });

  // console.log(data);
  */

// oude probeersels 3
/*
// const fetchQuestions = async () => {
//   const respone = await fetch(
//     "https://opentdb.com/api.php?amount=1&category=11&difficulty=medium&type=multiple"
//   );
//   return respone.json();
// };

// .then((response) => response.json())
// .then((data) => setAnswerArray(data));
*/

// oude probeersel 4
/*
// return (
  //   <div>
  //     <Question />
  //     {answerArray &&
  //       answerArray["results"][0]["incorrect_answers"].map((answer) => {
  //         return (
  //           <AnswerButton
  //             answer={answer}
  //             onClick={handleAnswerClick}
  //             key={answer.id}
  //           />
  //         );
  //       })}
  //   </div>
  // );
  */

// Werkende return backup
/*
return (
    <div>
      <Description />
      {renderTest()}
      {triviaEnded && <h1>Game ended</h1>}
      {data ? (
        <>
          <ScoreCounter
            correctAnswers={correctAnswers}
            triviaSize={triviaSize}
          />
          <Question questions={data[currentQuestion].question} />
          <AnswerButton
            answers={data[currentQuestion].answers}
            onClick={handleAnswerClick}
          />
          <ResetButton onClick={handleResetClick} />
        </>
      ) : (
        <>
          <NewQuestionsForm
            fetchQuestions={fetchData}
            setTriviaSize={getTriviaLength}
          />
          </>
          )}
          <Footer />
        </div>
      );
*/
