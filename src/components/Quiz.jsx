import { useCallback, useState } from "react";
import QUSTIONS from "../qustions";
import quizCompleteImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QustionTimer";

export default function Quiz() {
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);
  const timeout = 10000;
  const activeQustionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;

  const quizIsComplete = activeQustionIndex === QUSTIONS.length;

  const handleSelectAnswer = useCallback(
    (selectedAnswer) => {
      setAnswerState("answered");
      setUserAnswers((preState) => {
        return [...preState, selectedAnswer];
      });

      setTimeout(() => {
        if (selectedAnswer === QUSTIONS[activeQustionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }
        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQustionIndex]
  );

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
  const shuffledAnswers = [...QUSTIONS[activeQustionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="qustion">
        <QuestionTimer
          key={activeQustionIndex}
          timeout={timeout}
          onTimeout={handleSkipAnswer}
        />
        <h2>{QUSTIONS[activeQustionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => {
            const isSelected = userAnswers[userAnswers.length - 1] === answer;
            let cssClasses = "";

            if (answerState === "answered" && isSelected) {
              cssClasses = "selected";
            }
            if (
              answerState === "correct" ||
              (answerState === "wrong" && isSelected)
            ) {
              cssClasses = answerState;
            }

            return (
              <li key={answer} className="answer">
                <button
                  onClick={() => handleSelectAnswer(answer)}
                  className={cssClasses}
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

// key={activeQustionIndex} -- варто знати
//  1-Зробити прогрес барр внизу форми з прогресом на 15 секунд
// Якщо час вийшов то переходимо до наступного питання
