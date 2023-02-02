import { useGlobal } from "../../services/context/GlobalContext";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { deleteBookAction } from "../../services/actions/BookActions";
import Swal from "sweetalert2/src/sweetalert2.js";

const BookDelailsAdminPanel = ({ book }) => {
  const { setLoading } = useGlobal();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDelete = () => {
    Swal.fire({
      title: `Delete book ${book.title}?`,
      showCancelButton: true,
      cancelButtonColor: "#d33",
    }).then((res) => {
      if (res.isConfirmed) {
        setLoading(true);
        axios
          .delete(`http://localhost:4000/api/books/${book._id}`)
          .then((res) => {
            dispatch(deleteBookAction(res.data._id));
            Swal.fire("Book has been deleted");
            navigate("/find-book");
          });
        setLoading(false);
      }
    });
  };

  const handleUpdate = () => {
    console.log("Admin want to update a book ", book._id);
  };
  return (
    <div className="flex-column">
      <div className="flex-row">
        <button className="m-2 all-buttons" onClick={handleDelete}>
          Delete book
        </button>
        <button className="m-2 all-buttons" onClick={handleUpdate}>
          Update book
        </button>
      </div>
    </div>
  );
};

export default BookDelailsAdminPanel;
