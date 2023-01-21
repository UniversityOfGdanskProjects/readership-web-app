import { Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";

export const SignUpForm = () => {
  const todayDate = new Date();
  const todayDateStr = todayDate.toISOString().slice(0, 10);

  const handleSubmit = (values) => {
    console.log(values);
  };

  const validateEmail = (value) => {
    let error;
    if (!value) {
      error = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  };

  const validatePassword = (value) => {
    let error;
    if (!value) {
      error = "Required";
    } else if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/i.test(value)) {
      error =
        "Password: min. 8 characters, number, upercase & lowercase letters ";
    }
    return error;
  };

  return (
    <div>
      <Formik
        initialValues={{
          username: "",
          firstName: "",
          lsatName: "",
          email: "",
          dateOfBirth: "",
          password: "",
          terms: false,
        }}
        onSubmit={(values) => handleSubmit(values)}
        enableReinitialize={true}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col m-5 items-center gap-3">
            <Field
              name="username"
              type="text"
              placeholder="username"
              required
              className=""
            />
            <Field
              name="firstName"
              type="text"
              placeholder="firstname"
              required
            />
            <Field
              name="lastName"
              type="text"
              placeholder="lastname"
              required
            />
            <Field
              name="email"
              type="text"
              placeholder="e-mail"
              validate={validateEmail}
              required
              className=""
            />
            {errors.email && touched.email && (
              <div className="text-red-700">{errors.email}</div>
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
            <Field name="dateOfBirth" type="date" max={todayDateStr} required />
            <label>
              <Field name="terms" type="checkbox" required />
              <span className="text-zinc-600"> Terms & conditions</span>
            </label>
            <button
              type="submit"
              className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
            <Link to="/">
              <button>Log In</button>
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};
