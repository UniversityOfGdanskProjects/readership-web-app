import { useSelector } from "react-redux";
import { useGlobal } from "../../services/context/GlobalContext";
import BookCard from "../book/BookCard";
import { useEffect } from "react";

const Shelf = ({ name }) => {
  const { currentUserID, loading, setLoading } = useGlobal();
  const books = useSelector((state) => state.books);
  const authors = useSelector((state) => state.authors);
  const userShelfs2 = useSelector((state) => state.shelfs);
  console.log("user Shelf2:", userShelfs2);

  useEffect(() => {}, [userShelfs2]);

  // bookTitle: [authors]
  const booksOnShelf = userShelfs2[name].map((bookID) => {
    return books.filter((book) => book._id === bookID)[0];
  });

  return (
    <div className="  m-10 text-center text-3xl font-bold text-emerald-600">
      <h1>"{name}" shelf</h1>
      {booksOnShelf.map((book) => {
        const bookAuthors = authors.map((author) =>
          book.author.map((bookAuthor) => {
            return author._id === bookAuthor ? author.fullName : "";
          })
        );

        return (
          <BookCard key={book._id} book={book} bookAuthors={bookAuthors} />
        );
      })}
    </div>
  );
};

export default Shelf;
