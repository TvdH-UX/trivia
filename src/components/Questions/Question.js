import Card from "../UI/Card";
import styles from "./Question.module.css";
import { createMarkup, parsePunctuation } from "../Util/helpers";

const Question = ({ question }) => (
  <Card className={styles.question}>
    <h3>{parsePunctuation(question)}</h3>
  </Card>
);

export default Question;
