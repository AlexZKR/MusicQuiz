import type { Question } from '../../../models/quiz';

export interface QuizQuestionProps {
  q: Question;
  onSubmitAnswer: (selectedIndexes: number[]) => void;
}
