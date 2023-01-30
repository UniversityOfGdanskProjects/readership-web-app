import { Field, Form, Formik, FieldArray } from "formik";
import axios from "axios";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addBookAction } from "../../services/actions/BookActions";
import { addAuthorAction } from "../../services/actions/AuthorActions";

const AddBookForm = () => {
  const todayDate = new Date();
  const todayDateStr = todayDate.toISOString().slice(0, 10);
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();
  const authors = useSelector((state) => state.authors);

  const handleSubmit = (values) => {
    console.log(values);
    const authorsToCreate = values.author.filter((a) => {
      const sameAuthorsList = authors.filter((eAuthor) => {
        if (eAuthor.fullName === a.fullName) {
          return true;
        } else return false;
      });
      return sameAuthorsList.length === 0;
    });
    let promises = [];
    let authorsId = [];
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
    console.log();
    Promise.all(promises)
      .then(
        axios
          .post("http://localhost:4000/api/books", values)
          .then((response) => {
            const res = response.data;
            const bookData = { ...response.data, author: authorsId };
            dispatch(addBookAction(bookData));
            console.log("Posted data: ", bookData);
            if (res.error) setMsg("Couldn't add book!");
            else setMsg("New book added succesful!");
            return;
          })
          .then()
          .catch((err) => {
            console.log(err);
            setMsg("Couldn't add book!");
          })
      )
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="text-center m-3">
        <div className="text-red-700 font-mono">{msg}</div>
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
          comments: [],
          photo_src: "",
          rating: {
            counter: 0,
            mean: 0,
          },
          pages: 0,
        }}
        onSubmit={(values) => handleSubmit(values)}
        enableReinitialize={true}
      >
        {({ errors, touched, values }) => (
          <Form className="flex flex-col m-5 items-center gap-3">
            <Field name="title" type="text" placeholder="title" required />
            <FieldArray required name="author">
              {({ insert, remove, push }) => (
                <div>
                  {values.author.length > 0 &&
                    values.author.map((author, index) => (
                      <div className="row" key={index}>
                        <Field
                          name={`author.${index}.fullName`}
                          placeholder="author full name"
                          type="text"
                          required
                        />

                        <button
                          type="button"
                          className="secondary text-xs focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg px-3 py-2 mr-2 mb-2"
                          onClick={() => remove(index)}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  <button
                    type="button"
                    className="secondary all-buttons "
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
              placeholder="10"
              min="5"
              required
            />
            <Field name="photo_src" type="text" placeholder="photo_src" />

            <Field
              name="description"
              as="textarea"
              placeholder="description"
              rows="10"
              className="border w-3/4 text-sm"
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
