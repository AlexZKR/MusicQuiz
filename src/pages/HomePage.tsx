import H1Heading from "../components/headings/H1Heading";
import H2HeadingSubtitle from "../components/headings/H2HeadingSubtitle";
import QuizLiMember from "../components/quiz/QuizLiMember";
import { getQuizzes } from "../services/quizService";

const HomePage = () => {
  const quizzes = getQuizzes();
  return (
    <div>
      <H1Heading>Choose a Quiz</H1Heading>
      <H2HeadingSubtitle>Test your music knowledge!</H2HeadingSubtitle>

      <ul className="w-3/4 mx-auto space-y-3">
        {[...quizzes.values()].map((q) => (
          <li
            key={q.id}
            className="p-4 bg-white dark:bg-gray-800 rounded shadow transition"
          >
            <QuizLiMember q={q} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
