import H1Heading from '../atoms/headings/H1Heading';
import H2HeadingSubtitle from '../atoms/headings/H2HeadingSubtitle';
import { KeyFactory } from '../../services/keys/key_factory';
import { Notes } from '../../models/note';
import { KeyScaleNotesList } from '../organisms/lists/scaleList/KeyScaleNotesList';

const TheoryPage = () => {
  const majorScales = [];
  const minorScales = [];
  let j = 1;
  for (let i = 0; i != Notes[j].pitch && i < 16; i++) {
    if (Notes[i].name.length > 1) continue;
    minorScales.push(KeyFactory.createMajorKey(Notes[i]));
    majorScales.push(KeyFactory.createMinorKey(Notes[i]));
    j = i;
  }

  return (
    <div>
      <H1Heading>Theory page</H1Heading>
      <H2HeadingSubtitle>Some useful learning material!</H2HeadingSubtitle>
      <div className="grid grid-cols-2 items-start gap-1">
        {' '}
        {/* Added items-start */}
        <div>
          <h3 className="text-primary mb-4 text-xl font-semibold">
            Minor scales
          </h3>
          <div className="flex flex-col items-start space-y-2">
            {' '}
            {/* Changed to flex-col items-start */}
            {majorScales.map((scale) => (
              <KeyScaleNotesList scaleKey={scale} key={scale.scaleName()} />
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-primary mb-4 text-xl font-semibold">
            Major scales
          </h3>
          <div className="flex flex-col items-start space-y-2">
            {' '}
            {/* Changed to flex-col items-start */}
            {minorScales.map((scale) => (
              <KeyScaleNotesList scaleKey={scale} key={scale.scaleName()} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheoryPage;
