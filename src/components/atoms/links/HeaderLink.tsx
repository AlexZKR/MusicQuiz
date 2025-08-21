import { Link, type LinkProps } from 'react-router-dom';

export default function StyledLink({
  to,
  children,
  className = 'rounded px-3 py-1 font-semibold transition delay-10 duration-300 ease-in-out hover:scale-130',
}: LinkProps) {
  return (
    <button className={className}>
      <Link to={to}>{children}</Link>
    </button>
  );
}
