import { useGlobal } from "../../services/context/GlobalContext";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateShelfAction } from "../../services/actions/ShelfActions";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2/src/sweetalert2.js";
import { updateUserAction } from "../../services/actions/UserActions";
import Comments from "./Comment";
import { AddComment } from "./AddComment";

const BookDetailsUserPanel = ({ book }) => {
  const { currentUserID, setLoading } = useGlobal();
  const dispatch = useDispatch();

  const userShelfs = useSelector((state) => {
    const userShelfs = state.shelfs.filter(
      (s) => s.user_id === currentUserID
    )[0]["shelfs"];
    console.log("Returning userShelfs state...", userShelfs);
    return userShelfs;
  });

  const [isRead, setIsRead] = useState(
    userShelfs === undefined ? null : userShelfs?.read?.indexOf(book._id) !== -1
  );
  const [readButtonMsg, setReadButtonMsg] = useState(
    isRead ? "Read!:)" : "Add to read"
  );

  const addToShelf = (shelfName) => {
    console.log("shelfName", shelfName, "\nuserShelfs", userShelfs);
    const tmp = userShelfs[shelfName];
    tmp.push(book._id);
    const dataToUpdate = { [shelfName]: tmp };
    console.log("dataToUpdate", dataToUpdate);
    axios
      .patch(`http://localhost:4000/api/users/${currentUserID}`, {
        shelfs: { ...userShelfs, ...dataToUpdate },
      })
      .then((res) => {
        console.log("Updated account data: ", currentUserID, res.data);
        dispatch(updateUserAction(res.data));
        dispatch(
          updateShelfAction({
            user_id: currentUserID,
            shelfToUpDate: dataToUpdate,
          })
        );
        Swal.fire("", `${book.title} added to "${shelfName}"`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteFromShelf = (shelfName) => {
    Swal.fire({
      title: `Remove ${book.title} from ${shelfName} ?`,
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("To delete:", shelfName, userShelfs, userShelfs[shelfName]);
        const dataToUpdate = {
          [shelfName]: userShelfs[shelfName].filter((b) => b !== book._id),
        };
        axios
          .patch(`http://localhost:4000/api/users/${currentUserID}`, {
            shelfs: { ...userShelfs, ...dataToUpdate },
          })
          .then((res) => {
            console.log("Updated account data: ", currentUserID, res.data);
            dispatch(updateUserAction(res.data));
            dispatch(
              updateShelfAction({
                user_id: currentUserID,
                shelfToUpDate: dataToUpdate,
              })
            );
            Swal.fire("", `${book.title} removed from "${shelfName}"`);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  const handleReadButton = () => {
    setLoading(true);
    console.log("buttonClicked");

    if (!isRead) {
      axios
        .patch(`http://localhost:4000/api/users/${currentUserID}`, {
          shelfs: {
            ...userShelfs,
            read: [...userShelfs["read"], book._id],
          },
        })
        .then((res) => {
          console.log("Adding to read, user response:", res.data);
          console.log("Adding to read:", {
            read: [...userShelfs["read"], book._id],
          });
          // action.paylood = {
          //     user_id: currentUserID,
          //     shelfToUpDate: {
          //             shelfName: [books]
          //      }
          // }
          console.log("New dispatch: ", {
            user_id: currentUserID,
            shelfToUpDate: {
              read: [...userShelfs.read, book._id],
            },
          });
          dispatch(
            updateShelfAction({
              user_id: currentUserID,
              shelfToUpDate: {
                read: [...userShelfs.read, book._id],
              },
            })
          );
          setReadButtonMsg("Read!:)");
          console.log("Added to READ");
          setIsRead(true);
        })
        .catch((err) => console.log(err));
    } else {
      console.log("userShelf alter click", userShelfs);
      const ReadShelfWithoutBook = userShelfs.read.filter(
        (bID) => bID !== book._id
      );
      // currentShelfs;
      axios
        .patch(`/api/users/${currentUserID}`, {
          shelfs: {
            ...userShelfs,
            read: ReadShelfWithoutBook,
          },
        })
        .then((res) => {
          dispatch(
            updateShelfAction({
              user_id: currentUserID,
              shelfToUpDate: { read: ReadShelfWithoutBook },
            })
          );
          setReadButtonMsg("Add to read");
          console.log("removed to read");
          setIsRead(false);
        })
        .catch((err) => console.log(err));
    }
    setLoading(false);
  };

  return (
    <div className="flex-column">
      <div className="flex items-center gap-x-5 m-3">
        <div>
          <button onClick={handleReadButton} className="all-buttons">
            {readButtonMsg}
          </button>
        </div>
        <div
          className=" dropdown dropdown-top tooltip hover:tooltip-open tooltip-right"
          data-tip={`Click to add/remove from shelf`}
        >
          <label
            tabIndex={0}
            className=" all-buttons "
            onClick={() => {
              if (Object.keys(userShelfs).length === 1) {
                Swal.fire(
                  'No shelfs besides "read"!',
                  'Go to "Shelfs" and create one! :)'
                );
              }
            }}
          >
            On shelfs
          </label>
          {Object.keys(userShelfs).length === 1 ? (
            <></>
          ) : (
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              {Object.keys(userShelfs)
                .filter((s) => s !== "read")
                .map((shelfName) => {
                  console.log(userShelfs, shelfName);
                  return (
                    <div key={shelfName}>
                      {userShelfs[shelfName].indexOf(book._id) !== -1 ? (
                        <li>
                          <span
                            className="hover:bg-red-700 bg-red-300 text-white mr-2 mt-0.5 rounded"
                            onClick={() => deleteFromShelf(shelfName)}
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
                            {shelfName}
                          </span>
                        </li>
                      ) : (
                        <li
                          className="mr-2 mt-0.5 p-2.5 hover:cursor-pointer rounded-lg hover:bg-green-400"
                          onClick={() => {
                            addToShelf(shelfName);
                          }}
                        >
                          {shelfName}
                        </li>
                      )}
                    </div>
                  );
                })}
            </ul>
          )}
        </div>
      </div>
      <AddComment book={book} />
    </div>
  );
};

export default BookDetailsUserPanel;
