import type { Quiz } from '../../models/quiz';
import H3Heading from '../atoms/headings/H3Heading';

import type { userAnswers } from '../pages/QuizPage';
import { QuestionProgressList } from '../organisms/lists/quiestionList/QuestionProgressList';
import { QuizSummaryLine } from '../molecules/headings/QuizSummaryLine';

interface QuizResultsTemplateProps {
  quiz: Quiz;
  userAnswers: userAnswers;
}

export function QuizResultsTemplate({
  quiz,
  userAnswers,
}: QuizResultsTemplateProps) {
  return (
    <>
      <H3Heading>Quiz Complete!</H3Heading>
      <QuizSummaryLine quiz={quiz} userAnswers={userAnswers} />
      <section
        role="region"
        aria-label="Question progress"
        className="mx-auto max-w-xl min-w-fit"
      >
        <QuestionProgressList
          quiz={quiz}
          userAnswers={userAnswers}
          currQuestionIndex={quiz.questions.length}
        />
      </section>
    </>
  );
}
