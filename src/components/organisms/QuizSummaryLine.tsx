import type { Quiz } from '../../models/quiz';
import type { userAnswers } from '../pages/QuizPage';
import { arrayCompare } from '../../utils/arrayComparison';
import H2HeadingSubtitle from '../atoms/headings/H2HeadingSubtitle';

interface QuizSummaryLineProps {
  quiz: Quiz;
  userAnswers: userAnswers;
}

export function QuizSummaryLine({ quiz, userAnswers }: QuizSummaryLineProps) {
  const correctCount = quiz.questions.reduce(
    (count, q) =>
      arrayCompare(userAnswers.answers.get(q.id)!, q.answerIndexes)
        ? count + 1
        : count,
    0
  );
  return (
    <H2HeadingSubtitle>
      You got {correctCount} out of {quiz.questions.length} answers!
    </H2HeadingSubtitle>
  );
}
