import { useGlobal } from "../../services/context/GlobalContext";
import { useSelector } from "react-redux";
import { Form, Formik, Field } from "formik";
import axios from "axios";
import { useState } from "react";
import {
  validateEmail,
  validatePassword,
} from "../../validations/formikValidation";

const AccountSettings = () => {
  const { currentUserID, currentUser, toLogOut } = useGlobal();
  const users = useSelector((state) => state.users);
  const user = users.filter((user) => user._id === currentUserID)[0];
  const otherUsers = users.filter((user) => user._id !== currentUserID);
  const [msg, setMsg] = useState("");

  const handleSubmit = (values) => {
    const duplicatedMailOrUsername = otherUsers.filter((user) => {
      if (user.email === values.email || user.username === values.username) {
        return;
      }
    });
    console.log(duplicatedMailOrUsername);
    if (duplicatedMailOrUsername.length === 0) {
      axios
        .patch(`http://localhost:4000/api/users/${currentUserID}`, values)
        .then((response) => {
          const res = response.data;
          console.log("Updated account data: ", currentUserID);
          if (res.error) setMsg("E-mail or username already taken.");
          else setMsg("Updated account succesful!");
        })
        .catch((err) => {
          console.log(err);
          setMsg("E-mail or username already taken.");
        });
    } else {
      setMsg("E-mail or username already taken.");
    }
  };

  const deleteAccount = () => {
    console.log("Want to delete account");
    axios
      .delete(`http://localhost:4000/api/users/${currentUserID}`)
      .then((res) => {
        console.log("Account deleted");
        toLogOut();
      })
      .catch((err) => {
        console.log(err);
        setMsg("Cannot delete account");
      });
  };

  return (
    <div className="container mx-auto">
      <div className="inputs w-full max-w-2xl p-6 mx-auto">
        <h2 className=" text-center text-3xl font-bold text-emerald-600">
          Account Settings
        </h2>
        <div className="text-red-700">{msg}</div>
        <button
          type="button"
          onClick={() => {
            deleteAccount();
          }}
          className=" all-buttons"
        >
          Delete Account
        </button>
        <Formik
          className="mt-6 border-t border-gray-400 pt-4"
          initialValues={{
            username: currentUser.username,
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            email: currentUser.email,
            // dateOfBirth: currentUser.dateOfBirth,
            password: "",
          }}
          onSubmit={(values) => handleSubmit(values)}
          enableReinitialize={true}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col m-5 items-center gap-3">
              <div>Username:</div>
              <Field
                name="username"
                type="text"
                placeholder="username"
                required
                className="border p-1"
              />
              <div>Firstname:</div>
              <Field
                name="firstName"
                type="text"
                placeholder="firstname"
                required
                className="border p-1"
              />
              <div>Lastname:</div>
              <Field
                name="lastName"
                type="text"
                placeholder="lastname"
                required
                className="border p-1"
              />
              <div>Email:</div>
              <Field
                name="email"
                type="text"
                placeholder="e-mail"
                validate={validateEmail}
                required
                className="border p-1"
              />
              {errors.email && touched.email && (
                <div className="text-red-700">{errors.email}</div>
              )}
              <div>Confirm password:</div>
              <Field
                name="password"
                type="password"
                placeholder="password"
                validate={validatePassword}
                required
                className="border p-1"
              />
              {errors.password && touched.password && (
                <div className="text-red-700">{errors.password}</div>
              )}
              {/* <label>Date of birth: </label>
                  <Field
                    name="dateOfBirth"
                    type="date"
                    max={todayDateStr}
                    placeholder={currentUser.dateOfBirth}
                  /> */}
              <button type="submit" className=" all-buttons">
                Save changes
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AccountSettings;
