import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import * as service from "../../src/services/quizService";
import "@testing-library/jest-dom";
import AppRoutes from "../../src/routes/AppRoutes";

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
