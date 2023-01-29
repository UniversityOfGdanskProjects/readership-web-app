import { Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useGlobal } from "../../services/context/GlobalContext";
import { useState } from "react";
import { useLayoutEffect } from "react";
import axios from "axios";

export const LoginForm = () => {
  const { toLogIn } = useGlobal();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const handleSubmit = (values) => {
    axios
      .post("http://localhost:4000/api/users/login", values)
      .then((res) => {
        console.log(res.data);
        if (res.data.isLogin) {
          setMsg("Logged succes!");
          toLogIn(res.data);
          navigate("/home");
        }
      })
      .catch((err) => {
        console.log(err.message);
        setMsg("Wrong login data!");
      });
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
    } else if (!/^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$/i.test(value)) {
      error = "Incorrect password";
    }
    return error;
  };

  return (
    <div>
      <div className="text-center m-3">{msg}</div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values) => handleSubmit(values)}
        enableReinitialize={true}
      >
        {({ errors, touched, isValidating }) => (
          <Form className="flex flex-col m-5 items-center gap-3">
            <Field
              name="email"
              type="text"
              placeholder="email"
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
            <button type="submit" className="all-buttons">
              Submit
            </button>
            <Link to="/sign-up">
              <button className="all-buttons">Sign Up</button>
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};
