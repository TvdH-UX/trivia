import styles from "./Description.module.css";

const Description = () => {
  return (
    <div className={styles.header}>
      <header>
        <h1>Qquest Trivia</h1>
      </header>
      {/* <div className={styles["description"]}>
        <p>Welkom op de Qquest Trivia quiz app!</p>
      </div> */}
    </div>
  );
};

export default Description;
