import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const BookCard = ({ book }) => {
  const bookAuthors = useSelector((state) => {
    return state.authors.map((author) =>
      book.author.map((bookAuthor) => {
        return author._id === bookAuthor ? author.fullName : "";
      })
    );
  });

  return (
    <div key={book._id} className="flex justify-center m-2">
      <Link to={`/book/${book._id}`} className="">
        <div className="flex  flex-row max-w-xl min-w-min rounded-lg bg-white shadow-lg">
          <img
            className=" object-cover w-48 rounded-t-lg rounded-none rounded-l-lg"
            src={
              book.photo_src === ""
                ? "https://ucarecdn.com/020a04b5-181c-42f8-885c-c30ec5367374/istockphoto701079854612x612.jpg"
                : book.photo_src
            }
            alt=""
          />
          <div className="p-6 flex flex-col justify-start w-96 h-72">
            <h5 className="text-gray-900 text-xl font-medium mb-2">
              {book.title}
            </h5>
            <p className="text-gray-700 text-base mb-4">
              {book.description.slice(0, 190)}...
            </p>
            <p className="text-gray-600 text-xs">{bookAuthors}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BookCard;
