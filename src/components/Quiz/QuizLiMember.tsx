import { Link } from "react-router-dom";
import type { Quiz } from "../../models/quiz";
import { quizPath } from "../../routes/routeUtils";

interface QuizProps {
  q: Quiz;
}

export default function QuizLiMember({ q }: QuizProps) {
  return (
    <>
      <div>
        - {q.title} (Questions: {q.questions.length}) -{" "}
        <Link to={quizPath(q.id)}>Pass the quiz!</Link>
      </div>
    </>
  );
}
