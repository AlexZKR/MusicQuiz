/**
 * This file contains small helper functions for QuizRunner test assertions.
 */

import { render, screen, within } from '@testing-library/react';
import { FakeQuiz1Id, FakeQuizzes } from '../testdata';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes from '../../../src/routes/AppRoutes';
import '@testing-library/jest-dom';
import { arrayCompare } from '../../../src/utils/arrayComparison';

export const testQuiz = FakeQuizzes.get(FakeQuiz1Id)!;

export interface QuestionProgressRegion {
  region: HTMLElement;
  questionList: HTMLElement[];
}

/**
 * @returns question progress region as HTML element
 * with a list of questions to assert.
 */
export function getQuestionProgressRegion(): QuestionProgressRegion {
  const ProgressRegion = screen.getByRole('region', {
    name: /question progress/i,
  });

  return {
    region: ProgressRegion,
    questionList: within(ProgressRegion).getAllByRole('listitem'),
  };
}

/**
 *
 * @returns Question prompt region
 */
export function getQuestionPromptRegion(): HTMLElement {
  return screen.getByRole('region', {
    name: /question prompt/i,
  });
}

/**
 * Find checkbox buttons for supplied answer choices
 * @param {any} btns list of checkboxes buttons (answer options)
 * @param {any} btnValue answer choices
 * @returns {HTMLElement} array of checkbox buttons with supplied value attributes
 */
export function getCheckboxes(
  checkboxes: HTMLElement[],
  toCheck: number[]
): HTMLElement[] {
  const btns = checkboxes.filter((r) =>
    toCheck.includes(Number(r.getAttribute('value')))
  );
  if (!btns) throw new Error(`Could not find checkboxes for values=${toCheck}`);
  return btns;
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
/**
 * Assert that every question's indicator is filled correctly
 * (empty (data-icon=circle) - not answered,
 * green (data-icon=circle-check) - right,
 * red (data-icon=circle-xmark) - false).
 */
export function assertQuestionProgressList(
  currQuestionNumber: number,
  btnSelections: number[][],
  questionProgressList: HTMLElement[]
) {
  for (const [j, questionEl] of questionProgressList.entries()) {
    const indicator = extractIndicatorIconForProgressLi(questionEl);

    // Assert green/red only for already answered questions. Others must be empty icons
    if (j < currQuestionNumber) {
      const isAnsweredRight = arrayCompare(
        testQuiz.questions[j].answerIndexes,
        btnSelections[j]
      );

      if (isAnsweredRight) {
        expect(indicator).toEqual('circle-check');
      } else {
        expect(indicator).toEqual('circle-xmark');
      }
    } else {
      expect(indicator).toEqual('circle');
    }
  }
}

export function assertNoRadiosChecked() {
  const radios = screen.getAllByRole('radio');
  radios.forEach((r) => expect(r).not.toBeChecked());
}

export function assertNoCheckboxesChecked() {
  const checkboxes = screen.getAllByRole('checkbox');
  checkboxes.forEach((c) => expect(c).not.toBeChecked());
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
