import { useCallback, useRef, useState } from "react";
import QUSTIONS from "../qustions";
import quizCompleteImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QustionTimer";
import Answers from "./Answers";

export default function Quiz() {
  const shuffledAnswers = useRef();
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
  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...QUSTIONS[activeQustionIndex].answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <div id="quiz">
      <div id="qustion">
        <QuestionTimer
          key={activeQustionIndex}
          timeout={timeout}
          onTimeout={handleSkipAnswer}
        />
        <h2>{QUSTIONS[activeQustionIndex].text}</h2>
        <Answers />
      </div>
    </div>
  );
}

// key={activeQustionIndex} -- варто знати
//  1-Зробити прогрес барр внизу форми з прогресом на 15 секунд
// Якщо час вийшов то переходимо до наступного питання
