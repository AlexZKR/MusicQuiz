import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import type { Question } from '../../../src/models/quiz';
import {
  assertNoRadiosChecked,
  extractIndicatorIconForProgressLi,
  getQuizRunnerRegions,
  getRadioButton,
  testQuiz,
  type QuizRunnerRegions,
} from './helpers';

/**
 * Assert quiz runner happy path by dividing screen into regions and asserting needed content in each.
 * Current regions:
 * 1. Question prompt (in the middle of the screen, where question text and option selection is held);
 * 2. Question progress (to the right side, where a list of questions is selected).
 */
export async function assertQuizRunnerHappyPath(btnSelections: number[]) {
  // Assert that question progress list is filled with needed number of questions
  let regions = getQuizRunnerRegions();
  expect(
    regions.questionProgress.questionList.length === testQuiz.questions.length
  );

  for (let i = 0; i < testQuiz.questions.length; i++) {
    const currQ = testQuiz.questions[i];

    // Assert regions for every question:
    regions = getQuizRunnerRegions();

    assertQuestionPromptScreen(regions, i, currQ);
    assertQuestionProgressScreen(regions, i, btnSelections);

    // Choose answer
    const btn = getRadioButton(screen.getAllByRole('radio'), btnSelections[i]);
    await userEvent.click(btn);

    // Submit answer
    const submit = screen.getByRole('button', { name: /submit answer/i });
    await userEvent.click(submit);
  }
}

async function assertQuestionProgressScreen(
  regions: QuizRunnerRegions,
  currQuestionNumber: number,
  btnSelections: number[]
) {
  const currQuestionLi =
    regions.questionProgress.questionList[currQuestionNumber];

  // Assert current question is highlighted with outline
  const classAttr = currQuestionLi.getAttribute('class');
  expect(classAttr).toEqual(expect.stringContaining('outline-primary'));

  //Assert that every question's indicator is filled correctly
  // (empty (data-icon=circle) - not answered,
  //  green (data-icon=circle-check) - right,
  //  red (data-icon=circle-xmark) - false).
  for (const [
    j,
    questionEl,
  ] of regions.questionProgress.questionList.entries()) {
    const indicator = extractIndicatorIconForProgressLi(questionEl);

    // Assert green/red only for already answered questions. Others must be empty icons
    if (j < currQuestionNumber) {
      const isAnsweredRight =
        testQuiz.questions[j].answerIndex === btnSelections[j];

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

async function assertQuestionPromptScreen(
  regions: QuizRunnerRegions,
  currQuestionNumber: number,
  currQuestion: Question
) {
  // assert that the prompt region contains the current question’s text
  expect(regions.questionPrompt).toHaveTextContent(currQuestion.text);

  assertNoRadiosChecked();

  // assert the “Question #x of y” header appears somewhere on the page
  expect(
    await screen.findByText(
      `Question #${currQuestionNumber + 1} out of ${testQuiz.questions.length}`
    )
  );
}
