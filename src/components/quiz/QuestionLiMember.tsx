import type { Question } from '../../models/quiz';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircle,
  faCircleXmark,
  faCircleCheck,
  type IconDefinition,
} from '@fortawesome/free-regular-svg-icons';
interface QuestionLiProps {
  q: Question;
  userAnswerIndex: number;
  isAnswered: boolean;
}

export default function QuestionLiMember({
  q,
  isAnswered,
  userAnswerIndex,
}: QuestionLiProps) {
  const isRight = q.answerIndex === userAnswerIndex;
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
  let bg_color;
  switch (icon) {
    case faCircleCheck:
      bg_color = 'success';
      break;
    case faCircleXmark:
      bg_color = 'error';
      break;
    case faCircle:
      bg_color = 'surface';
      break;
    default:
      break;
  }
  return (
    <FontAwesomeIcon
      icon={icon}
      className={`bg-${bg_color} rounded-xl text-2xl`}
    />
  );
}
