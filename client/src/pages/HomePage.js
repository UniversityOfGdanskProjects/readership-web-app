import { useSelector } from "react-redux";
import BookCard from "../components/book/BookCard";

export const HomePage = () => {
    const books = useSelector((state) => state.books);

    const latest = books.sort((a, b) => 
      b.publicationDate - a.publicationDate
    );
    const latest8 = latest.slice(0, 8);
    const latest8Elem = latest8.map((book) => {
      return <BookCard key={book._id} book={book} />;
    });
  
    return (
      <div className="">
        <h1 className="m-10 text-center text-3xl font-bold text-emerald-600">
          The last published books
        </h1>
        <div className="flex-row">{latest8Elem}</div>
      </div>
    );
};

 
