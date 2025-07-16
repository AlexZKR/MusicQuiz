import type { Quiz, QuizId } from "../models/quiz";
import quizzesData from "../data/quizzes.json";

const quizMap: Map<QuizId, Quiz> = new Map(
  (quizzesData as Quiz[]).map((quiz) => [quiz.id as QuizId, quiz])
);

export function getQuizzes(): Map<QuizId, Quiz> {
  return quizMap;
}

export function getQuiz(id: QuizId): Quiz {
  const quiz = quizMap.get(id);
  if (quiz !== undefined) {
    return quiz;
  } else {
    throw new Error("No quiz found!");
  }
}
