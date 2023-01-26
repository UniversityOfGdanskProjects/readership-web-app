import { Routes, Route } from 'react-router-dom'
import axios from 'axios';
import { useReducer, useEffect, useLayoutEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { BookPage } from './pages/BookPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { UserPage } from './pages/UserPage';
import { SignUpPage } from './pages/SignUpPage';
import { MyProfilePage } from './pages/MyProfilePage';
import { ShelfsPage } from './pages/ShelfsPage';

import { Navbar } from './layouts/nav.js'
import { Header } from './layouts/header.js'
import { Footer } from './layouts/footer.js'
import { useGlobal } from './services/context/GlobalContext';
import { UserReducer } from './services/reducers/UserReducer';
import { getAllBooksAction } from './services/actions/BookActions';
import { getAllAuthorsAction } from './services/actions/AuthorActions';
import { getAllCommentsAction } from './services/actions/CommentActions';
import { getAllUsersAction } from './services/actions/UserActions';
import { GlobalProvider } from './services/context/GlobalContext';
import { getAllShelfsAction } from './services/actions/ShelfActions';

function App() {
  const dispatch = useDispatch(); // zrobić store'a
  const { setLoading } = useGlobal();

  useLayoutEffect(() => {
    setLoading(true);
    const books = axios.get("/api/books")
    const authors = axios.get("/api/authors")
    const comments = axios.get("/api/comments")
    const users = axios.get("/api/users")
    Promise.all([books, authors, comments, users])
    .then((res) => {
      dispatch(getAllBooksAction(res[0].data));
      dispatch(getAllAuthorsAction(res[1].data));
      dispatch(getAllCommentsAction(res[2].data));
      dispatch(getAllUsersAction(res[3].data));
      setLoading(false);
      return res;
    }).then(res => {
      console.log( "\nRESPONSE: ", res);
      console.log("USERS:", res[3].data)
      const users = res[3].data
      const shelfs = [...users.map(u => {
        const shelf = {user_id: u._id, shelfs: u.shelfs}
        return shelf
      })]
      dispatch(getAllShelfsAction(shelfs));

    })
    .catch(err => console.log(err))
  }, []);


  return (
    <>
      <GlobalProvider>
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={ <LoginPage /> }/>
          <Route path="/sign-up" element={ <SignUpPage /> }/>
          <Route path="/user/my-profile" element={ <MyProfilePage /> }/>
          <Route path="/home" element={ <HomePage /> }/>
          <Route path="/book/:id" element={ <BookPage /> }/>
          <Route path="/user/:id" element={ <UserPage /> }/>
          <Route path="/user/:id/shelfs" element={ <ShelfsPage /> }/>
          <Route path="*" element={ <NotFoundPage /> }/>
        </Routes>
        <Footer />
      </GlobalProvider>
    </>
  );
};

export default App;
