export type QuizId = string;
export type QuestionId = string;

export interface Quiz {
  id: QuizId;
  title: string;
  questions: Question[];
}

export interface Question {
  id: QuestionId;
  text: string;
  options: string[];
  answerIndex: number;
}
