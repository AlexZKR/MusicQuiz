import { Field } from 'formik';

interface ChooseOneQuestionProps {
  options: string[];
}

export function QuestionOptions({ options }: ChooseOneQuestionProps) {
  return (
    <div
      className="flex flex-wrap justify-center gap-4"
      role="group"
      aria-labelledby="radio-group"
    >
      {options.map((option, index) => (
        <label
          key={index}
          className="bg-surface hover:bg-tertiary flex cursor-pointer items-center space-x-2 rounded px-4 py-2 transition"
        >
          <Field
            type="checkbox"
            name="answers"
            value={String(index)}
            className="form-radio text-content h-5 w-5"
          />
          <span className="select-none">{option}</span>
        </label>
      ))}
    </div>
  );
}
