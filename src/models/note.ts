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

export class NoteIterator implements Iterable<Note> {
  startNote: Note;
  count: number;

  /**
   * @param startNote note object (must match by `name` and `pitch`)
   * @param count how many notes to yield (-1 for infinite)
   */
  constructor(startNote: Note, count: number) {
    this.startNote = startNote;
    this.count = count;
  }

  [Symbol.iterator](): Iterator<Note> {
    let curr = Notes.indexOf(this.startNote);
    let remaining = this.count;

    return {
      next(): IteratorResult<Note> {
        if (remaining === 0) {
          return { value: undefined, done: true };
        }

        if (curr >= Notes.length) {
          // makes this cyclic
          curr = 0;
        }

        if (remaining > 0) {
          // if remaining < 0, we don't decrement (infinite mode)
          remaining--;
        }

        return { value: Notes[curr++], done: false };
      },
    };
  }
}

export interface Key {
  root: Note;
  formula: number[];

  scaleNotes: () => Note[];
  //   accidentals: () => Note[];
  //   stable_steps: () => Note[];
}

export const major_formula = [2, 2, 1, 2, 2, 2, 1];

export class MajorKey implements Key {
  root: Note;
  formula: number[];

  constructor(root: Note, formula: number[]) {
    this.root = root;
    this.formula = formula;
  }

  scaleNotes(): Note[] {
    const result = [this.root];

    let curr_interval_index = 0;
    let curr_pitch = this.root.pitch;

    // calculates next's notes pitch according to the formula
    const next_note_pitch = (last_note_pitch: number) => {
      const p = last_note_pitch + this.formula[curr_interval_index];
      if (p > 12) return 12 - p + this.formula[curr_interval_index]; //overlap to the octave's start accounting for prev octave's result
      if (p === 12) return 0; // of no result, then start from 0
      return p;
    };

    //resolve C# vs Db problem - already added LETTERS shouldn't repeat (that's why name[0])
    const isNoteRepeating = (curr_note_letter: string) =>
      result.every((n) => n.name[0] === curr_note_letter);

    for (const note of new NoteIterator(this.root, -1)) {
      // infinite loop exit condition
      if (curr_interval_index >= this.formula.length - 1) {
        // -1 because octaves aren't yet accounted for (don't include interval to the next octave's root )
        break;
      }

      // new_pitch - if iterator overlaps, then new_pitch will be smaller, then current
      // (we are iterating in one octave from start to end and then overlap to the start)
      if (note.pitch < curr_pitch) curr_pitch = 0;

      if (
        note.pitch === next_note_pitch(result[result.length - 1].pitch) &&
        !isNoteRepeating(note.name[0])
      ) {
        curr_pitch += this.formula[curr_interval_index];
        curr_interval_index++;
        result.push(note);
      } else {
        continue;
      }
    }
    return result;
  }
}
