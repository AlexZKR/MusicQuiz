import { describe, expect, test } from 'vitest';
import { Notes, type Note } from '../../models/note';
import { KeyFactory } from './key_factory';
import {
  C_MAJOR_SCALE,
  G_MAJOR_SCALE,
  D_MAJOR_SCALE,
} from './testdata/key_test_data';

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
    const mk = KeyFactory.createMajorKey(root);
    expect(mk.scaleNotes()).toEqual(exp);
  });
});
