import { Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";

export const LoginForm = () => {
  const handleSubmit = (values) => {
    console.log(values);
  };

  const validatePassword = (value) => {
    let error;
    if (!value) {
      error = "Required";
    } else if (!/^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$/i.test(value)) {
      error = "Wrong password";
    }
    return error;
  };

  return (
    <div>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={(values) => handleSubmit(values)}
        enableReinitialize={true}
      >
        {({ errors, touched, isValidating }) => (
          <Form className="flex flex-col m-5 items-center gap-3">
            <Field
              name="username"
              type="text"
              placeholder="username"
              // validate={validateUsername}
              required
              className=""
            />
            {errors.username && touched.username && (
              <div className="text-red-700">{errors.username}</div>
            )}
            <Field
              name="password"
              type="password"
              placeholder="password"
              validate={validatePassword}
              required
            />
            {errors.password && touched.password && (
              <div className="text-red-700">{errors.password}</div>
            )}
            <button
              type="submit"
              className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
            <Link to="/sign-up">
              <button>Sing Up</button>
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};
