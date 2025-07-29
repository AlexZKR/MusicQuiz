import type { Quiz } from '../../models/quiz';
import type { userAnswers } from '../../pages/QuizPage';
import H2HeadingSubtitle from '../atoms/headings/H2HeadingSubtitle';
import MultiSelectQuestion from '../molecules/chooseMultiQuestion/MultiSelectQuestion';
import ChooseOneQuestion from '../molecules/chooseOneQuestion/ChooseOneQuestion';
import { QuestionProgressList } from './QuestionProgressList';
export function QuizQuestionLayout(
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
