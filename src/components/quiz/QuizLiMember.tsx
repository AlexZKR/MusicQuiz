import type { Quiz } from "../../models/quiz";
import { quizPath } from "../../routes/routeUtils";
import ButtonLink from "../links/ButtonLink";

interface QuizProps {
  q: Quiz;
}

export default function QuizLiMember({ q }: QuizProps) {
  return (
    <>
      <div className="flex justify-between items-center p-1">
        - {q.title} (Questions: {q.questions.length})
        <ButtonLink to={quizPath(q.id)}>Pass the quiz!</ButtonLink>
      </div>
    </>
  );
}
