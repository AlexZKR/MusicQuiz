import H2HeadingSubtitle from '../../atoms/headings/H2HeadingSubtitle';

interface CurrentQuestionProps {
  currentQuestion: number;
  totalQuestions: number;
}
export function CurrentQuestionHeading({
  currentQuestion,
  totalQuestions,
}: CurrentQuestionProps) {
  return (
    <H2HeadingSubtitle className="text-tertiary mb-1 text-center">
      Question #{currentQuestion} out of {totalQuestions}
    </H2HeadingSubtitle>
  );
}
