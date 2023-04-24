import "./App.css";

import React, { useState } from "react";
import { Game } from "./components/UI/Game";
import { useFetch } from "../src/hooks/useFetch";
import { toTriviaInformation } from "./components/Util/helpers";
import { useEffect } from "react";

import Description from "./components/UI/Description";
import Footer from "./components/Footer/Footer";
import NewQuestionsForm from "./components/Questions/NewQuestionsForm";

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
