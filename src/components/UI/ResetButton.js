import styles from "./ResetButton.module.css";

const ResetButton = ({ onClick, isPlaying }) => {
  return isPlaying ? (
    <div className="ui-element">
      <button className={styles["resetBtn"]} onClick={onClick}>
        🗑
      </button>
    </div>
  ) : (
    <div>
      <button onClick={onClick}>Start nieuw spel</button>
    </div>
  );
};

export default ResetButton;

/*
{gameState"Playing" ? (
      <div className="ui-element">
        <button className={styles["resetBtn"]} onClick={onClick}>
          🗑
        </button>
      </div>

    ) : (
      <div>
        <button className={styles["resetBtn"]} onClick={onClick}>
          Start nieuw spel
        </button>
      </div>
    )}
*/
