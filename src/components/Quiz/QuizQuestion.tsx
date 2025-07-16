import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import type { Question } from "../../models/quiz";

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
      <h3>{q.text}</h3>

      <Formik
        initialValues={{ answer: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onSubmitAnswer(Number(values.answer));
        }}
      >
        {() => (
          <Form>
            <div role="group" aria-labelledby="radio-group">
              {q.options.map((option, index) => (
                <label key={index}>
                  <Field type="radio" name="answer" value={String(index)} />{" "}
                  {option}
                </label>
              ))}
            </div>

            <ErrorMessage name="answer" component="div" />

            <button type="submit">Submit Answer</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
