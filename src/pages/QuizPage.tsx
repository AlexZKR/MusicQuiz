import { useParams } from "react-router-dom";
import type { QuizId } from "../models/quiz";
import { getQuiz } from "../services/quizService";
import NotFoundPage from "./NotFound";
import QuizQuestion from "../components/Quiz/QuizQuestion";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function QuizPage() {
  const { id } = useParams<{ id: QuizId }>();

  const [currQuestionIndex, SetCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [isFinished, SetIsFinished] = useState<boolean>(false);

  try {
    const quiz = getQuiz(id!); // id is always defined, router routes to this page only if there is id

    function handleAnswer(selectedIndex: number) {
      const updatedAnswers = [...userAnswers, selectedIndex];
      setUserAnswers(updatedAnswers);

      if (currQuestionIndex + 1 < quiz.questions.length) {
        SetCurrentQuestionIndex(currQuestionIndex + 1);
      } else {
        SetIsFinished(true);
      }
    }

    function countCorrectAnswers(): number {
      return userAnswers.filter(
        (selected, i) => selected === quiz.questions[i].answerIndex
      ).length;
    }

    return (
      <>
        <h1>Quiz: {quiz.title}</h1>
        <h2>
          {!isFinished
            ? `Question #${currQuestionIndex + 1} out of ${
                quiz.questions.length
              }`
            : ""}
        </h2>

        {!isFinished ? (
          <QuizQuestion
            q={quiz.questions[currQuestionIndex]}
            onSubmitAnswer={handleAnswer}
          />
        ) : (
          <div>
            <h3>Quiz Complete!</h3>
            <p>
              You got {countCorrectAnswers()} out of {quiz.questions.length}{" "}
              answers!
            </p>
          </div>
        )}
        <Link to="/">Go back to home page</Link>
      </>
    );
  } catch {
    return <NotFoundPage />;
  }
}
