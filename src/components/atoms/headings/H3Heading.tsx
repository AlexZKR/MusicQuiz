import type { DefaultAtomProps } from '../AtomProps';

export default function H3Heading({
  children,
  className = 'text-center mb-4 text-2xl text-content',
}: DefaultAtomProps) {
  return <h3 className={className}>{children}</h3>;
}
