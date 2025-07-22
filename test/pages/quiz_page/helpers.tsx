/**
 * This file contains small helper functions for QuizRunner test assertions.
 */

import { render, screen, within } from '@testing-library/react';
import { FakeQuiz1Id, FakeQuizzes } from '../testdata';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes from '../../../src/routes/AppRoutes';
import '@testing-library/jest-dom';

export const testQuiz = FakeQuizzes.get(FakeQuiz1Id)!;

export interface QuestionProgressRegion {
  region: HTMLElement;
  questionList: HTMLElement[];
}

export interface QuizRunnerRegions {
  questionPrompt: HTMLElement;
  questionProgress: QuestionProgressRegion;
}

/**
 * Parses quiz runner screen and outputs regions as HTML elements
 * with needed data:
 * 1. Question prompt zone
 * 2. Question progress zone with a list of questions to assert state of each question
 */
export function getQuizRunnerRegions(): QuizRunnerRegions {
  const PromptRegion = screen.getByRole('region', {
    name: /question prompt/i,
  });
  const ProgressRegion = screen.getByRole('region', {
    name: /question progress/i,
  });

  return {
    questionPrompt: PromptRegion,
    questionProgress: {
      region: ProgressRegion,
      questionList: within(ProgressRegion).getAllByRole('listitem'),
    },
  };
}

/**
 * Find a radio button for a supplied answer choice
 * @param {any} btns list of radio buttons (answer options)
 * @param {any} btnValue answer choice
 * @returns {HTMLElement} a radio button with supplied btnValue's value attribute
 */
export function getRadioButton(
  btns: HTMLElement[],
  btnValue: number
): HTMLElement {
  const button = btns.find((r) => Number(r.getAttribute('value')) === btnValue);
  if (!button) throw new Error(`Could not find radio value=${btnValue}`);
  return button;
}

export function renderQuizPage(quiz_id: string) {
  render(
    <MemoryRouter initialEntries={[`/quiz/${quiz_id}`]}>
      <AppRoutes />
    </MemoryRouter>
  );
}

export function assertNoRadiosChecked() {
  const radios = screen.getAllByRole('radio');
  radios.forEach((r) => expect(r).not.toBeChecked());
}

export function extractIndicatorIconForProgressLi(
  questionEl: HTMLElement
): string {
  const svg = questionEl.querySelector('svg');
  expect(svg).not.toBeNull();

  const indicator = svg?.getAttribute('data-icon');
  expect(indicator).not.toBeNull();
  return indicator!; // tested by expect
}
