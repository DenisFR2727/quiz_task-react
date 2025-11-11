import { useCallback, useState } from "react";
import QUSTIONS from "../qustions";
// import quizCompleteImg from "../assets/quiz-complete.png";
import Qustion from "./Qustion";
import Summary from "./Summary";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

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
    return <Summary userAnswers={userAnswers} />;
  }

  return (
    <div id="quiz">
      <Qustion
        key={activeQustionIndex}
        index={activeQustionIndex}
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
