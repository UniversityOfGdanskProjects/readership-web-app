import { useGlobal } from "../../services/context/GlobalContext";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateShelfAction } from "../../services/actions/ShelfActions";
import Rating from "./Rating";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { deleteBookAction } from "../../services/actions/BookActions";
import Swal from "sweetalert2/src/sweetalert2.js";
import { updateUserAction } from "../../services/actions/UserActions";

export const BookDetails = ({ book, bookAuthors }) => {
  const { currentUserID, currentRole, loading, setLoading } = useGlobal();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userShelfs = useSelector((state) => {
    const shelfs = state.shelfs;
    const userShelfs = shelfs.filter((s) => s.user_id === currentUserID)[0][
      "shelfs"
    ];
    console.log("Returning userShelfs state...", userShelfs);
    return userShelfs;
  });

  const [isRead, setIsRead] = useState(
    userShelfs === undefined ? null : userShelfs?.read?.indexOf(book._id) !== -1
  );
  const [readButtonMsg, setReadButtonMsg] = useState(
    isRead ? "Read!:)" : "Add to read"
  );

  //   const chooseShelf = user.shelf.map((s) => {
  //     <optons></optons>;
  //   });

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

  const handleDelete = () => {
    setLoading(true);
    axios.delete(`http://localhost:4000/api/books/${book._id}`).then((res) => {
      dispatch(deleteBookAction(res.data._id));
      navigate("/home");
    });
    setLoading(false);
  };

  const handleUpdate = () => {
    console.log("Admin want to update a book ", book._id);
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
    <div className="">
      {loading ? (
        "Loading..."
      ) : (
        <section className="text-gray-700 body-font overflow-hidden bg-white">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img
                alt={book.title}
                className=" max-h-[32rem] object-cover object-center  border border-gray-200"
                src={book.photo_src}
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  {bookAuthors}
                </h2>

                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {book.title}
                </h1>
                <div className="flex mb-4">
                  <span className="flex items-center">
                    <span className="text-gray-600 ">
                      {/*TODO rating */}
                      {/* <Rating book={book} user={currentUserID} /> */}
                    </span>
                  </span>
                </div>
                <p className="leading-relaxed">{book.description}</p>
                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                  <div className="flex flex-col text-sm">
                    <div className="">Pages: {book.pages}</div>
                    <div className="">
                      Publication day: {book.publicationDate.slice(0, 10)}
                    </div>
                    <div className="">Publisher: {book.publisher}</div>
                    <div className="">Language: {book.language}</div>
                  </div>
                </div>
                <div className="flex">
                  {currentRole === "admin" ? (
                    <>
                      <button
                        className="flex ml-auto all-buttons"
                        onClick={handleDelete}
                      >
                        Delete book
                      </button>
                      <button
                        className="flex ml-0 all-buttons"
                        onClick={handleUpdate}
                      >
                        Update book
                      </button>
                    </>
                  ) : (
                    <div className="flex items-center gap-x-5">
                      <div>
                        <button
                          onClick={handleReadButton}
                          className="all-buttons"
                        >
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
                                    {userShelfs[shelfName].indexOf(book._id) !==
                                    -1 ? (
                                      <li>
                                        <span
                                          className="hover:bg-red-700 bg-red-300 text-white mr-2 mt-0.5 rounded"
                                          onClick={() =>
                                            deleteFromShelf(shelfName)
                                          }
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
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
