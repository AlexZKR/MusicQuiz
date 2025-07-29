import type { Quiz } from '../../models/quiz';
import { arrayCompare } from '../../utils/arrayComparison';
import H2HeadingSubtitle from '../atoms/headings/H2HeadingSubtitle';
import H3Heading from '../atoms/headings/H3Heading';
import { QuestionProgressList } from './QuestionProgressList';
import type { userAnswers } from '../../pages/QuizPage';

export function QuizResultsLayout(quiz: Quiz, userAnswers: userAnswers) {
  function countCorrectAnswers(): number {
    let results = 0;
    for (const q of quiz.questions) {
      if (arrayCompare(userAnswers.answers.get(q.id)!, q.answerIndexes)) {
        results = results + 1;
      }
    }
    return results;
  }

  return (
    <>
      <H3Heading>Quiz Complete!</H3Heading>
      <H2HeadingSubtitle>
        You got {countCorrectAnswers()} out of {quiz.questions.length} answers!
      </H2HeadingSubtitle>
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
