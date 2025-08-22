import type { Note } from '../../../../models/note';
import type { Key } from '../../../../services/keys/key';

export const KeyScaleNotesList = ({ scaleKey }: { scaleKey: Key }) => {
  return (
    <div className="text-content mx-auto w-full max-w-2xl text-center">
      <h3 className="text-secondary mb-1 text-xl font-semibold">
        {scaleKey.scaleName()}
      </h3>
      <div className="flex items-baseline justify-around gap-1">
        {scaleKey.scaleNotes().map((note, index) => (
          <KeyScaleNoteLi note={note} key={note.pitch} isRoot={index === 0} />
        ))}
      </div>
    </div>
  );
};

const KeyScaleNoteLi = ({ note, isRoot }: { note: Note; isRoot?: boolean }) => {
  return (
    <span
      className={`rounded px-3 py-2 font-mono text-lg font-medium ${
        isRoot
          ? 'bg-accent text-surface'
          : 'bg-badge text-badge border-primary border-2'
      } transition-all duration-200 ${isRoot ? 'hover:scale-120' : 'hover:scale-105'}`}
    >
      {note.name}
    </span>
  );
};
