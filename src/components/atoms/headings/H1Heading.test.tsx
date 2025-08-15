import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import H1Heading from './H1Heading';

interface Case {
  name: string;

  styleClass?: string;
  children: string;
}

const defaultStyleClass =
  'text-4xl font-bold mb-2 mt-3 text-center text-primary';

const H1HeadingCases: Case[] = [
  {
    name: 'default class',
    children: 'Test Title',
  },
  {
    name: 'custom class',
    styleClass: 'font-bold',
    children: 'Test Title',
  },
];

describe('H1Heading atom', () => {
  test.each(H1HeadingCases)(
    '$name',
    ({ children: c, styleClass: styleClass }) => {
      if (styleClass) render(<H1Heading className={styleClass}>{c}</H1Heading>);
      else render(<H1Heading>{c}</H1Heading>);

      const heading = screen.getByRole('heading', {
        level: 1,
        name: c,
      });

      expect(heading).toBeInTheDocument();

      if (styleClass) expect(heading).toHaveClass(styleClass);
      else expect(heading).toHaveClass(defaultStyleClass);
    }
  );
});
