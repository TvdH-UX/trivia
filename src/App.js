import "./App.css";

import React, { useState } from "react";
import { Game } from "./components/UI/Game";
import { useFetch } from "../src/hooks/useFetch";
import { toTriviaInformation } from "./components/Util/helpers";
import { useEffect } from "react";

import Description from "./components/UI/Description";
import Footer from "./components/Footer/Footer";
import NewQuestionsForm from "./components/Questions/NewQuestionsForm";

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
  const { data, isLoading, fetchData } = useFetch();
  const [triviaData, setTriviaData] = useState(null);

  useEffect(() => {
    if (data) {
      setTriviaData(toTriviaInformation(data.results));
    }
  }, [data]);

  const resetGame = () => {
    setTriviaData(null);
  };

  return (
    <div>
      <Description />
      {triviaData ? (
        <Game triviaData={triviaData} resetGame={resetGame} />
      ) : (
        <NewQuestionsForm fetchData={fetchData} isLoading={isLoading} />
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
