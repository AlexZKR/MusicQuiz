import { screen } from '@testing-library/react';
import * as service from '../../../src/services/quizService';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { renderQuizPage, testQuiz } from './helpers';
import { assertQuizRunnerHappyPath } from './assertQuizRunner';
import { assertQuizResultScreenHappyPath } from './assertResultsScreen';

interface Case {
  name: string;

  btnsToClick: number[];
  expectedResultString: string;
}

const cases: Case[] = [
  {
    name: 'all correct, happy path',
    btnsToClick: testQuiz.questions.map((q) => q.answerIndex), //click only correct buttons
    expectedResultString: `You got ${testQuiz.questions.length} out of ${testQuiz.questions.length} answers!`,
  },
  {
    name: 'some wrong, happy path',
    btnsToClick: testQuiz.questions.map(() => 1),
    expectedResultString: `You got 2 out of ${testQuiz.questions.length} answers!`,
  },
];

describe('QuizPage happy paths', () => {
  beforeEach(() => {
    jest.spyOn(service, 'getQuiz').mockReturnValue(testQuiz);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test.each(cases)(
    '$name',
    async ({
      btnsToClick: selections,
      expectedResultString: expectedResult,
    }) => {
      renderQuizPage(testQuiz.id);

      await assertQuizRunnerHappyPath(selections);
      await assertQuizResultScreenHappyPath(expectedResult);
    }
  );
});

test('validation error when submit and not selected answer', async () => {
  jest.spyOn(service, 'getQuiz').mockReturnValue(testQuiz);
  renderQuizPage(testQuiz.id);

  const submit = screen.getByRole('button', { name: /submit answer/i });
  await userEvent.click(submit);
  expect(
    await screen.findByText('Please select an option')
  ).toBeInTheDocument();
});

test('unknown quiz ID shows Not Found', () => {
  jest.spyOn(service, 'getQuiz').mockImplementationOnce(() => {
    throw new Error('Quiz not found!');
  });

  renderQuizPage('random_quiz_id');
  expect(screen.getByText('Not Found!')).toBeInTheDocument();
});
