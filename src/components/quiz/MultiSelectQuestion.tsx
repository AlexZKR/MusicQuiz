import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import type { Question } from '../../models/quiz';
import H3Heading from '../headings/H3Heading';

interface QuizQuestionProps {
  q: Question;
  onSubmitAnswer: (selectedIndexes: number[]) => void;
}

export default function MultiSelectQuestion({
  q,
  onSubmitAnswer,
}: QuizQuestionProps) {
  const validationSchema = Yup.object({
    answers: Yup.array().of(Yup.string()).min(1, 'Please select an option'),
  });

  return (
    <div>
      <H3Heading>{q.text}</H3Heading>

      <Formik
        key={q.id}
        initialValues={{ answers: [] as string[] }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onSubmitAnswer(values.answers.map((i) => Number(i)));
        }}
      >
        {() => (
          <Form className="mx-auto flex flex-col items-center">
            <QuestionOptions options={q.options}></QuestionOptions>

            <ErrorMessage
              name="answers"
              component="div"
              className="text-error mt-5"
            />
            <button
              type="submit"
              className="bg-primary text-content mx-auto mt-5 cursor-pointer rounded px-6 py-2 transition"
            >
              Submit Answer
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

interface ChooseOneQuestionProps {
  options: string[];
}

function QuestionOptions({ options }: ChooseOneQuestionProps) {
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
