import { useGlobal } from "../../services/context/GlobalContext";
import { useSelector } from "react-redux";
import BookDetailsUserPanel from "./BookDeltailsUserPanel";
import BookDelailsAdminPanel from "./BookDelailsAdminPanel";
import Comments from "./Comment";

export const BookDetails = ({ book, bookAuthors }) => {
  const { currentRole, loading } = useGlobal();
  const bookAuthors2 = useSelector((state) => {
    return state.authors.map((author) =>
      book.author.map((bookAuthor) => {
        return author._id === bookAuthor ? author.fullName : "";
      })
    );
  });
  if (bookAuthors === undefined) {
    bookAuthors = bookAuthors2;
  }

  return (
    <div className="">
      {loading ? (
        "Loading..."
      ) : (
        <div className="">
          <section className="text-gray-700 body-font overflow-hidden bg-white">
            <div className="container px-5 mx-auto pt-10">
              <div className="lg:w-4/5 mx-auto flex flex-wrap">
                <img
                  alt={book.title}
                  className=" max-h-[32rem] object-cover object-center  border border-gray-200"
                  src={
                    book.photo_src === ""
                      ? "https://ucarecdn.com/020a04b5-181c-42f8-885c-c30ec5367374/istockphoto701079854612x612.jpg"
                      : book.photo_src
                  }
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
                      <BookDelailsAdminPanel book={book} />
                    ) : (
                      <BookDetailsUserPanel book={book} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Comments book={book} />
        </div>
      )}
    </div>
  );
};
