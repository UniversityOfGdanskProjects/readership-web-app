import { useSelector, useDispatch } from "react-redux";
import { deleteCommentAction } from "../../services/actions/CommentActions";
import { useGlobal } from "../../services/context/GlobalContext";
import Swal from "sweetalert2/src/sweetalert2.js";
import axios from "axios";

const Comments = ({ book }) => {
  const { currentUserID, currentRole } = useGlobal();
  const dispatch = useDispatch();
  const comments = useSelector((state) => {
    return state.comments.filter((c) => c.book === book._id);
  });
  const users = useSelector((state) => state.users);

  const deleteComment = (id) => {
    Swal.fire({ title: "Delete comment?", showCancelButton: true }).then(
      (result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://localhost:4000/api/comments/${id}`)
            .then((response) => {
              dispatch(deleteCommentAction(response.data._id));
              Swal.fire("Comment has been deleted");
            })
            .catch((err) => console.log(err));
        }
      }
    );
  };
  return (
    <div>
      <h1 className="text-xl mt-2 mb-8">Comments ( {comments.length} )</h1>
      {comments.map((c) => {
        const user = users.filter((u) => u._id === c.user)[0];
        return (
          <div
            key={c._id}
            className="flex-1 border w-1/2 rounded-lg px-4 py-2 leading-relaxed ml-96"
          >
            <span className="font-semibold m-2">{user.username}</span>
            <span className="text-xs text-gray-400">{c.date.slice(0, 10)}</span>
            <div className="text-base m-2 w-3/4 p-3 rounded">{c.body}</div>
            {user._id === currentUserID || currentRole === "admin" ? (
              <button
                onClick={() => deleteComment(user._id)}
                className="all-buttons text-sm"
              >
                Delete comment
              </button>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
