import type { Quiz } from '../../../../models/quiz';
import { quizPath } from '../../../../routes/routeUtils';
import StyledLink from '../../../atoms/links/StyledLink';

interface QuizLiMemberProps {
  q: Quiz;
}

/**
 * Used on the home page to display quizzes.
 */
export default function QuizLiMember({ q }: QuizLiMemberProps) {
  return (
    <>
      <div className="text-content flex items-center justify-between p-1">
        - {q.title} (Questions: {q.questions.length})
        <StyledLink to={quizPath(q.id)}>Pass the quiz!</StyledLink>
      </div>
    </>
  );
}
