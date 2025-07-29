import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import H3Heading from '../../atoms/headings/H3Heading';
import type { Question } from '../../../models/quiz';
import { QuestionOptions } from './Options';

interface QuizQuestionProps {
  q: Question;
  onSubmitAnswer: (selectedIndexes: number[]) => void;
}

export default function ChooseOneQuestion({
  q,
  onSubmitAnswer,
}: QuizQuestionProps) {
  const validationSchema = Yup.object({
    answer: Yup.string().required('Please select an option'),
  });

  return (
    <div>
      <H3Heading>{q.text}</H3Heading>

      <Formik
        key={q.id}
        initialValues={{ answer: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onSubmitAnswer([Number(values.answer)]);
        }}
      >
        {() => (
          <Form className="mx-auto flex flex-col items-center">
            <QuestionOptions options={q.options}></QuestionOptions>

            <ErrorMessage
              name="answer"
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
