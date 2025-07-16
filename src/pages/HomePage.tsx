import QuizLiMember from "../components/Quiz/QuizLiMember";
import { getQuizzes } from "../services/quizService";

const HomePage = () => {
  const quizzes = getQuizzes();
  return (
    <>
      <h1>Home Page! </h1>
      <div>Choose a quiz:</div>
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
