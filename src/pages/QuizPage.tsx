import { useParams } from 'react-router-dom';
import type { Quiz, QuizId } from '../models/quiz';
import { getQuiz } from '../services/quizService';
import NotFoundPage from './NotFound';
import QuizQuestion from '../components/quiz/QuizQuestion';
import { useState } from 'react';
import H1Heading from '../components/headings/H1Heading';
import H2HeadingSubtitle from '../components/headings/H2HeadingSubtitle';
import ButtonLink from '../components/links/ButtonLink';
import H3Heading from '../components/headings/H3Heading';
import QuestionLiMember from '../components/quiz/QuestionLiMember';

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

            <ButtonLink
              className="hover:bg-surface text-content mx-auto mt-4 inline-block rounded p-3 font-semibold transition"
              to="/"
            >
              Go back to home page
            </ButtonLink>
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
  handleAnswer: (selectedIndex: number) => void,
  userAnswers: number[]
) {
  return (
    <>
      <H2HeadingSubtitle>
        Question #{currQuestionIndex + 1} out of {quiz.questions.length}
      </H2HeadingSubtitle>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Empty zone (spacer) */}
        <div></div>
        <section role="region" aria-label="Question prompt">
          <QuizQuestion
            q={quiz.questions[currQuestionIndex]}
            onSubmitAnswer={handleAnswer}
          />
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

type QuestionProgressListProps = {
  quiz: Quiz;
  userAnswers: number[];
  currQuestionIndex: number;
};

function QuestionProgressList({
  quiz,
  userAnswers,
  currQuestionIndex,
}: QuestionProgressListProps) {
  return (
    <>
      <div className="border-muted mx-4 flex flex-col rounded-xl border-3">
        <H3Heading className="text-tertiary mb-4 pt-3 text-center text-2xl">
          Question progress
        </H3Heading>
        <ul>
          {quiz.questions.map((q, questionIndex) => {
            const isCurrent = questionIndex === currQuestionIndex;
            return (
              <li
                key={q.id}
                className={`text-content bg-surface ${isCurrent ? 'outline-primary outline-3' : ''} hover:bg-primary mx-4 mt-3 rounded-2xl pl-4 outline-0 first:mt-0 last:mb-4`}
              >
                <QuestionLiMember
                  q={q}
                  userAnswerIndex={userAnswers[questionIndex]}
                  isAnswered={questionIndex < currQuestionIndex}
                />
              </li>
            );
          })}
        </ul>
      </div>
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
