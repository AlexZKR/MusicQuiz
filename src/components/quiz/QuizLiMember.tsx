import type { Quiz } from '../../models/quiz';
import { quizPath } from '../../routes/routeUtils';
import StyledLink from '../links/StyledLink';

interface QuizProps {
  q: Quiz;
}

export default function QuizLiMember({ q }: QuizProps) {
  return (
    <>
      <div className="text-content flex items-center justify-between p-1">
        - {q.title} (Questions: {q.questions.length})
        <StyledLink to={quizPath(q.id)}>Pass the quiz!</StyledLink>
      </div>
    </>
  );
}
