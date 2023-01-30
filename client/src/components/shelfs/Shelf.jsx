import { useSelector } from "react-redux";
import { useGlobal } from "../../services/context/GlobalContext";
import BookCard from "../book/BookCard";
import { useEffect } from "react";

const Shelf = ({ name, setCurrentShelf, userShelfs }) => {
  const { currentUserID, loading, setLoading } = useGlobal();
  const books = useSelector((state) => state.books);

  // bookTitle: [authors]
  const booksOnShelf = userShelfs[name].map((bookID) => {
    return books.filter((book) => book._id === bookID)[0];
  });

  return (
    <div className="flex-column  m-10 text-center text-3xl font-bold text-emerald-600">
      <h1>"{name}" shelf</h1>
      {booksOnShelf.map((book) => {
        return <BookCard key={book._id} book={book} />;
      })}
    </div>
  );
};

export default Shelf;
