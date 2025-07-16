import QuizLiMember from "../components/Quiz/QuizLiMember";
import { getQuizzes } from "../services/quizService";

const HomePage = () => {
  const quizzes = getQuizzes();
  return (
    <>
      <div>Home Page! Choose a quiz:</div>
      <ul>
        {[...quizzes.values()].map((q) => (
          <li key={q.id}>
            <QuizLiMember q={q}></QuizLiMember>
          </li>
        ))}
      </ul>
    </>
  );
};

export default HomePage;
