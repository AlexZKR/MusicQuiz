import { z } from 'zod';

export const QuestionSchema = z.object({
  id: z.string(),
  text: z.string(),
  type: z.enum(['one-select', 'multi-select']),
  options: z.array(z.string()),
  answerIndexes: z.array(z.number()),
});

export const QuizSchema = z.object({
  id: z.string(),
  title: z.string(),
  questions: z.array(QuestionSchema),
});
