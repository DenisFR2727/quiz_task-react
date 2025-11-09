import { useCallback, useState } from "react";
import QUSTIONS from "../qustions";
import quizCompleteImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QustionTimer";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const timeout = 15000;
  const activeQustionIndex = userAnswers.length;

  const quizIsComplete = activeQustionIndex === QUSTIONS.length;

  const handleSelectAnswer = useCallback((answer) => {
    setUserAnswers((preState) => {
      return [...preState, answer];
    });
  }, []);

  console.log(userAnswers);

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="trophy icon" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }
  const shuffedAnswers = [...QUSTIONS[activeQustionIndex].answers];
  shuffedAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="qustion">
        <QuestionTimer timeout={10000} onTimeout={handleSkipAnswer} />
        <h2>{QUSTIONS[activeQustionIndex].text}</h2>
        <ul id="answers">
          {QUSTIONS[activeQustionIndex].answers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

//  1-Зробити прогрес барр внизу форми з прогресом на 15 секунд
// Якщо час вийшов то переходимо до наступного питання
