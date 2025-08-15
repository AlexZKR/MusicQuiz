import { expect, test } from 'vitest';
import { QuestionSchema, QuizSchema } from '../../src/models/shemas';
import { getQuiz, getQuizzes } from '../../src/services/quizService';

const quizzes = getQuizzes();

const firstQuizId = 'quiz1';
const randomID = '13bip3f';

test('get quiz by id', () => {
  const quiz = getQuiz(firstQuizId);
  expect(quiz).toBe(quizzes.get(firstQuizId));
  expect(() => QuizSchema.parse(quiz)).not.toThrow();
});

test('quiz not found', () => {
  expect(() => getQuiz(randomID)).toThrow('Quiz not found!');
});

test('invalid question type throws', () => {
  const invalid_type = {
    id: '2',
    text: 'test text2',
    options: ['2', '1'],
    type: 'invalid_question_type',
    answerIndex: 1,
  };
  expect(() => QuestionSchema.parse(invalid_type)).toThrow();
});
