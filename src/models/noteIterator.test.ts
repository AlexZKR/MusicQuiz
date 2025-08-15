import { describe, expect, test } from 'vitest';
import { NoteIterator, Notes, type Note } from './note';

interface Case {
  name: string;

  startNote: Note;
  count: number;

  expected: Note[];
}

const tt: Case[] = [
  {
    name: 'default, without cycle',

    startNote: Notes[0],
    count: Notes.length,

    expected: Notes,
  },
  {
    name: 'cycle, start: 0, end: +1',
    startNote: Notes[0],
    count: Notes.length + 1,

    expected: [...Notes, Notes[0]],
  },
  {
    name: 'cycle, start: +1 (C#), end: +2 (C#)',
    startNote: Notes[1],

    count: Notes.length + 2,

    expected: [...Notes.slice(1), ...Notes.slice(0, 3)],
  },
];

describe('note iterator test', () => {
  test.each(tt)('$name', ({ startNote: root, count: count, expected: exp }) => {
    const iterator = new NoteIterator(root, count);

    const result = [];
    for (const n of iterator) result.push(n);

    expect(result).toEqual(exp);
  });
});
