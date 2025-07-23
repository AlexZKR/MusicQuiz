import type { DefaultComponentProps } from '../../types/componentProps';

export default function H1Heading({
  children,
  className = 'text-4xl font-bold mb-2 mt-3 text-center text-primary',
}: DefaultComponentProps) {
  return <h1 className={className}>{children}</h1>;
}
