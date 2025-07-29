import { useTheme } from '../../hooks/useTheme';
import StyledLink from '../atoms/links/StyledLink';

export default function Header() {
  const [theme, toggleTheme] = useTheme();

  return (
    <header className="bg-navbar flex items-center justify-between p-4">
      <h1 className="text-content text-2xl font-semibold">
        <StyledLink
          className="hover:text-accent rounded px-3 py-1 font-semibold transition"
          to="/"
        >
          MusicQuiz
        </StyledLink>
      </h1>
      <div className="flex space-x-2">
        <button onClick={toggleTheme} className="bg-surface rounded px-3 py-1">
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button
          onClick={() => alert('Translate coming soon!')}
          className="bg-surface text-content rounded px-3 py-1"
        >
          Translate
        </button>
      </div>
    </header>
  );
}
