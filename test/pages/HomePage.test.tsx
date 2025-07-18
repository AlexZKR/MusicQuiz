import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../../src/pages/HomePage';
import * as service from '../../src/services/quizService';
import '@testing-library/jest-dom';
import { FakeQuizzes } from './testdata';

jest.spyOn(service, 'getQuizzes').mockReturnValue(FakeQuizzes);

test('renders list of quizzes with correct links', () => {
  render(
    <MemoryRouter>
      <HomePage />
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
