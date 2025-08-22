import { major_formula, minor_formula } from '../../config/music_constants';
import { type Note } from '../../models/note';
import { NoteIterator } from './utils/note_iterator';

export class Key {
  root: Note;
  formula: number[];

  constructor(root: Note, formula: number[]) {
    this.root = root;
    this.formula = formula;
  }

  scaleName(): string {
    let name = `${this.root.name}`;
    if (this.formula === major_formula) name += ' major scale';
    if (this.formula === minor_formula) name += ' minor scale';
    return name;
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
      result.some((n) => n.name[0] === curr_note_letter);

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
