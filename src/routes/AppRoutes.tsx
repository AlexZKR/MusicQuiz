import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import Home from "../components/Home/Home";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/h" element={<Home />} />
    </Routes>
  );
}
