import { useParams } from 'react-router-dom';
import type { QuestionId, Quiz, QuizId } from '../models/quiz';
import { getQuiz } from '../services/quizService';
import NotFoundPage from './NotFound';
import ChooseOneQuestion from '../components/molecules/chooseOneQuestion/ChooseOneQuestion';
import { useState } from 'react';

import H1Heading from '../components/atoms/headings/H1Heading';
import StyledLink from '../components/atoms/links/StyledLink';
import H2HeadingSubtitle from '../components/atoms/headings/H2HeadingSubtitle';
import MultiSelectQuestion from '../components/molecules/chooseMultiQuestion/MultiSelectQuestion';
import { QuestionProgressList } from '../components/organisms/QuestionProgressList';
import { QuizResultsLayout } from '../components/organisms/QuizResultsLayout';

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
              ? QuizQuestionLayout(
                  currQuestionIndex,
                  quiz,
                  handleAnswer,
                  userAnswers
                )
              : QuizResultsLayout(quiz, userAnswers)}

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

function QuizQuestionLayout(
  currQuestionIndex: number,
  quiz: Quiz,
  handleAnswer: (selectedIndexes: number[]) => void,
  userAnswers: userAnswers
) {
  const q = quiz.questions[currQuestionIndex];
  function getQuestionType() {
    if (q.type === 'one-select') {
      return <ChooseOneQuestion q={q} onSubmitAnswer={handleAnswer} />;
    }
    return <MultiSelectQuestion q={q} onSubmitAnswer={handleAnswer} />;
  }
  return (
    <>
      <H2HeadingSubtitle className="text-tertiary mb-1 text-center">
        Question #{currQuestionIndex + 1} out of {quiz.questions.length}
      </H2HeadingSubtitle>
      <H2HeadingSubtitle className="text-tertiary bg-badge mx-auto mb-4 block max-w-fit rounded-2xl px-3 text-center">
        {q.type === 'one-select' ? 'select one' : 'select one or many'}
      </H2HeadingSubtitle>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Empty zone (spacer) */}
        <div></div>
        <section role="region" aria-label="Question prompt">
          {getQuestionType()}
        </section>
        <section role="region" aria-label="Question progress">
          <QuestionProgressList
            quiz={quiz}
            userAnswers={userAnswers}
            currQuestionIndex={currQuestionIndex}
          />
        </section>
      </div>
    </>
  );
}
