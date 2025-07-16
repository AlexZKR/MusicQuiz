import { useParams } from "react-router-dom";
import type { QuizId } from "../models/quiz";
import { getQuiz } from "../services/quizService";
import NotFoundPage from "./NotFound";

export default function QuizPage() {
  const { id } = useParams<{ id: QuizId }>();
  if (!id) {
    return <NotFoundPage />;
  }

  try {
    const quiz = getQuiz(id);
    return (
      <>
        <div>{quiz.id}</div>
      </>
    );
  } catch (error) {
    console.log(error);
    return <NotFoundPage />;
  }
}
