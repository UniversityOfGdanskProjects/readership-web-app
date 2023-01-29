import { useParams } from 'react-router-dom';
import { BookDetails } from '../components/book/BookDelails';
import { useSelector } from "react-redux";

export const BookPage = () => {
    const { id } = useParams();
    const books = useSelector((state) => state.books);
    const book = books.filter(b => b._id === id)[0];
    const authors = useSelector((state) => state.authors);
    const bookAuthors =
    authors === undefined
      ? null
      : authors.map((author) =>
          book.author.map((bookAuthor) => {
            return author._id === bookAuthor ? author.fullName : "";
          })
        );

    return ( <div>
        <BookDetails book={book} bookAuthors={bookAuthors} />
        
    </div> );
};