import type { Quiz } from '../../models/quiz';
import type { userAnswers } from '../pages/QuizPage';
import H3Heading from '../atoms/headings/H3Heading';
import QuestionLiMember from '../molecules/liMembers/QuestionLiMember';

type QuestionProgressListProps = {
  quiz: Quiz;
  userAnswers: userAnswers;
  currQuestionIndex: number;
};

export function QuestionProgressList({
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
            const questionAnswers = userAnswers.answers.get(q.id) ?? [];
            return (
              <li
                key={q.id}
                className={`text-content bg-surface ${isCurrent ? 'outline-primary outline-3' : ''} hover:bg-primary mx-4 mt-3 rounded-2xl pl-4 outline-0 first:mt-0 last:mb-4`}
              >
                <QuestionLiMember
                  q={q}
                  userAnswer={questionAnswers}
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
