import { useSelector } from "react-redux";
import BookCard from "../components/book/BookCard";

export const HomePage = () => {
    const authors = useSelector((state) => state.authors);
    const books = useSelector((state) => state.books);

    const latest = books.sort((a, b) => {
      if (a.publicationDay < b.publicationDay) return 1;
      else return -1;
    });
    const latest4 = latest.slice(0, 4);
    const latest4Elem = latest4.map((book) => {
      const bookAuthors = authors.map((author) =>
        book.author.map((bookAuthor) => {
          return author._id === bookAuthor ? author.fullName : "";
        })
      );
  
      return <BookCard key={book._id} book={book} bookAuthors={bookAuthors} />;
    });
  
    return (
      <div className="">
        <h1 className="m-10 text-center text-3xl font-bold text-emerald-600">
          The last published books
        </h1>
        <div className="flex-row">{latest4Elem}</div>
      </div>
    );
};

 
