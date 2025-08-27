import type { ReactNode } from 'react';

export interface DefaultAtomProps {
  children: ReactNode;
  className?: string;
}
export interface LinkProps extends DefaultAtomProps {
  to: string;
}

export interface ButtonProps extends DefaultAtomProps {
  onClick: () => React.MouseEventHandler<HTMLButtonElement> | void;
}
