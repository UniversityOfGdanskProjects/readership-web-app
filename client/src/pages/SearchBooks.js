import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Field, Form, Formik } from "formik";
import axios from 'axios';
import { useState } from 'react';
import BookCard from '../components/book/BookCard';

export const SearchBooksPage = () => {
    const authors = useSelector((state) => state.authors);
    const [searched, setSearched] = useState([]);
    const handleSearch = (values) => {
        axios.get(`http://localhost:4000/api/books/search/${values.search}`).then(
            res => {
                setSearched(res.data);
            }
        ).catch(err => {
            console.log(err)
        });

    }

    const results = searched.map(book => {
        const bookAuthors = authors.map((author) =>
        book.author.map((bookAuthor) => {
            return author._id === bookAuthor ? author.fullName : "";
        })
        );
        return <BookCard book={book} bookAuthors={bookAuthors}/>
    })

    return ( <div>
    <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <Formik initialValues={ {search : ""} }
        onSubmit={(values) => handleSearch(values)}>
            <Form>
                <Field 
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300"
                type="text"
                placeholder="Search books..."
                name="search"
                required/>
                <button type="submit" className="all-buttons absolute right-2.5 bottom-2  ">
            Search
            </button>
            </Form>
        </Formik>
    </div>

        {results}
        
    </div> );
};