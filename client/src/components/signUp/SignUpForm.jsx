import { Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import {
  validateEmail,
  validatePassword,
} from "../../validations/formikValidation";
import { useDispatch } from "react-redux";
import { addUserAction } from "../../services/actions/UserActions";

export const SignUpForm = () => {
  const todayDate = new Date();
  const todayDateStr = todayDate.toISOString().slice(0, 10);
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    axios
      .post("/api/users", values)
      .then((response) => {
        const res = response.data;
        const userData = { ...response.data };
        delete userData.password;
        delete userData.terms;
        const userData2 = { ...userData, _id: response.data._id };
        dispatch(addUserAction(userData2));
        console.log("Posted data: ", userData2);
        if (res.error) setMsg("E-mail or username already taken.");
        else setMsg("New account created succesful!");
      })
      .catch((err) => {
        console.log(err);
        setMsg("E-mail already taken.");
      });
  };

  return (
    <div>
      <div className="text-center m-3">
        <div className="text-red-700 font-mono">{msg}</div>
      </div>
      <Formik
        initialValues={{
          username: "",
          firstName: "",
          lastName: "",
          email: "",
          dateOfBirth: "",
          password: "",
          terms: false,
          shelfs: [],
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
            <label>Date of birth: </label>
            <Field name="dateOfBirth" type="date" max={todayDateStr} required />
            <label>
              <Field name="terms" type="checkbox" required />
              <span className="text-zinc-600"> Terms & conditions</span>
            </label>
            <button
              type="submit"
              className=" bg-emerald-600 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded"
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
