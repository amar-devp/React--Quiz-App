import { useCallback, useState } from "react";
import QUESTIONS from "../questions.js";
import quiz_complete from "../assets/quiz-complete.png";
import { Image } from "primereact/image";

import { Button } from "primereact/button";
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz() {
  const [answerState, setAnswerState] = useState("");
  const [userAnswer, setUserAnswer] = useState([]);

  const activeQuestionIndex =
    answerState === "" ? userAnswer.length : userAnswer.length - 1;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setAnswerState("answered");
      setUserAnswer((prevUserAnswer) => {
        return [...prevUserAnswer, selectedAnswer];
      });

      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizIsComplete) {
    return (
      <div className="summary">
        <Image
          src={quiz_complete}
          indicatorIcon={icon}
          alt="Image"
          preview
          width="250"
        />
        <h2>Quiz Completed</h2>
      </div>
    );
  }
  const shuffledAnswer = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswer.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000}
          onTimeout={handleSkipAnswer}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswer.map((answer) => {
            let cssClass ='';
            const isSelected = userAnswer[userAnswer.length-1] === answer;
            if(answerState === 'answered' && isSelected){
                cssClass = 'selected';
            }

            if((answerState==='correct' || answerState==='wrong')&&isSelected){
                cssClass={answerState};
            }

            return (
              <li key={answer} className="answer list-none">
                {/* <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button> */}
                <Button label={answer} severity="info" className={cssClass} rounded />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
