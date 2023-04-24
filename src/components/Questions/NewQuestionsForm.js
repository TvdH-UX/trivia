import styles from "./NewQuestionsForm.module.css";
import React from "react";
import { useFetch } from "../../hooks/useFetch";

const NewQuestionsForm = ({ fetchData, setTriviaSize, isLoading }) => {
  const { data } = useFetch("https://opentdb.com/api_category.php");

  const difficulties = [
    { difficulty: "Willekeurig", id: 0, value: "" },
    { difficulty: "Makkelijk", id: 1, value: "easy" },
    { difficulty: "Gemiddeld", id: 2, value: "medium" },
    { difficulty: "Moeilijk", id: 3, value: "hard" },
  ];

  const submitHandler = (event) => {
    event.preventDefault();
    const amount = event.target.questionAmount.value;
    const category = event.target.category.value;
    const difficulty = event.target.difficulty.value;
    const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`;
    fetchData(url);
  };

  return (
    <div className={styles.form_container}>
      <form onSubmit={submitHandler} className={styles.form_field}>
        <h2>Vul jouw Trivia voorkeuren in</h2>
        <div className={styles.form_item}>
          <label>Aantal vragen</label>
          <input
            name="questionAmount"
            type="number"
            min="1"
            placeholder="10"
            defaultValue={"10"}
          />
        </div>
        <div className={styles.form_item}>
          <label>Categorie</label>
          <select name="category">
            {data &&
              [{ id: 0, name: "Willekeurig" }, ...data.trivia_categories].map(
                (category) => (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                )
              )}
          </select>
        </div>
        <div className={styles.form_item}>
          <label>Moeilijkheid</label>
          <select name="difficulty">
            {difficulties.map((difficulty) => (
              <option value={difficulty.value} key={difficulty.id}>
                {difficulty.difficulty}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading" : "Haal vragen op 🐶⚾"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewQuestionsForm;
