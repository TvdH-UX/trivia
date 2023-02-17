const ScoreCounter = ({ correctAnswers, triviaSize, currentQuestion }) => {
  return (
    <div className="ui-element">
      <h3>Vraag: {currentQuestion}</h3>
      <h3>
        Score: {correctAnswers} / {triviaSize}
      </h3>
    </div>
  );
};

export default ScoreCounter;
