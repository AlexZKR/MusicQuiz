import { Routes, Route } from 'react-router-dom';
import HomePage from '../components/pages/HomePage';
import QuizPage from '../components/pages/QuizPage';
import NotFoundPage from '../components/pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/quiz/:id" element={<QuizPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
