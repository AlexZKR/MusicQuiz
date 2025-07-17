import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import type { Question } from "../../models/quiz";
import H3Heading from "../headings/H3Heading";

interface QuizQuestionProps {
  q: Question;
  onSubmitAnswer: (selectedIndex: number) => void;
}

export default function QuizQuestion({ q, onSubmitAnswer }: QuizQuestionProps) {
  const validationSchema = Yup.object({
    answer: Yup.string().required("Please select an option"),
  });

  return (
    <div>
      <H3Heading>{q.text}</H3Heading>

      <Formik
        initialValues={{ answer: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onSubmitAnswer(Number(values.answer));
        }}
      >
        {() => (
          <Form className="flex flex-col mx-auto items-center">
            <ChooseOneQuestion options={q.options}></ChooseOneQuestion>

            <ErrorMessage
              name="answer"
              component="div"
              className="text-red-500"
            />
            <button
              type="submit"
              className="
                bg-green-800 hover:bg-green-600
                text-white font-semibold
                px-6 py-2 rounded
                transition
                cursor-pointer
                mx-auto mt-5
              "
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

function ChooseOneQuestion({ options }: ChooseOneQuestionProps) {
  return (
    <div
      className="flex justify-center flex-wrap gap-4"
      role="group"
      aria-labelledby="radio-group"
    >
      {options.map((option, index) => (
        <label
          key={index}
          className="
            cursor-pointer
            bg-gray-200 dark:bg-gray-700
            hover:bg-gray-300 dark:hover:bg-gray-600
            px-4 py-2 rounded
            flex items-center space-x-2
            transition
          "
        >
          <Field
            type="radio"
            name="answer"
            value={String(index)}
            className="form-radio h-5 w-5 text-green-600"
          />
          <span className="select-none">{option}</span>
        </label>
      ))}
    </div>
  );
}
