import { Link, useParams } from "react-router-dom";
import { useGlobal } from "../../services/context/GlobalContext";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateShelfAction } from "../../services/actions/ShelfActions";
import { useEffect } from "react";
import axios from "axios";

export const BookDetails = ({ book }) => {
  const users = useSelector((state) => state.users);
  const { currentUserID } = useGlobal();
  const dispatch = useDispatch();

  console.log(users);

  let currentUserInfo = users.filter((u) => u._id === currentUserID)[0];
  console.log(currentUserInfo);
  const readShelfList = currentUserInfo.shelfs["read"];
  const [isRead, setIsRead] = useState(readShelfList.indexOf(book._id) !== -1);
  const [readButtonMsg, setReadButtonMsg] = useState(
    isRead ? "Read!:)" : "Add to read"
  );

  //   const chooseShelf = currentUserInfo.shelf.map((s) => {
  //     <optons></optons>;
  //   });

  const authors = useSelector((state) => state.authors);
  const bookID = book._id;
  console.log("BOOKID", bookID);
  console.log(book);

  const handleReadButton = () => {
    console.log("buttonClicked");
    currentUserInfo = users.filter((u) => u._id === currentUserID)[0];
    if (!isRead) {
      axios
        .patch(`http://localhost:4000/api/users/${currentUserID}`, {
          shelfs: {
            ...currentUserInfo.shelfs,
            read: [...currentUserInfo.shelfs["read"], book._id],
          },
        })
        .then((res) => {
          console.log(res);
          console.log("Adding to read:", {
            read: [...currentUserInfo.shelfs["read"], book._id],
          });
          // action.paylood = {
          //     user_id: currentUserID,
          //     shelfToUpDate: {
          //             shelfName: [books]
          //      }
          // }
          dispatch(
            updateShelfAction({
              user_id: currentUserID,
              shelfToUpDate: {
                read: [...currentUserInfo.shelfs["read"], book._id],
              },
            })
          );
          setReadButtonMsg("Read!:)");
          console.log("Added to READ");
          setIsRead(true);
        })
        .catch((err) => console.log(err));
    } else {
      //
      const ReadShelfWithoutBook = currentUserInfo.shelfs["read"].filter(
        (bID) => bID !== book._id
      );
      // currentShelfs;
      axios
        .patch(`/api/users/${currentUserID}`, {
          shelfs: {
            ...currentUserInfo.shelfs,
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
  };

  return (
    <div className="">
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              className=" max-h-[32rem] object-cover object-center  border border-gray-200"
              src={book.photo_src}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {authors.map((author) =>
                  book.author.map((bookAuthor) => {
                    author._id == bookAuthor ? author.fullName : "";
                  })
                )}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {book.title}
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <span className="text-gray-600 ml-3">{/*TODO rating */}</span>
                </span>
              </div>
              <p className="leading-relaxed">{book.description}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                <div className="flex ml-6 items-center">
                  <div className="relative"></div>
                </div>
              </div>
              <div className="flex">
                <button
                  onClick={handleReadButton}
                  className="title-font font-medium py-2 px-6 focus:outline-none hover:bg-slate-600 rounded text-slate-50 bg-emerald-600"
                >
                  {readButtonMsg}
                </button>
                <button className="flex ml-auto font-medium text-slate-50 bg-emerald-600 border-0 py-2 px-6 focus:outline-none hover:bg-slate-600 rounded">
                  Add to shelf
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
