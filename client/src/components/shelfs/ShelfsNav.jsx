import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useGlobal } from "../../services/context/GlobalContext";
import {
  addShelfAction,
  deleteShelfAction,
} from "../../services/actions/ShelfActions";
import { Form, Formik, Field } from "formik";
import { useState } from "react";
import Shelf from "./Shelf";
import { updateUserAction } from "../../services/actions/UserActions";
import Swal from "sweetalert2/src/sweetalert2.js";

const ShelfNav = () => {
  const { currentUserID } = useGlobal();
  const shelfsWithID = useSelector((state) => state.shelfs);
  console.log(shelfsWithID);
  const userShelfs = shelfsWithID.filter(
    (shelfAndId) => shelfAndId.user_id === currentUserID
  )[0].shelfs;
  console.log(userShelfs);
  console.log(Object.keys(userShelfs));
  const [currentShelf, setCurrentShelf] = useState("read");
  const dispatch = useDispatch();

  const validateShelf = (value) => {
    let error;
    const anotherShelfs = userShelfs[value];
    if (anotherShelfs !== undefined) {
      return error;
    }
    if (!/^[A-Za-z0-9_ *]*$/.test(value)) {
      return error;
    }
  };

  const deleteShelf = (shelfName) => {
    Swal.fire({
      title: `Remove "${shelfName}" shelf?`,
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const tmp = shelfName;
        delete tmp[shelfName];
        const dataToUpdate = { shelfs: tmp };
        axios
          .patch(`http://localhost:4000/api/users/${currentUserID}`, {
            shelfs: { ...userShelfs, ...dataToUpdate },
          })
          .then((res) => {
            console.log("Updated account data: ", currentUserID, res.data);
            dispatch(updateUserAction(res.data));
            dispatch(
              deleteShelfAction({
                user_id: currentUserID,
                delShelfName: shelfName,
              })
            );
          })
          .catch((err) => {
            console.log(err);
          });
        Swal.fire("", `Shelf: "${shelfName}" has removed`);
      }
    });
  };

  const handleSubmit = (values) => {
    if (userShelfs[values.newShelfName] !== undefined) {
      Swal.fire("Couldn't create shelf");
      return;
    }
    const dataToAdd = { [values.newShelfName]: [] };
    console.log("Data to add:", dataToAdd);
    axios
      .patch(`http://localhost:4000/api/users/${currentUserID}`, {
        shelfs: { ...userShelfs, ...dataToAdd },
      })
      .then((response) => {
        console.log("Updated account data: ", currentUserID, response.data);
        dispatch(updateUserAction(response.data));
        dispatch(
          addShelfAction({
            user_id: currentUserID,
            newShelfName: values.newShelfName,
          })
        );
        Swal.fire({
          title: "Added new shelf",
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Shelf already exists!",
        });
      });
  };
  return (
    <div className="flex-col ml-5">
      <div className="flex-column align-baseline m-5">
        <div className="text-2xl font-medium">Add new shelf: </div>
        <Formik
          initialValues={{
            newShelfName: "",
          }}
          onSubmit={(values, { resetForm }) => {
            handleSubmit(values);
            resetForm();
          }}
          enableReinitialize={true}
          className="justify-center"
        >
          {({ errors, touched, isValidating }) => (
            <Form className="flex-row m-5 items-center gap-3">
              <Field
                name="newShelfName"
                type="text"
                placeholder="new shelf"
                validate={validateShelf}
                required
                className=""
              />
              {errors.newShelfName && (
                <div className="text-red-700">{errors.newShelfName}</div>
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
          {console.log(Object.keys(userShelfs))}
          {Object.keys(userShelfs).map((shelfName) => {
            return (
              <li
                key={shelfName}
                className="hover:underline text-xl font-medium ml-5"
              >
                {shelfName !== "read" ? (
                  <button
                    className="hover:bg-red-700 bg-red-300 text-white mr-2 mt-0.5 rounded"
                    onClick={() => deleteShelf(shelfName)}
                  >
                    <svg
                      className="h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                ) : (
                  ""
                )}
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
      {/* <Shelf
        name={currentShelf}
        setCurrentShelf={setCurrentShelf}
        userShelfs={userShelfs}
        key={currentShelf}
      /> */}
    </div>
  );
};

export default ShelfNav;
