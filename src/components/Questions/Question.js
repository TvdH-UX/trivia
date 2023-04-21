import Card from "../UI/Card";
// import "./Question.css";
import styles from "./Question.module.css";
import { createMarkup } from "../Util/helpers";

//Tiny improvement but a nice pattern to destruct props in this way in my opinion (unless you have a huge list of props ofcourse)
const Question = ({ question }) => (
  <Card className={styles.question}>
    <h3>{question}</h3>
  </Card>
);

export default Question;
