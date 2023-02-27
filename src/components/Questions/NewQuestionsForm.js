import styles from "./NewQuestionsForm.module.css";
import React, { useState } from "react";
import { useFetch } from "../../hooks/useFetch";

const NewQuestionsForm = ({ fetchData, setTriviaSize, isLoading }) => {
  const [amount, setAmount] = useState("10");
  const [difficulty, setDifficulty] = useState("");
  const [category, setCategory] = useState("");

  const { data } = useFetch("https://opentdb.com/api_category.php");

  const difficulties = [
    { difficulty: "Willekeurig", id: 0, value: "" },
    { difficulty: "Makkelijk", id: 1, value: "easy" },
    { difficulty: "Gemiddeld", id: 2, value: "medium" },
    { difficulty: "Moeilijk", id: 3, value: "hard" },
  ];

  const amountChangeHandler = (event) => {
    setAmount(event.target.value);
  };

  const difficultyChangeHandler = (event) => {
    setDifficulty("&difficulty=" + event.target.value);
    console.log(data);
  };

  const categoryChangeHandler = (event) => {
    setCategory("&category=" + event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    fetchData(
      `https://opentdb.com/api.php?amount=${amount}${category}${difficulty}`
    );
    setTriviaSize(amount);
  };

  return (
    <div className={styles.form_container}>
      <form onSubmit={submitHandler} className={styles.form_field}>
        <h2>Vul jouw Trivia voorkeuren in</h2>
        <div className={styles.form_item}>
          <label>Aantal vragen</label>
          <input
            type="number"
            min="1"
            placeholder="10"
            onChange={amountChangeHandler}
          />
        </div>
        <div className={styles.form_item}>
          <label>Categorie</label>
          <select onChange={categoryChangeHandler}>
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
          <select onChange={difficultyChangeHandler}>
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
