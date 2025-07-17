import { Link } from 'react-router-dom';
import type { DefaultComponentProps } from '../../types/componentProps';

interface ButtonLinkProps extends DefaultComponentProps {
  to: string;
}

export default function ButtonLink({
  to,
  children,
  className = 'hover:bg-secondary text-content font-semibold py-1 px-3 rounded transition',
}: ButtonLinkProps) {
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}
