import { major_formula, minor_formula } from '../../config/music_constants';
import { type Note } from '../../models/note';
import { Key } from './key';

export class KeyFactory {
  static createMajorKey(root: Note) {
    return new Key(root, major_formula);
  }

  static createMinorKey(root: Note) {
    return new Key(root, minor_formula);
  }
}
