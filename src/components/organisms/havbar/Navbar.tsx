import { useState } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import H1Heading from '../../atoms/headings/H1Heading';
import HeaderLink from '../../atoms/links/HeaderLink';
import StyledLink from '../../atoms/links/StyledLink';
import { navbarLinks } from './navbarData';
import NavbarBtn from '../../atoms/btns/navbar/NavbarBtn';

export default function Header() {
  const [theme, toggleTheme] = useTheme();
  const [showMobileNav, setshowMobileNav] = useState(false);

  const showNav = () => {
    setshowMobileNav(!showMobileNav);
  };

  return (
    <nav className="bg-navbar flex flex-wrap items-center justify-between p-4 md:flex-nowrap">
      <H1Heading className="text-content mt-3 mb-2 text-center text-4xl font-bold">
        <StyledLink
          className="hover:text-accent rounded px-3 py-1 font-semibold transition"
          to="/"
        >
          MusicQuiz
        </StyledLink>
      </H1Heading>

      <button className="flex flex-col gap-1 md:hidden" onClick={showNav}>
        <div className="bg-content h-1 w-8 rounded"></div>
        <div className="bg-content h-1 w-8 rounded"></div>
        <div className="bg-content h-1 w-8 rounded"></div>
      </button>
      <div
        className={`${
          showMobileNav ? 'flex' : 'hidden'
        } w-full flex-col items-center justify-center first:mt-2 md:flex md:w-auto md:flex-1 md:flex-row md:items-center md:justify-between`}
      >
        {/**Links */}
        <div className="flex flex-col items-center space-y-4 md:flex-1 md:flex-row md:justify-center md:space-y-0 md:space-x-10">
          {navbarLinks.map((link) => (
            <H1Heading key={link.href} className="text-content text-2xl">
              <HeaderLink to={link.href}>{link.title}</HeaderLink>
            </H1Heading>
          ))}
        </div>

        {/**Buttons */}
        <div className="mt-6 flex flex-col space-y-3 md:mt-0 md:ml-6 md:flex-row md:space-y-0 md:space-x-4">
          <NavbarBtn onClick={toggleTheme}>
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </NavbarBtn>
          <NavbarBtn onClick={() => alert('Translate coming soon!')}>
            Translate
          </NavbarBtn>
        </div>
      </div>
    </nav>
  );
}
