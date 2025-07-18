import type { DefaultComponentProps } from '../../types/componentProps';

export default function H1Heading({
  children,
  className = 'text-3xl font-bold mb-2 text-center text-primary',
}: DefaultComponentProps) {
  return <h1 className={className}>{children}</h1>;
}
