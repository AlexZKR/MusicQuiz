import { useEffect, useState } from "react";

import AppRoutes from "./routes/AppRoutes";

function App() {
  const [theme, setTheme] = useState<"light" | "dark">(
    () =>
      (localStorage.getItem("theme") as "light" | "dark") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
        <header className="flex items-center justify-between p-4">
          <h1 className="text-2xl font-semibold">MusicQuiz</h1>
          <div className="flex space-x-2">
            {/* Theme toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
            >
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
            {/* Translate placeholder */}
            <button
              onClick={() => alert("Translate feature coming soon!")}
              className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              Translate
            </button>
          </div>
        </header>
        <main>
          <AppRoutes />
        </main>
      </div>
    </>
  );
}

export default App;
