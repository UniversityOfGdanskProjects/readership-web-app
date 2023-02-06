import { useSelector } from "react-redux";
import BookCard from "../components/book/BookCard";
import { useEffect } from 'react';
import {useDispatch, } from 'react-redux';

import { useGlobal } from '../services/context/GlobalContext';
import { getAllBooksAction } from '../services/actions/BookActions';
import { getAllAuthorsAction } from '../services/actions/AuthorActions';
import { getAllCommentsAction } from '../services/actions/CommentActions';
import { getAllUsersAction } from '../services/actions/UserActions';
import { getAllShelfsAction } from '../services/actions/ShelfActions';
import axios from 'axios';

export const HomePage = () => {
    const books = useSelector((state) => state.books);
  const dispatch = useDispatch();
    const latest = books.sort((a, b) => 
      b.publicationDate - a.publicationDate
    );
    const latest8 = latest.slice(0, 8);
    const latest8Elem = latest8.map((book) => {
      return <BookCard key={book._id} book={book} />;
    });

    
    useEffect(() => {

      const books = axios.get("http://localhost:4000/api/books")
      const authors = axios.get("http://localhost:4000/api/authors")
      const comments = axios.get("http://localhost:4000/api/comments")
      const users = axios.get("http://localhost:4000/api/users")
      Promise.all([books, authors, comments, users])
      .then((res) => {
        dispatch(getAllBooksAction(res[0].data));
        dispatch(getAllAuthorsAction(res[1].data));
        dispatch(getAllCommentsAction(res[2].data));
        dispatch(getAllUsersAction(res[3].data));
  
        return res;
      }).then(res => {
        console.log( "\nRESPONSE: ", res);
        console.log("USERS:", res[3].data)
        const users = res[3].data
        const shelfs = [...users.map(u => {
          const shelf = {user_id: u._id, shelfs: {...u.shelfs}}
          return shelf
        })]
        dispatch(getAllShelfsAction(shelfs));
        console.log(shelfs);
  
      })
      .catch(err => console.log(err))


    }, []);
  
    return (
      <div className="">
        <h1 className="m-10 text-center text-3xl font-bold text-emerald-600">
          The last published books
        </h1>
        <div className="flex-row">{latest8Elem}</div>
      </div>
    );
};

 
