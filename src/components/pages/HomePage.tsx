import H1Heading from '../atoms/headings/H1Heading';
import H2HeadingSubtitle from '../atoms/headings/H2HeadingSubtitle';
import { getQuizzes } from '../../services/quizService';
import QuizList from '../organisms/lists/quizList/QuizList';

const HomePage = () => {
  const quizzes = getQuizzes();
  return (
    <div>
      <H1Heading>Choose a Quiz</H1Heading>
      <H2HeadingSubtitle>Test your music knowledge!</H2HeadingSubtitle>
      <QuizList quizzes={quizzes} />
    </div>
  );
};

export default HomePage;
