import type { DefaultComponentProps } from '../../types/componentProps';

export default function H1HeadingSubtitle({
  children,
  className = 'text-center mb-4 text-tertiary',
}: DefaultComponentProps) {
  return <p className={className}>{children}</p>;
}
