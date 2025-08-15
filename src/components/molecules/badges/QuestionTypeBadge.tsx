import type { QuestionType } from '../../../models/quiz';
import H2HeadingSubtitle from '../../atoms/headings/H2HeadingSubtitle';

interface QuestionTypeBadgeProps {
  type: QuestionType;
}
export function QuestionTypeBadge({ type }: QuestionTypeBadgeProps) {
  return (
    <H2HeadingSubtitle className="text-tertiary bg-badge mx-auto mb-4 block max-w-fit rounded-2xl px-3 text-center">
      {type === 'one-select' ? 'select one' : 'select one or many'}
    </H2HeadingSubtitle>
  );
}
