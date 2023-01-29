import { useGlobal } from "../../services/context/GlobalContext";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateShelfAction } from "../../services/actions/ShelfActions";
import Rating from "./Rating";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { deleteBookAction } from "../../services/actions/BookActions";

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

  const handleDelete = () => {
    setLoading(true);
    axios.delete(`http://localhost:4000/api/books/${book._id}`).then((res) => {
      dispatch(deleteBookAction(res.data._id));
      navigate("/home");
    });
    setLoading(false);
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
                      Date: {book.publicationDate.slice(0, 10)}
                    </div>
                    <div className="">Publisher: {book.publisher}</div>
                    <div className="">Language: {book.language}</div>
                  </div>
                </div>
                <div className="flex">
                  {currentRole === "admin" ? (
                    <>
                      <button className="flex ml-auto all-buttons">
                        Delete book
                      </button>
                      <button className="flex ml-0 all-buttons">
                        Update book
                      </button>
                    </>
                  ) : (
                    <div>
                      <div>
                        <button
                          onClick={handleReadButton}
                          className="all-buttons"
                        >
                          {readButtonMsg}
                        </button>
                      </div>
                      <div className="collapse ml-0 m-5">
                        <input type="checkbox" className="peer" />
                        <div className=" collapse-title all-buttons peer-checked:bg-secondary peer-checked:text-secondary-content">
                          Add to shefl
                        </div>
                        <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                          {console.log(Object.keys(userShelfs))}
                          {Object.keys(userShelfs).map((shelf) => {
                            <button>{shelf}</button>;
                          })}
                        </div>
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
