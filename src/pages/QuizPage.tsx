import { useParams } from 'react-router-dom';
import type { QuestionId, QuizId } from '../models/quiz';
import { getQuiz } from '../services/quizService';
import NotFoundPage from './NotFound';
import { useState } from 'react';

import H1Heading from '../components/atoms/headings/H1Heading';
import StyledLink from '../components/atoms/links/StyledLink';
import { QuizQuestionTemplate } from '../components/templates/QuizQuestionTemplate';
import { QuizResultsTemplate } from '../components/templates/QuizResultsTemplate';

export type userAnswers = {
  quizId: QuizId;
  answers: Map<QuestionId, number[]>;
};

export default function QuizPage() {
  const { id } = useParams<{ id: QuizId }>();

  const [currQuestionIndex, SetCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<userAnswers>({
    quizId: id!, // id is always defined, router routes to this page only if there is id
    answers: new Map<QuestionId, number[]>(),
  });
  const [isFinished, SetIsFinished] = useState<boolean>(false);

  try {
    const quiz = getQuiz(id!);

    function handleAnswer(selectedIndexes: number[]) {
      const currQuestionid = quiz.questions[currQuestionIndex].id;

      setUserAnswers((prev) => {
        const nextMap = new Map(prev.answers);
        nextMap.set(currQuestionid, selectedIndexes);

        return {
          ...prev,
          answers: nextMap,
        };
      });

      if (currQuestionIndex + 1 < quiz.questions.length) {
        SetCurrentQuestionIndex(currQuestionIndex + 1);
      } else {
        SetIsFinished(true);
      }
    }

    return (
      <>
        <div className="flex min-h-screen flex-col">
          <div className="flex-grow px-4 py-6">
            <H1Heading>Quiz: {quiz.title}</H1Heading>

            {!isFinished
              ? QuizQuestionTemplate(
                  currQuestionIndex,
                  quiz,
                  handleAnswer,
                  userAnswers
                )
              : QuizResultsTemplate(quiz, userAnswers)}

            <StyledLink
              className="hover:bg-surface text-content mx-auto mt-4 inline-block rounded p-3 font-semibold transition"
              to="/"
            >
              Go back to home page
            </StyledLink>
          </div>
        </div>
      </>
    );
  } catch {
    return <NotFoundPage />;
  }
}
