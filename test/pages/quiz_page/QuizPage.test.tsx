import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import * as service from "../../../src/services/quizService";
import "@testing-library/jest-dom";
import AppRoutes from "../../../src/routes/AppRoutes";
import { FakeQuiz1Id, FakeQuizzes } from "../testdata";
import userEvent from "@testing-library/user-event";
import { getRadioButton } from "./helpers";

interface Case {
  name: string;

  btnsToClick: number[];
  expectedResultString: string;
}

const testQuiz = FakeQuizzes.get(FakeQuiz1Id)!;

const cases: Case[] = [
  {
    name: "all correct, happy path",
    btnsToClick: testQuiz.questions.map((q) => q.answerIndex), //click only correct buttons
    expectedResultString: `You got ${testQuiz.questions.length} out of ${testQuiz.questions.length} answers!`,
  },
  {
    name: "all wrong, happy path",
    btnsToClick: testQuiz.questions.map(() => 1),
    expectedResultString: `You got 1 out of ${testQuiz.questions.length} answers!`,
  },
];

describe("QuizPage happy paths", () => {
  beforeEach(() => {
    jest.spyOn(service, "getQuiz").mockReturnValue(testQuiz);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test.each(cases)(
    "$name → shows correct summary",
    async ({
      btnsToClick: selections,
      expectedResultString: expectedResult,
    }) => {
      render(
        <MemoryRouter initialEntries={[`/quiz/${FakeQuiz1Id}`]}>
          <AppRoutes />
        </MemoryRouter>
      );

      // Assert quiz runner flow
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
        const btn = getRadioButton(screen.getAllByRole("radio"), selections[i]);
        await userEvent.click(btn);

        // Submit answer
        const submit = screen.getByRole("button", { name: /submit answer/i });
        await userEvent.click(submit);
      }

      // Assert result screen
      expect(await screen.findByText(expectedResult)).toBeInTheDocument();
    }
  );
});

test("validation error when submit and not selected answer", async () => {
  jest.spyOn(service, "getQuiz").mockReturnValue(testQuiz);
  render(
    <MemoryRouter initialEntries={[`/quiz/${FakeQuiz1Id}`]}>
      <AppRoutes />
    </MemoryRouter>
  );

  const submit = screen.getByRole("button", { name: /submit answer/i });
  await userEvent.click(submit);
  expect(
    await screen.findByText("Please select an option")
  ).toBeInTheDocument();
});

test("unknown quiz ID shows Not Found", () => {
  jest.spyOn(service, "getQuiz").mockImplementationOnce(() => {
    throw new Error("Quiz not found!");
  });

  render(
    <MemoryRouter initialEntries={["/quiz/some-random-id"]}>
      <AppRoutes />
    </MemoryRouter>
  );

  expect(screen.getByText("Not Found!")).toBeInTheDocument();
});
