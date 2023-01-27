import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const LastAdded = () => {
  const books = useSelector((state) => state.books);
  const authors = useSelector((state) => state.authors);
  const latest = books.sort((a, b) => {
    if (a.publicationDay < b.publicationDay) return 1;
    else return -1;
  });
  console.log(latest);
  const latest4 = latest.slice(0, 4);
  console.log(latest4);

  const latest4Elem = latest4.map((book) => (
    <div key={book._id} className="flex justify-center m-2">
      <Link to={`/book/${book._id}`}>
        <div className="flex  flex-row max-w-xl rounded-lg bg-white shadow-lg">
          <img
            className=" h-auto object-cover w-48 rounded-t-lg rounded-none rounded-l-lg"
            src={book.photo_src}
            alt=""
          />
          <div className="p-6 flex flex-col justify-start">
            <h5 className="text-gray-900 text-xl font-medium mb-2">
              {book.title}
            </h5>
            <p className="text-gray-700 text-base mb-4">
              {book.description.slice(0, 190)}...
            </p>
            <p className="text-gray-600 text-xs">
              {authors.map((a) => (a._id == book.author[0] ? a.fullName : ""))}
            </p>
          </div>
        </div>
      </Link>
    </div>
  ));

  return (
    <div className="">
      <h1 className="m-10 text-center text-3xl font-bold text-emerald-600">
        The last published books
      </h1>
      <div className="flex-row">{latest4Elem}</div>
    </div>
  );
};
