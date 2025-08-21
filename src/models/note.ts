type NoteName =
  | 'C'
  | 'C#'
  | 'Db'
  | 'D'
  | 'D#'
  | 'Eb'
  | 'E'
  | 'F'
  | 'F#'
  | 'G'
  | 'G#'
  | 'Ab'
  | 'A'
  | 'A#'
  | 'Bb'
  | 'B';

export interface Note {
  name: NoteName;
  pitch: number;
}

export const Notes: Note[] = [
  { name: 'C', pitch: 0 },
  { name: 'C#', pitch: 1 },
  { name: 'Db', pitch: 1 },
  { name: 'D', pitch: 2 },
  { name: 'D#', pitch: 3 },
  { name: 'Eb', pitch: 3 },
  { name: 'E', pitch: 4 },
  { name: 'F', pitch: 5 },
  { name: 'F#', pitch: 6 },
  { name: 'G', pitch: 7 },
  { name: 'G#', pitch: 8 },
  { name: 'Ab', pitch: 8 },
  { name: 'A', pitch: 9 },
  { name: 'A#', pitch: 10 },
  { name: 'Bb', pitch: 10 },
  { name: 'B', pitch: 11 },
];
