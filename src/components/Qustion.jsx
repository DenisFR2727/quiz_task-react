import Answers from "./Answers";
import QuestionTimer from "./QustionTimer";

export default function Qustion({
  timeout,
  qustionText,
  answers,
  onSelectAnswer,
  selectedAnswer,
  answerState,
  onSkipAnswer,
}) {
  return (
    <div id="qustion">
      <QuestionTimer timeout={timeout} onTimeout={onSkipAnswer} />
      <h2>{qustionText}</h2>
      <Answers
        answers={answers}
        selectedAnswer={selectedAnswer}
        answerState={answerState}
        onSelect={onSelectAnswer}
      />
    </div>
  );
}
// Qustion
