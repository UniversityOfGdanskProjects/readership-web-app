import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useGlobal } from "../../services/context/GlobalContext";
import { addCommentAction } from "../../services/actions/CommentActions";
import Swal from "sweetalert2/src/sweetalert2.js";
import { useDispatch } from "react-redux";
export const AddComment = ({ book }) => {
  const { currentUserID } = useGlobal();
  const todayDate = new Date();
  const todayDateStr = todayDate.toISOString().slice(0, 10);
  const dispatch = useDispatch();

  const hanldeSubmit = (values) => {
    axios
      .post("http://localhost:4000/api/comments/", values)
      .then((response) => {
        const commentData = response.data;
        dispatch(addCommentAction(commentData));
        Swal.fire("Comment has been added.");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="mt-10 border-t-2 p-5 w-96">
      <Formik
        initialValues={{
          body: "",
          user: currentUserID,
          book: book._id,
          date: todayDateStr,
        }}
        onSubmit={(values) => hanldeSubmit(values)}
      >
        <Form>
          <Field
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 h-40"
            as="textarea"
            rows="5"
            placeholder="Add comment..."
            name="body"
            required
          />
          <button type="submit" className="all-buttons m-1  ">
            Add comment
          </button>
        </Form>
      </Formik>
    </div>
  );
};
