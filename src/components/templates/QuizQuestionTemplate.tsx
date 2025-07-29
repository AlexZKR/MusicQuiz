import type { Quiz } from '../../models/quiz';
import type { userAnswers } from '../../pages/QuizPage';
import { QuestionTypeBadge } from '../molecules/badges/QuestionTypeBadge';
import MultiSelectQuestion from '../molecules/chooseMultiQuestion/MultiSelectQuestion';
import ChooseOneQuestion from '../molecules/chooseOneQuestion/ChooseOneQuestion';
import { CurrentQuestionHeading } from '../molecules/headings/CurrentQuestion';
import { QuestionProgressList } from '../organisms/QuestionProgressList';

export function QuizQuestionTemplate(
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
      <CurrentQuestionHeading
        currentQuestion={currQuestionIndex + 1}
        totalQuestions={quiz.questions.length}
      />
      <QuestionTypeBadge type={q.type} />
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
