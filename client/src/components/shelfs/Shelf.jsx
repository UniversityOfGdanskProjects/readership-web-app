import { useSelector } from "react-redux";
import { useGlobal } from "../../services/context/GlobalContext";
import BookCard from "../book/BookCard";

const Shelf = ({ name }) => {
  const { currentUserID } = useGlobal();
  const allShelfs = useSelector((state) => state.shelfs);
  const userShelfs = allShelfs.filter((sh) => sh.user_id === currentUserID)[0][
    "shelfs"
  ];
  const books = useSelector((state) => state.books);
  const authors = useSelector((state) => state.authors);

  // bookTitle: [authors]
  const booksOnShelf = userShelfs[name].map((bookID) => {
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
