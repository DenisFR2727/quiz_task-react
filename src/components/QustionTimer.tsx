// @ts-nocheck

import { useEffect, useState } from "react";

export default function QuestionTimer({ timeout, onTimeout }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    console.log("time setting timeout");
    setTimeout(() => {
      onTimeout();
    }, timeout);
  }, [timeout, onTimeout]);

  useEffect(() => {
    console.log("set interval");
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 100);
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <progress id="question-time" value={remainingTime} max={timeout} />;
}
