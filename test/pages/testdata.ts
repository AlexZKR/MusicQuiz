export const FakeQuiz1Id = 'quiz1';

export const FakeQuizzes = new Map([
  [
    'quiz1',
    {
      id: FakeQuiz1Id,
      title: 'Quiz One',
      questions: [
        { id: '1', text: 'test text1', options: ['1', '2'], answerIndex: 0 },
        { id: '2', text: 'test text2', options: ['2', '1'], answerIndex: 1 },
      ],
    },
  ],
  [
    'quiz2',
    {
      id: 'quiz2',
      title: 'Quiz Two',
      questions: [
        { id: '1', text: 'test text1', options: ['1', '2'], answerIndex: 0 },
        { id: '2', text: 'test text2', options: ['2', '1'], answerIndex: 1 },
      ],
    },
  ],
]);
