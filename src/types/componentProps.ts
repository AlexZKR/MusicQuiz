import type { ReactNode } from 'react';

export interface DefaultComponentProps {
  children: ReactNode;
  className?: string;
}
export interface LinkProps extends DefaultComponentProps {
  to: string;
}
