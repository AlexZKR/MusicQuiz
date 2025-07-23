import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';

export async function assertQuizResultScreenHappyPath(expResultString: string) {
  expect(await screen.findByText(expResultString)).toBeInTheDocument();
}
