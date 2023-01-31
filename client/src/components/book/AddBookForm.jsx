import { Field, Form, Formik, FieldArray } from "formik";
import axios from "axios";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addBookAction } from "../../services/actions/BookActions";
import { addAuthorAction } from "../../services/actions/AuthorActions";
import { validateLink } from "../../validations/formikValidation";
import { useNavigate } from "react-router-dom";
import BookCard from "./BookCard";

const AddBookForm = () => {
  const navigate = useNavigate();
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
        const bookData = { ...values, author: authorsId };
        axios
          .post("http://localhost:4000/api/books", bookData)
          .then((response) => {
            const res = response.data;
            dispatch(addBookAction(res));
            console.log("Posted data: ", res);
            if (res.error) setMsg("Couldn't add  a book!");
            else {
              setMsg("New book added succesful!");
              setBookCard(<BookCard book={res} />);
            }
            return;
          })
          .then()
          .catch((err) => {
            console.log(err);
            setMsg("Couldn't add a book!");
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="text-center m-3">
        <div className="text-red-700 font-mono">{msg}</div>
        {bookCard}
      </div>
      <Formik
        initialValues={{
          title: "",
          author: [
            {
              fullName: "",
            },
          ],
          description: "",
          publicationDate: "",
          language: "",
          photo_src: "",
          stats: {
            read: 0,
            wantToRead: 0,
          },
          pages: 0,
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
              placeholder="description"
              className="border w-3/4 text-sm p-2"
              as="textarea"
              rows="10"
              required
            />
            <label>Publiction date: </label>
            <Field
              name="publicationDate"
              type="date"
              max={todayDateStr}
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
};

export default AddBookForm;
