import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  assertQuestionProgressList,
  getQuestionProgressRegion,
} from './helpers';
import type { Quiz } from '../../../src/models/quiz';

export async function assertQuizResultScreenHappyPath(
  expResultString: string,
  quiz: Quiz,
  btnSelections: number[][]
) {
  expect(await screen.findByText(expResultString)).toBeInTheDocument();

  const questionList = getQuestionProgressRegion().questionList;

  assertQuestionProgressList(
    quiz.questions.length,
    btnSelections,
    questionList
  );
}
