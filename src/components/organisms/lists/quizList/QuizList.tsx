import type { Quiz } from '../../../../models/quiz';
import QuizLiMember from './QuizListMember';

interface QuizListProps {
  quizzes: Map<string, Quiz>;
}

export default function QuizList({ quizzes }: QuizListProps) {
  return (
    <ul className="mx-auto w-3/4 space-y-3">
      {[...quizzes.values()].map((q) => (
        <li key={q.id} className="bg-surface rounded p-4 shadow transition">
          <QuizLiMember q={q} />
        </li>
      ))}
    </ul>
  );
}
