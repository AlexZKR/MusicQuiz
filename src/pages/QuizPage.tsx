import { useParams } from "react-router-dom";
import type { Quiz, QuizId } from "../models/quiz";
import { getQuiz } from "../services/quizService";
import NotFoundPage from "./NotFound";
import QuizQuestion from "../components/quiz/QuizQuestion";
import { useState } from "react";
import H1Heading from "../components/headings/H1Heading";
import H2HeadingSubtitle from "../components/headings/H2HeadingSubtitle";
import ButtonLink from "../components/links/ButtonLink";
import H3Heading from "../components/headings/H3Heading";

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

    return (
      <>
        <H1Heading>Quiz: {quiz.title}</H1Heading>

        {!isFinished
          ? QuizQuestionLayout(currQuestionIndex, quiz, handleAnswer)
          : QuizResultsLayout(quiz, userAnswers)}

        <ButtonLink
          className="hover:bg-blue-500 text-white font-semibold py-1 px-3 mx-3 rounded transition"
          to="/"
        >
          Go back to home page
        </ButtonLink>
      </>
    );
  } catch {
    return <NotFoundPage />;
  }
}

function QuizQuestionLayout(
  currQuestionIndex: number,
  quiz: Quiz,
  handleAnswer: (selectedIndex: number) => void
) {
  return (
    <>
      <H2HeadingSubtitle>
        Question #{currQuestionIndex + 1} out of {quiz.questions.length}
      </H2HeadingSubtitle>
      <QuizQuestion
        q={quiz.questions[currQuestionIndex]}
        onSubmitAnswer={handleAnswer}
      />
    </>
  );
}

function QuizResultsLayout(quiz: Quiz, userAnswers: number[]) {
  function countCorrectAnswers(): number {
    return userAnswers.filter(
      (selected, i) => selected === quiz.questions[i].answerIndex
    ).length;
  }

  return (
    <>
      <H3Heading>Quiz Complete!</H3Heading>
      <H2HeadingSubtitle>
        You got {countCorrectAnswers()} out of {quiz.questions.length} answers!
      </H2HeadingSubtitle>
    </>
  );
}
