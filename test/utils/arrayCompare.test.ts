import { arrayCompare } from '../../src/utils/arrayComparison';

interface Case<T> {
  name: string;

  arrayA: T[];
  arrayB: T[];
  expected: boolean;
}

const numberCases: Case<number>[] = [
  {
    name: 'number[] equal',
    arrayA: [1, 2],
    arrayB: [1, 2],
    expected: true,
  },
  {
    name: 'number[] equal, different order',
    arrayA: [1, 2],
    arrayB: [2, 1],
    expected: true,
  },
  {
    name: 'number[] not equal',
    arrayA: [1, 2],
    arrayB: [1, 1],
    expected: false,
  },
  {
    name: 'number[] not equal, diff length',
    arrayA: [1, 2],
    arrayB: [1],
    expected: false,
  },
];

describe('arrayCompare equality tests', () => {
  test.each(numberCases)('$name', ({ arrayA: A, arrayB: B, expected: exp }) => {
    expect(arrayCompare(A, B)).toEqual(exp);
  });
});
