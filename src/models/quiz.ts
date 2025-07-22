export type QuizId = string;

export interface Quiz {
  id: QuizId;
  title: string;
  questions: Question[];
}

export type QuestionId = string;
export type QuestionType = 'one-select' | 'multi-select';

export interface Question {
  id: QuestionId;
  text: string;
  type: QuestionType;
  options: string[];
  answerIndex: number;
}
