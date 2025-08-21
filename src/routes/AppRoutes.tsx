import { Routes, Route } from 'react-router-dom';
import QuizChoicePage from '../components/pages/QuizChoicePage';
import QuizPage from '../components/pages/QuizPage';
import NotFoundPage from '../components/pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<QuizChoicePage />} />
      <Route path="/quiz/:id" element={<QuizPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
