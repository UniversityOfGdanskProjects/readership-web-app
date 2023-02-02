import { Field, Form, Formik, FieldArray } from "formik";
import axios from "axios";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { updateBookAction } from "../services/actions/BookActions";
import { addAuthorAction } from "../services/actions/AuthorActions";
import { validateLink } from "../validations/formikValidation";
import BookCard from "../components/book/BookCard";

import { useParams } from 'react-router-dom';


const UpdateBookPage = () => {
    const { id } = useParams();
    const book = useSelector((state) => {
      const tmp = state.books.filter(b => b._id === id)
      return tmp[0];
    });
    const todayDate = new Date();
    const todayDateStr = todayDate.toISOString().slice(0, 10);
    const [msg, setMsg] = useState("");
    const dispatch = useDispatch();
    const authors = useSelector((state) => state.authors);
    const [bookCard, setBookCard] = useState("");
  
    const handleSubmit = (values) => {
      console.log(values);
      let authorsId = [];
      const authorsToCreate = values.author.filter((a) => {
        const sameAuthorsList = authors.filter((eAuthor) => {
          if (eAuthor.fullName === a.fullName) {
            authorsId.push(eAuthor._id);
            return true;
          } else return false;
        });
        return sameAuthorsList.length === 0;
      });
      let promises = [];
      authorsToCreate.forEach((author) => {
        promises.push(
          axios
            .post("http://localhost:4000/api/authors", author)
            .then((response) => {
              const authorData = { ...response.data };
              dispatch(addAuthorAction(authorData));
              authorsId.push(authorData._id);
              console.log("Added new author", authorData);
            })
            .catch((err) => {
              console.log(err);
            })
        );
      });
      Promise.all(promises)
        .then((resAuthors) => {
          const genresList = values.genres.map(g => g.genre);
          const bookData = { ...values, author: authorsId, genres: genresList };
          
          axios
            .patch(`http://localhost:4000/api/books/${book._id}`, bookData)
            .then((response) => {
              const res = response.data;
              dispatch(updateBookAction(bookData));
              console.log("Posted data: ", res);
              if (res.error) setMsg("Couldn't update  a book!");
              else {
                setMsg("New book updated succesful!");
                setBookCard(<BookCard book={res} />);
              }
              return;
            })
            .then()
            .catch((err) => {
              console.log(err);
              setMsg("Couldn't update the book!");
            });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const authorsInitial = book.author.map(aID=>{
      const bookAuthorInfo = authors.filter(eAuthor => eAuthor._id===aID)[0] //[{fullName: ... _id: ..}, ....]
      return { fullName: bookAuthorInfo.fullName}
    })

    const genresInitial = book.genres.map(g => {return {genre: g}})
  
    return (
      <div>
        <div className="text-center m-3">
          <div className="text-red-700 font-mono">{msg}</div>
          {bookCard}
        </div>
        <Formik
          initialValues={{
            title: book.title,
            author: authorsInitial,
            genres: genresInitial,
            description: book.description,
            publicationDate: book.publicationDate.slice(0,10),
            language: book.language,
            comments: book.comments,
            photo_src: book.photo_src,
            stats: book.stats,
            pages: book.pages,
          }}
          onSubmit={(values, { resetForm }) => {
            handleSubmit(values);
            resetForm();
          }}
          enableReinitialize={true}
        >
          {({ errors, touched, values }) => (
            <Form className="flex flex-col m-5 items-center gap-3">
              <Field name="title" type="text" placeholder="title" required />
              <FieldArray required name="author">
                {({ insert, remove, push }) => (
                  <div className="items-center flex-column">
                    {values.author.length > 0 &&
                      values.author.map((author, index) => (
                        <div className="flex-row items-center gap-1" key={index}>
                          <Field
                            name={`author.${index}.fullName`}
                            placeholder="author full name"
                            type="text"
                            required
                          />
  
                          <button
                            type="button"
                            className=" m-1 items-center secondary text-xs focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg px-3 py-2 mr-2 mb-2"
                            onClick={() => remove(index)}
                          >
                            X
                          </button>
                        </div>
                      ))}
                    <button
                      type="button"
                      className="secondary all-buttons ml-6"
                      onClick={() => push({ fullName: "" })}
                    >
                      Add another author
                    </button>
                  </div>
                )}
              </FieldArray>
              <label>Pages: </label>
              <Field
                name="pages"
                type="number"
                placeholder="1"
                min="1"
                required
              />
              <Field
                name="photo_src"
                type="text"
                placeholder="photo link"
                validate={validateLink}
              />
              {errors.photo_src && touched.photo_src && (
                <div className="text-red-700">{errors.photo_src}</div>
              )}
              <Field
                name="language"
                type="text"
                placeholder="language"
                required
              />
  
              <Field
                name="description"
                as="textarea"
                placeholder="description"
                rows="10"
                className="border w-3/4 text-sm p-2"
                required
              />
              <FieldArray required name="genres">
              {({ insert, remove, push }) => (
                <div className="items-center flex-column">
                  {values.genres.length > 0 &&
                    values.genres.map((genres, index) => (
                      <div className="flex-row items-center gap-1" key={index}>
                        <Field
                          name={`genres.${index}.genre`}
                          placeholder="genre"
                          type="text"
                          required
                        />

                        <button
                          type="button"
                          className=" m-1 items-center secondary text-xs focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg px-3 py-2 mr-2 mb-2"
                          onClick={() => remove(index)}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  <button
                    type="button"
                    className="secondary all-buttons ml-6"
                    onClick={() => push({ genre: "" })}
                  >
                    Add another genre
                  </button>
                </div>
              )}
            </FieldArray>
              <label>Publiction date: </label>
              <Field
                name="publicationDate"
                type="date"
                max={todayDateStr}
                placeholder={book.publicationDate}
                required
              />
              <button type="submit" className="all-buttons">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
}
 
export default UpdateBookPage;