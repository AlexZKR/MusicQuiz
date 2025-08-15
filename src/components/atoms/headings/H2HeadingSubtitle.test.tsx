import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import H2HeadingSubtitle from './H2HeadingSubtitle';

interface Case {
  name: string;

  styleClass?: string;
  children: string;
}

const defaultStyleClass = 'text-center mb-4 text-tertiary';

const H2HeadingCases: Case[] = [
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

describe('H2Heading atom', () => {
  test.each(H2HeadingCases)(
    '$name',
    ({ children: c, styleClass: styleClass }) => {
      if (!styleClass) render(<H2HeadingSubtitle>{c}</H2HeadingSubtitle>);
      else
        render(
          <H2HeadingSubtitle className={styleClass}>{c}</H2HeadingSubtitle>
        );

      const heading = screen.getByText(c, { selector: 'p' });

      expect(heading).toBeInTheDocument();

      if (styleClass) expect(heading).toHaveClass(styleClass);
      else expect(heading).toHaveClass(defaultStyleClass);
    }
  );
});
