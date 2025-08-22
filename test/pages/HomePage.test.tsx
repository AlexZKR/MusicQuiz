import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import QuizChoicePage from '../../src/components/pages/QuizChoicePage';
import * as service from '../../src/services/quizService';
import { FakeQuizzes } from './testdata';
import { expect, test, vi } from 'vitest';

vi.spyOn(service, 'getQuizzes').mockReturnValue(FakeQuizzes);

test('renders list of quizzes with correct links', () => {
  render(
    <MemoryRouter>
      <QuizChoicePage />
    </MemoryRouter>
  );

  const listItems = screen.getAllByRole('listitem');
  expect(listItems).toHaveLength(FakeQuizzes.size);

  let i = 0;
  for (const [id, quiz] of FakeQuizzes) {
    const utils = within(listItems[i]);
    expect(
      utils.getByText((content) => content.includes(quiz.title))
    ).toBeInTheDocument();

    const link = utils.getByRole('link', { name: 'Pass the quiz!' });
    expect(link).toHaveAttribute('href', `/quiz/${id}`);

    i++;
  }
});
