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
      <div className="min-h-screen flex flex-col bg-background text-primary transition-colors">
        <header className="flex items-center justify-between p-4">
          <h1 className="text-2xl font-semibold text-accent">MusicQuiz</h1>
          <div className="flex space-x-2">
            {/* Theme toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="px-3 py-1 rounded bg-surface"
            >
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
            {/* Translate placeholder */}
            <button
              onClick={() => alert("Translate feature coming soon!")}
              className="px-3 py-1 rounded bg-surface text-content"
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
