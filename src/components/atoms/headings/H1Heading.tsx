import type { DefaultAtomProps } from '../AtomProps';

export default function H1Heading({
  children,
  className = 'text-4xl font-bold mb-2 mt-3 text-center text-primary',
}: DefaultAtomProps) {
  return <h1 className={className}>{children}</h1>;
}
