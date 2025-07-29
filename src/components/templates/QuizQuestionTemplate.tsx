import type { QuestionType, Quiz } from '../../models/quiz';
import type { userAnswers } from '../../pages/QuizPage';
import { QuestionTypeBadge } from '../molecules/badges/QuestionTypeBadge';
import ChooseOneQuestion from '../molecules/questions/chooseOneQuestion/ChooseOneQuestion';
import { CurrentQuestionHeading } from '../molecules/headings/CurrentQuestion';
import { QuestionProgressList } from '../organisms/QuestionProgressList';
import type { QuizQuestionProps } from '../molecules/questions/props';
import MultiSelectQuestion from '../molecules/questions/chooseMultiQuestion/MultiSelectQuestion';

const QUESTION_RENDERERS: Record<
  QuestionType,
  React.ComponentType<QuizQuestionProps>
> = {
  'one-select': ChooseOneQuestion,
  'multi-select': MultiSelectQuestion,
};

interface QuizQuestionTemplateProps {
  currQuestionIndex: number;
  quiz: Quiz;
  handleAnswer: (selectedIndexes: number[]) => void;
  userAnswers: userAnswers;
}

export function QuizQuestionTemplate({
  currQuestionIndex,
  quiz,
  handleAnswer,
  userAnswers,
}: QuizQuestionTemplateProps) {
  const q = quiz.questions[currQuestionIndex];
  const QuestionRenderer = QUESTION_RENDERERS[q.type];
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
          <QuestionRenderer q={q} onSubmitAnswer={handleAnswer} />
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
