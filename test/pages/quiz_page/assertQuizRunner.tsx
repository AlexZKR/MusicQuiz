import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import type { Question } from '../../../src/models/quiz';
import {
  assertNoCheckboxesChecked,
  assertNoRadiosChecked,
  assertQuestionProgressList,
  getCheckboxes,
  getQuestionProgressRegion,
  getQuestionPromptRegion,
  getRadioButton,
  testQuiz,
  type QuestionProgressRegion,
} from './helpers';
import { expect } from 'vitest';

/**
 * Assert quiz runner happy path by dividing screen into regions and asserting needed content in each.
 * Current regions:
 * 1. Question prompt (in the middle of the screen, where question text and option selection is held);
 * 2. Question progress (to the right side, where a list of questions is selected).
 */
export async function assertQuizRunnerHappyPath(btnSelections: number[][]) {
  // Assert that question progress list is filled with needed number of questions
  const questionProgress = getQuestionProgressRegion();
  expect(questionProgress.questionList.length === testQuiz.questions.length);

  for (let i = 0; i < testQuiz.questions.length; i++) {
    const currQ = testQuiz.questions[i];

    // Assert regions for every question:

    assertQuestionPromptScreen(getQuestionPromptRegion(), i, currQ);
    assertQuestionProgressScreen(questionProgress, i, btnSelections);

    // Choose answer
    let btns: HTMLElement[] = [];
    if (currQ.type === 'one-select') {
      const radio = getRadioButton(
        screen.getAllByRole('radio'),
        btnSelections[i][0]
      );
      btns = [radio];
    } else if (currQ.type === 'multi-select') {
      btns = getCheckboxes(screen.getAllByRole('checkbox'), btnSelections[i]);
    }

    // Click chosen buttons
    if (btns.length === 0) throw new Error("Question choices weren't chosen!");
    btns.forEach(async (b) => await userEvent.click(b));

    // Submit answer
    const submit = screen.getByRole('button', { name: /submit answer/i });
    await userEvent.click(submit);
  }
}

async function assertQuestionProgressScreen(
  questionProgress: QuestionProgressRegion,
  currQuestionNumber: number,
  btnSelections: number[][]
) {
  const currQuestionLi = questionProgress.questionList[currQuestionNumber];

  // Assert current question is highlighted with outline
  const classAttr = currQuestionLi.getAttribute('class');
  expect(classAttr).toEqual(expect.stringContaining('outline-primary'));

  assertQuestionProgressList(
    currQuestionNumber,
    btnSelections,
    questionProgress.questionList
  );
}

async function assertQuestionPromptScreen(
  PromptRegion: HTMLElement,
  currQuestionNumber: number,
  currQuestion: Question
) {
  // assert that the prompt region contains the current question’s text
  expect(PromptRegion).toHaveTextContent(currQuestion.text);

  // assert that no answers are chosen after render
  if (currQuestion.type === 'one-select') {
    assertNoRadiosChecked();
  } else if (currQuestion.type === 'multi-select') {
    assertNoCheckboxesChecked();
  }

  // assert that screen contains question type badge
  expect(
    await screen.findByText(
      currQuestion.type === 'one-select' ? 'select one' : 'select one or many'
    )
  );

  // assert the “Question #x of y” header appears somewhere on the page
  expect(
    await screen.findByText(
      `Question #${currQuestionNumber + 1} out of ${testQuiz.questions.length}`
    )
  );
}
