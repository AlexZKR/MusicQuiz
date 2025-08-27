import { Routes, Route } from 'react-router-dom';
import QuizChoicePage from '../components/pages/QuizChoicePage';
import QuizPage from '../components/pages/QuizPage';
import NotFoundPage from '../components/pages/NotFound';
import TheoryPage from '../components/pages/TheoryPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="c" element={<QuizChoicePage />} />
      <Route path="/theory" element={<TheoryPage />} />
      <Route path="/quiz/:id" element={<QuizPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
