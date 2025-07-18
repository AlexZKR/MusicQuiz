import { getQuiz, getQuizzes } from '../../src/services/quizService';

const quizzes = getQuizzes();

const firstQuizId = 'quiz1';
const randomID = '13bip3f';

test('get quiz by id', () => {
  expect(getQuiz(firstQuizId)).toBe(quizzes.get(firstQuizId));
});

test('quiz not found', () => {
  expect(() => getQuiz(randomID)).toThrow('Quiz not found!');
});
