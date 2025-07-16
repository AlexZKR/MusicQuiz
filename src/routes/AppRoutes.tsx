import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import QuizPage from "../pages/QuizPage";
import NotFoundPage from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/quiz/:id" element={<QuizPage />} />

      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
