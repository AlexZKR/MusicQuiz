import { Notes, type Note } from '../../../models/note';

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
