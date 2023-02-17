import ResetButton from "./ResetButton";

const GameEnded = ({ correctAnswers, triviaSize }) => {
  return (
    <div>
      <h2>
        Je hebt {correctAnswers} van de {triviaSize} vragen goed beantwoord!{" "}
        {correctAnswers < triviaSize / 2 + 1
          ? "Helaas, volgende keer beter."
          : "Lekker bezig!"}
      </h2>
    </div>
  );
};

export default GameEnded;
