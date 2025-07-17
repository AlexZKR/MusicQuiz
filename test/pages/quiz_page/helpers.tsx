import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FakeQuiz1Id, FakeQuizzes } from "../testdata";
import { MemoryRouter } from "react-router-dom";
import AppRoutes from "../../../src/routes/AppRoutes";
import "@testing-library/jest-dom";

export const testQuiz = FakeQuizzes.get(FakeQuiz1Id)!;

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
  const button = btns.find((r) => Number(r.getAttribute("value")) === btnValue);
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

export async function assertQuizResultScreenHappyPath(expResultString: string) {
  expect(await screen.findByText(expResultString)).toBeInTheDocument();
}

export async function assertQuizRunnerHappyPath(btnSelections: number[]) {
  for (let i = 0; i < testQuiz.questions.length; i++) {
    const q = testQuiz.questions[i];

    await screen.findByText(q.text);

    // Current question number
    expect(
      await screen.findByText(
        `Question #${i + 1} out of ${testQuiz.questions.length}`
      )
    );

    // Choose answer
    const btn = getRadioButton(screen.getAllByRole("radio"), btnSelections[i]);
    await userEvent.click(btn);

    // Submit answer
    const submit = screen.getByRole("button", { name: /submit answer/i });
    await userEvent.click(submit);
  }
}
