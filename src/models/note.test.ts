import { describe, expect, test } from 'vitest';
import { major_formula, MajorKey, Notes, type Note } from './note';

export const C_MAJOR_SCALE: Note[] = [
  { name: 'C', pitch: 0 },
  { name: 'D', pitch: 2 },
  { name: 'E', pitch: 4 },
  { name: 'F', pitch: 5 },
  { name: 'G', pitch: 7 },
  { name: 'A', pitch: 9 },
  { name: 'B', pitch: 11 },
];

export const G_MAJOR_SCALE: Note[] = [
  { name: 'G', pitch: 7 },
  { name: 'A', pitch: 9 },
  { name: 'B', pitch: 11 },
  { name: 'C', pitch: 0 },
  { name: 'D', pitch: 2 },
  { name: 'E', pitch: 4 },
  { name: 'F#', pitch: 6 },
];

export const D_MAJOR_SCALE: Note[] = [
  { name: 'D', pitch: 2 },
  { name: 'E', pitch: 4 },
  { name: 'F#', pitch: 6 },
  { name: 'G', pitch: 7 },
  { name: 'A', pitch: 9 },
  { name: 'B', pitch: 11 },
  { name: 'C#', pitch: 1 },
];

interface Case {
  name: string;

  root: Note;
  expected: Note[];
}

const majorKeyCases: Case[] = [
  {
    name: 'Major C',
    root: Notes[0],
    expected: C_MAJOR_SCALE,
  },
  {
    name: 'Major G',
    root: Notes[9],
    expected: G_MAJOR_SCALE,
  },
  {
    name: 'Major D',
    root: Notes[3],
    expected: D_MAJOR_SCALE,
  },
];

describe('key properties tests', () => {
  test.each(majorKeyCases)('$name', ({ root: root, expected: exp }) => {
    const mk = new MajorKey(root, major_formula);
    expect(mk.scaleNotes()).toEqual(exp);
  });
});
