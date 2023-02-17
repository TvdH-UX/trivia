import Card from "../UI/Card";
// import "./Question.css";
import styles from "./Question.module.css";
import { createMarkup } from "../Util/helpers";

const Question = (props) => {
  let question = props.questions;

  return (
    <Card className={styles.question}>
      <h3 dangerouslySetInnerHTML={createMarkup(question)}></h3>
    </Card>
  );
};

export default Question;
