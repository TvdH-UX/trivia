import Card from "../UI/Card";
import styles from "./Question.module.css";
import { createMarkup } from "../Util/helpers";

const Question = ({ question }) => (
  <Card className={styles.question}>
    <h3>{question}</h3>
  </Card>
);

export default Question;
