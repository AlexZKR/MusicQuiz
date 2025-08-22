import { describe, expect, test } from 'vitest';
import { Notes, type Note } from '../../models/note';
import { KeyFactory } from './key_factory';
import {
  C_MAJOR_SCALE,
  G_MAJOR_SCALE,
  D_MAJOR_SCALE,
  C_MINOR_SCALE,
  D_MINOR_SCALE,
  G_MINOR_SCALE,
} from './testdata/key_test_data';

type KeyType = 'major' | 'minor';

interface Case {
  name: string;
  root: Note;
  expected: Partial<Record<KeyType, Note[]>>;
}

const keyCases: Case[] = [
  {
    name: 'C',
    root: Notes[0],
    expected: { major: C_MAJOR_SCALE, minor: C_MINOR_SCALE },
  },
  {
    name: 'G',
    root: Notes[9],
    expected: { major: G_MAJOR_SCALE, minor: G_MINOR_SCALE },
  },
  {
    name: 'D',
    root: Notes[3],
    expected: { major: D_MAJOR_SCALE, minor: D_MINOR_SCALE },
  },
];

describe('key scaleNotes tests', () => {
  describe('major keys', () => {
    test.each(keyCases)('$name major scale', ({ root, expected }) => {
      if (expected.major) {
        const majorKey = KeyFactory.createMajorKey(root);
        expect(majorKey.scaleNotes()).toEqual(expected.major);
      }
    });
  });

  describe('minor keys', () => {
    test.each(keyCases)('$name minor scale', ({ root, expected }) => {
      if (expected.minor) {
        const minorKey = KeyFactory.createMinorKey(root);
        expect(minorKey.scaleNotes()).toEqual(expected.minor);
      }
    });
  });
});
