import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import H3Heading from './H3Heading';

interface Case {
  name: string;

  styleClass?: string;
  children: string;
}

const defaultStyleClass = 'text-center mb-4 text-2xl text-content';

const H3HeadingCases: Case[] = [
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

describe('H3Heading atom', () => {
  test.each(H3HeadingCases)(
    '$name',
    ({ children: c, styleClass: styleClass }) => {
      if (styleClass) render(<H3Heading className={styleClass}>{c}</H3Heading>);
      else render(<H3Heading>{c}</H3Heading>);

      const heading = screen.getByRole('heading', {
        level: 3,
        name: c,
      });

      expect(heading).toBeInTheDocument();

      if (styleClass) expect(heading).toHaveClass(styleClass);
      else expect(heading).toHaveClass(defaultStyleClass);
    }
  );
});
