import { Link, type LinkProps } from 'react-router-dom';

export default function StyledLink({
  to,
  children,
  className = 'hover:bg-secondary text-content font-semibold py-1 px-3 rounded transition',
}: LinkProps) {
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}
