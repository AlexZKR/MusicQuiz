import { useTheme } from '../../hooks/useTheme';
import H1Heading from '../atoms/headings/H1Heading';
import HeaderLink from '../atoms/links/HeaderLink';
import StyledLink from '../atoms/links/StyledLink';

export default function Header() {
  const [theme, toggleTheme] = useTheme();

  return (
    <header className="bg-navbar flex items-center justify-between p-4">
      <H1Heading className="text-content mt-3 mb-2 text-center text-4xl font-bold">
        <StyledLink
          className="hover:text-accent rounded px-3 py-1 font-semibold transition"
          to="/"
        >
          MusicQuiz
        </StyledLink>
      </H1Heading>
      <div className="flex space-x-2">
        <H1Heading className="text-content text-2xl font-semibold">
          <HeaderLink to="/">Quizzes</HeaderLink>
        </H1Heading>
        <H1Heading className="text-content text-2xl">
          <HeaderLink to="/theory">Theory</HeaderLink>
        </H1Heading>
      </div>
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
