import { useCallback, useState } from "react";
import QUSTIONS from "../qustions";
import quizCompleteImg from "../assets/quiz-complete.png";
import Qustion from "./Qustion";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const timeout = 10000;
  const activeQustionIndex = userAnswers.length;
  const quizIsComplete = activeQustionIndex === QUSTIONS.length;

  const handleSelectAnswer = useCallback((selectedAnswer) => {
    setUserAnswers((preState) => {
      return [...preState, selectedAnswer];
    });
  }, []);

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
        index={activeQustionIndex}
        timeout={timeout}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}

// key={activeQustionIndex} -- варто знати для того що б відтворити компонент або ж знищити . Це для компонента !  Окремий випадок
//  1-Зробити прогрес барр внизу форми з прогресом на 15 секунд
// Якщо час вийшов то переходимо до наступного питання
// git pull
// .eslintrc.cjs
