import { useGlobal } from "../../services/context/GlobalContext";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateShelfAction } from "../../services/actions/ShelfActions";
import Rating from "./Rating";
import axios from "axios";

export const BookDetails = ({ book }) => {
  const { currentUserID } = useGlobal();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const user = users.filter((u) => u._id === currentUserID)[0];
  console.log("BOOK DETAILS:", user, book);
  const authors = useSelector((state) => state.authors);
  const bookAuthors = authors.map((author) =>
    book.author.map((bookAuthor) => {
      return author._id === bookAuthor ? author.fullName : "";
    })
  );
  console.log(user);
  const readShelfList = user.shelfs["read"];
  const [isRead, setIsRead] = useState(readShelfList.indexOf(book._id) !== -1);
  const [readButtonMsg, setReadButtonMsg] = useState(
    isRead ? "Read!:)" : "Add to read"
  );

  //   const chooseShelf = user.shelf.map((s) => {
  //     <optons></optons>;
  //   });

  const handleReadButton = () => {
    console.log("buttonClicked");
    if (!isRead) {
      axios
        .patch(`http://localhost:4000/api/users/${currentUserID}`, {
          shelfs: {
            ...user.shelfs,
            read: [...user.shelfs["read"], book._id],
          },
        })
        .then((res) => {
          console.log(res);
          console.log("Adding to read:", {
            read: [...user.shelfs["read"], book._id],
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
                read: [...user.shelfs["read"], book._id],
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
      const ReadShelfWithoutBook = user.shelfs["read"].filter(
        (bID) => bID !== book._id
      );
      // currentShelfs;
      axios
        .patch(`/api/users/${currentUserID}`, {
          shelfs: {
            ...user.shelfs,
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
                    <Rating book={book} user={user} />
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
                  <div className="">Language: {book.english}</div>
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
