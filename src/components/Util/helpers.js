export const createMarkup = (string) => {
  return { __html: string };
};

const randomizeAnswers = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const toTriviaInformation = (triviaData) => {
  return triviaData.map((data) => {
    const randomizedAnswers = randomizeAnswers([
      data.correct_answer,
      ...data.incorrect_answers,
    ]);
    return {
      question: data.question,
      answers: randomizedAnswers,
      correctAnswer: data.correct_answer,
    };
  });
};
