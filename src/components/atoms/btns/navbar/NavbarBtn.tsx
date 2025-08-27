import type { ButtonProps } from '../../AtomProps';

export default function NavbarBtn({
  children,
  className = 'bg-surface rounded px-3 py-1',
  onClick,
}: ButtonProps) {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}
