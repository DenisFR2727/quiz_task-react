import { useCallback, useState } from "react";
import QUSTIONS from "../qustions";
import quizCompleteImg from "../assets/quiz-complete.png";
import Qustion from "./Qustion";

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

  //   console.log(xccc);

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

  return (
    <div id="quiz">
      <Qustion
        key={activeQustionIndex}
        timeout={timeout}
        qustionText={QUSTIONS[activeQustionIndex].text}
        answers={QUSTIONS[activeQustionIndex].answers}
        answerState={answerState}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}

// key={activeQustionIndex} -- варто знати для того що б відтворити компонент або ж знищити . Це для компонента !  Окремий випадок
//  1-Зробити прогрес барр внизу форми з прогресом на 15 секунд
// Якщо час вийшов то переходимо до наступного питання

// .eslintrc.cjs
