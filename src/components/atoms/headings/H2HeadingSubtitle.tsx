import type { DefaultAtomProps } from '../AtomProps';

export default function H1HeadingSubtitle({
  children,
  className = 'text-center mb-4 text-tertiary',
}: DefaultAtomProps) {
  return <p className={className}>{children}</p>;
}
