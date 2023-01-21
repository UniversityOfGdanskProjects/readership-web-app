import { Routes, Route, useSearchParams } from 'react-router-dom'
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

function App() {


  return (
    <>
    <Header />
    <Navbar />
    <Routes>
      <Route path="/" element={ <LoginPage /> }/>
      <Route path="/sign-up" element={ <SignUpPage /> }/>
      <Route path="/my-profile" element={ <MyProfilePage /> }/>
      <Route path="/home" element={ <HomePage /> }/>
      <Route path="/book/:id" element={ <BookPage /> }/>
      <Route path="/user/:id" element={ <UserPage /> }/>
      <Route path="/shelfs/:id" element={ <ShelfsPage /> }/>
      <Route path="*" element={ <NotFoundPage /> }/>
    </Routes>
    <Footer />
    </>
  );
};

export default App;
