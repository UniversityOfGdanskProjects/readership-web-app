import { Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

import {
  validateEmail,
  validatePassword,
  validateNoSpace
} from "../../validations/formikValidation";
import { useDispatch, useSelector } from "react-redux";
import { addUserAction } from "../../services/actions/UserActions";
import { getAllShelfsAction } from "../../services/actions/ShelfActions";


export const SignUpForm = () => {
  const todayDate = new Date();
  const todayDateStr = todayDate.toISOString().slice(0, 10);
  const [msg, setMsg] = useState("");
  const [msg2, setMsg2] = useState("");
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);


  const handleSubmit = (values) => {
    axios
      .post("http://localhost:4000/api/users", values)
      .then((response) => {
        const res = response.data;
        const userData = { ...response.data };
        delete userData.password;
        delete userData.terms;
        const userData2 = { ...userData, _id: response.data._id };
        dispatch(addUserAction(userData2));
        const shelfs = [...users.map(u => {
          const shelf = {user_id: u._id, shelfs: {...u.shelfs}}
          return shelf
        })]
        dispatch(getAllShelfsAction(shelfs));
        console.log(shelfs);
        console.log("Posted data: ", userData2);
        if (res.error) setMsg("E-mail or username already taken.");
        else {
          setMsg("");
          setMsg2("Account created succesfuly!");
        }
      })
      .catch((err) => {
        console.log(err);
        setMsg2("");
        setMsg("Couldn't create account.");
      });
  };

  return (
    <div>
      <div className="text-center m-3">
        <div className="text-red-700 font-mono">{msg}</div>
        <div className="text-emerald-700 font-mono">{msg2}</div>
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
          shelfs: { read: [], "want to read": [] },
        }}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values);
          resetForm();
        }}
        enableReinitialize={true}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col m-5 items-center gap-3">
            <Field
              name="username"
              type="text"
              placeholder="username"
              validate={validateNoSpace}
              required
            />
                          {errors.username && touched.username && (
                <div className="text-red-700">{errors.username}</div>
              )}
            <Field
              name="firstName"
              type="text"
              placeholder="firstname"
              validate={validateNoSpace}
              required
              />
              {errors.firstName && touched.firstName && (
                <div className="text-red-700">{errors.firstName}</div>
              )}
            <Field
              name="lastName"
              type="text"
              placeholder="lastname"
              validate={validateNoSpace}
              required
              />
              {errors.lastName && touched.lastName && (
                <div className="text-red-700">{errors.lastName}</div>
              )}
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
            <button type="submit" className="all-buttons">
              Submit
            </button>
            <Link to="/">
              <button className="all-buttons">Log In</button>
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};
