import {  Routes, Route } from 'react-router-dom'
import axios from 'axios';
import { useEffect } from 'react';
import {useDispatch, } from 'react-redux';
import { BookPage } from './pages/BookPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { SignUpPage } from './pages/SignUpPage';
import { AccountSettingsPage } from './pages/AccountSettingsPage';
import { ShelfsPage } from './pages/ShelfsPage';

import { Navbar } from './layouts/nav.js'
import { Header } from './layouts/header.js'
import { Footer } from './layouts/footer.js'
import { useGlobal } from './services/context/GlobalContext';
import { getAllBooksAction } from './services/actions/BookActions';
import { getAllAuthorsAction } from './services/actions/AuthorActions';
import { getAllCommentsAction } from './services/actions/CommentActions';
import { getAllUsersAction } from './services/actions/UserActions';
import { getAllShelfsAction } from './services/actions/ShelfActions';
import { SearchBooksPage } from './pages/SearchBooks';
import { AddBookPage } from './pages/AddBookPage';
import {UsersListPage} from './pages/UsersListPage'


function App() {
  const dispatch = useDispatch(); // zrobić store'a
  const { currentRole } = useGlobal();

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
    <div className='min-h-screen'>
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={ <LoginPage /> }/>
          <Route path="/sign-up" element={ <SignUpPage /> }/>
          {currentRole === null ? "" :
          <>
          <Route path="/find-book" element={ <SearchBooksPage /> }/>
          <Route path="/book/:id" element={ <BookPage /> }/>
          {currentRole === "admin" ?
          <>
          <Route path="/add-book" element={ <AddBookPage /> }/>
          <Route path="/users-list" element={ <UsersListPage /> }/>
          </>
          :
          <>
          <Route path="/home" element={ <HomePage /> }/>
          <Route path="/account-settings" element={ <AccountSettingsPage /> }/>
          <Route path="/shelfs" element={ <ShelfsPage /> }/>

          </>
          }
          </>
        }
          <Route path="*" element={ <NotFoundPage /> }/>
        </Routes>
        <Footer />
    </div>
  );
};

export default App;
