import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircle,
  faCircleXmark,
  faCircleCheck,
  type IconDefinition,
} from '@fortawesome/free-regular-svg-icons';
import { arrayCompare } from '../../../../utils/arrayComparison';
import type { Question } from '../../../../models/quiz';

interface QuestionLiProps {
  q: Question;
  userAnswer: number[];
  isAnswered: boolean;
}
/**
 * Used in question progress list
 */
export default function QuestionLiMember({
  q,
  isAnswered,
  userAnswer,
}: QuestionLiProps) {
  let isRight = false;
  if (!arrayCompare(userAnswer, [])) {
    isRight = arrayCompare(q.answerIndexes, userAnswer);
  }
  return (
    <div className="m-3 inline-flex items-center">
      {isAnswered
        ? isRight
          ? FaIcon(faCircleCheck)
          : FaIcon(faCircleXmark)
        : FaIcon(faCircle)}
      <p className="mx-2">{q.text}</p>
    </div>
  );
}

function FaIcon(icon: IconDefinition) {
  let bg_color = 'surface';

  if (icon === faCircleCheck) {
    bg_color = 'success';
  } else if (icon === faCircleXmark) {
    bg_color = 'error';
  }

  return (
    <FontAwesomeIcon
      icon={icon}
      className={`bg-${bg_color} rounded-xl text-2xl`}
    />
  );
}
