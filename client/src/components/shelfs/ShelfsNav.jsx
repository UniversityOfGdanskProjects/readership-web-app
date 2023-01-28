import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useGlobal } from "../../services/context/GlobalContext";
import { addShelfAction } from "../../services/actions/ShelfActions";
import { Link } from "react-router-dom";
import { Form, Formik, Field } from "formik";
import { useState } from "react";
import Shelf from "./Shelf";

const ShelfNav = ({ shelfs }) => {
  console.log(Object.keys(shelfs));
  const books = useSelector((state) => state.books);
  const [currentShelf, setCurrentShelf] = useState("read");
  const [msg, setMsg] = useState("");
  const { currentUserID } = useGlobal();
  const dispatch = useDispatch();

  const validateShelf = (value) => {
    let error;
    const anotherShelfs = shelfs[value];
    if (anotherShelfs !== undefined) {
      return error;
    }
  };

  const handleSubmit = (values) => {
    const dataToAdd = { [values.shelf]: [] };
    console.log("Data to add:", dataToAdd);
    axios
      .patch(`http://localhost:4000/api/users/${currentUserID}`, {
        shelfs: { ...shelfs, ...dataToAdd },
      })
      .then((response) => {
        console.log("Updated account data: ", currentUserID);
        dispatch(addShelfAction(dataToAdd));
        setMsg("Added new shelf!");
      })
      .catch((err) => {
        console.log(err);
        setMsg("Couldn't create shelf.");
      });
  };
  return (
    <div className="flex-col ml-5">
      <div>{msg}</div>
      <div className="flex-column align-baseline m-5">
        <div className="text-2xl font-medium">Add new shelf: </div>
        <Formik
          initialValues={{
            shelf: "",
          }}
          onSubmit={(values) => handleSubmit(values)}
          enableReinitialize={true}
          className="justify-center"
        >
          {({ errors, touched, isValidating }) => (
            <Form className="flex-row m-5 items-center gap-3">
              <Field
                name="shelf"
                type="text"
                placeholder="new shelf"
                validate={validateShelf}
                required
                className=""
              />{" "}
              {errors.shelf && (
                <div className="text-red-700">{errors.shelf}</div>
              )}
              <button type="submit" className="all-buttons">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="flex-col border-b-2 ">
        <h2 className="text-2xl font-medium">Your shelfs: </h2>
        <ul className="flex-col">
          {console.log(Object.keys(shelfs))}
          {Object.keys(shelfs).map((shelfName) => {
            return (
              <li
                key={shelfName}
                className="hover:underline text-xl font-medium ml-5"
              >
                <button
                  className="hover:underline"
                  onClick={() => setCurrentShelf(shelfName)}
                >
                  {shelfName}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <Shelf name={currentShelf} key={currentShelf} />
    </div>
  );
};

export default ShelfNav;
