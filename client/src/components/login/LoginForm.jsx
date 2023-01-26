import { Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useGlobal } from "../../services/context/GlobalContext";
import { useState } from "react";
import axios from "axios";

export const LoginForm = () => {
  const navigate = useNavigate();
  const { toLogIn, setIsLog } = useGlobal();
  const [msg, setMsg] = useState("");
  const handleSubmit = (values) => {
    axios
      .post("/api/users/login", values)
      .then((res) => {
        //  ok response { isLogin: true,
        //   email: user.email,
        //   role: role,
        //   token }
        console.log(res);
        if (res.data.isLogin) {
          toLogIn(res.data);
          navigate("/home");
        } else {
          setMsg("Niepoprawne logowanie!");
        }
      })
      .catch((err) => {
        setMsg("Coś poszło nie tak!");
        console.log(err);
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
      error = "Wrong password";
    }
    return error;
  };

  return (
    <div>
      <div>{msg}</div>
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
            <button
              type="submit"
              className=" bg-emerald-600 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
            <Link to="/sign-up">
              <button>Sign Up</button>
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};
