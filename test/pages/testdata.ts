import type { Quiz, QuizId } from '../../src/models/quiz';

export const FakeQuiz1Id = 'quiz1';

export const FakeQuizzes: Map<QuizId, Quiz> = new Map([
  [
    'quiz1',
    {
      id: FakeQuiz1Id,
      title: 'Quiz One',
      questions: [
        {
          id: '1',
          text: 'test text1',
          options: ['1', '2'],
          type: 'one-select',
          answerIndexes: [0],
        },
        {
          id: '2',
          text: 'test text2',
          options: ['2', '1'],
          type: 'one-select',
          answerIndexes: [1],
        },
        {
          id: '3',
          text: 'test text3',
          options: ['2', '1'],
          type: 'one-select',
          answerIndexes: [1],
        },
      ],
    },
  ],
  [
    'quiz2',
    {
      id: 'quiz2',
      title: 'Quiz Two',
      questions: [
        {
          id: '1',
          text: 'test text1',
          options: ['1', '2'],
          type: 'one-select',
          answerIndexes: [0],
        },
        {
          id: '2',
          text: 'test text2',
          options: ['2', '1'],
          type: 'one-select',
          answerIndexes: [1],
        },
      ],
    },
  ],
]);
