import { useGlobal } from "../../services/context/GlobalContext";
import { useSelector, useDispatch } from "react-redux";
import { updateShelfAction } from "../../services/actions/ShelfActions";
import axios from "axios";
import Swal from "sweetalert2/src/sweetalert2.js";
import { updateUserAction } from "../../services/actions/UserActions";
import { AddComment } from "./AddComment";

const BookDetailsUserPanel = ({ book , setReadCounter, setWantToReadCounter, readCounter, wantToReadCounter}) => {
  const { currentUserID, loading } = useGlobal();
  const dispatch = useDispatch();
  const delButton = ( <svg
    className="h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>)
  const userShelfs = useSelector((state) => {

    return state.shelfs.filter(
      (s) => s.user_id === currentUserID
    )[0]["shelfs"];
    
    
  });

  const addToReadWant = (shelfName) => {
    let to
    let from
    if (shelfName === "read") {
        to = "read"
        from = "want to read"
        setReadCounter(readCounter + 1);
        if (userShelfs["want to read"].indexOf !== -1) {
          setWantToReadCounter(wantToReadCounter -1);
        }

    } else {
        to = "want to read"
        from = "read"
        setWantToReadCounter(wantToReadCounter +1 );
        if (userShelfs["read"].indexOf !== -1) {
          setReadCounter(readCounter - 1);
        }
    }
    axios.patch(`http://localhost:4000/api/users/move-read/${currentUserID}`, {bookID: book._id, toShelf: to , fromShelf: from}).then(res => {
      const updatedShelfs = res.data.shelfs
      console.log("read/want updated:", updatedShelfs);
      dispatch(updateUserAction(res.data));
      dispatch(
        updateShelfAction({
          user_id: currentUserID,
          shelfToUpDate: {"read" : updatedShelfs["read"], "want to read": updatedShelfs["want to read"]}
        })
      );
    })
  }

  const addToShelf = (shelfName) => {
    const tmp = userShelfs[shelfName];
    tmp.push(book._id);
    const dataToUpdate = { [shelfName]: tmp };
    axios
      .patch(`http://localhost:4000/api/users/${currentUserID}`, {
        shelfs: { ...userShelfs, ...dataToUpdate },
      })
      .then((res) => {
        dispatch(updateUserAction(res.data));
        dispatch(
          updateShelfAction({
            user_id: currentUserID,
            shelfToUpDate: dataToUpdate,
          })
        );
        Swal.fire("", `${book.title} added to "${shelfName}"`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteFromShelf = (shelfName) => {
    Swal.fire({
      title: `Remove ${book.title} from ${shelfName} ?`,
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("To delete:", shelfName, userShelfs, userShelfs[shelfName]);
        const dataToUpdate = {
          [shelfName]: userShelfs[shelfName].filter((b) => b !== book._id),
        };
        axios
          .patch(`http://localhost:4000/api/users/${currentUserID}`, {
            shelfs: { ...userShelfs, ...dataToUpdate },
          })
          .then((res) => {
            console.log("Updated account data: ", currentUserID, res.data);
            dispatch(updateUserAction(res.data));
            dispatch(
              updateShelfAction({
                user_id: currentUserID,
                shelfToUpDate: dataToUpdate,
              })
            );
            if (shelfName === "read") setReadCounter(readCounter -1);
            if (shelfName === "want to read") setWantToReadCounter(wantToReadCounter -1);
            Swal.fire("", `${book.title} removed from "${shelfName}"`);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return ( <div>

    {
      loading ? "Loading..." : 
    <div className="flex-column">
      <div className="flex items-center gap-x-5 m-3">
      <div
          className=" dropdown dropdown-top tooltip hover:tooltip-open tooltip-right hover:cursor-pointer"
          data-tip={`Click to add/remove do read/want to read`}
        >
          <label
            tabIndex={0}
            className=" all-buttons "
          >
            Reading status
          </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 hover:cursor-pointer"
            >
              {["read", "want to read"]
                .map((shelfName) => {
                  return (
                    <div key={shelfName}>
                      {userShelfs[shelfName].indexOf(book._id) !== -1 ? (
                        <li>
                          <span
                            className="hover:bg-red-700 bg-red-300 text-white mr-2 mt-0.5 rounded"
                            onClick={() => deleteFromShelf(shelfName)}
                          >
                           {delButton}
                            {shelfName}
                          </span>
                        </li>
                      ) : (
                        <li
                          className="mr-2 mt-0.5 p-2.5 hover:cursor-pointer rounded-lg hover:bg-green-400"
                          onClick={() => {
                            addToReadWant(shelfName);
                          }}
                        >
                          {shelfName}
                        </li>
                      )}
                    </div>
                  );
                })}
            </ul>
          
        </div>
        <div
          className=" dropdown dropdown-top tooltip hover:tooltip-open tooltip-right cursor-pointer"
          data-tip={`Click to add/remove from shelf`}
        >
          <label
            tabIndex={0}
            className=" all-buttons "
            onClick={() => {
              if (Object.keys(userShelfs).length === 2) {
                Swal.fire(
                  'No shelves besides "read" and "Want read!',
                  'Go to "Shelves" and create one! :)'
                );
              }
            }}
          >
            On shelfs
          </label>
          {Object.keys(userShelfs).length === 2 ? (
            <></>
          ) : (
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              {Object.keys(userShelfs)
                .filter((s) => s !== "read" && s!== "want to read")
                .map((shelfName) => {
                  
                  return (
                    <div key={shelfName}>
                      {userShelfs[shelfName].indexOf(book._id) !== -1 ? (
                        <li>
                          <span
                            className="hover:bg-red-700 bg-red-300 text-white mr-2 mt-0.5 rounded"
                            onClick={() => deleteFromShelf(shelfName)}
                          >
                            {delButton}
                            {shelfName}
                          </span>
                        </li>
                      ) : (
                        <li
                          className="mr-2 mt-0.5 p-2.5 hover:cursor-pointer rounded-lg hover:bg-green-400"
                          onClick={() => {
                            addToShelf(shelfName);
                          }}
                        >
                          {shelfName}
                        </li>
                      )}
                    </div>
                  );
                })}
            </ul>
          )}
        </div>
      </div>
      <AddComment book={book} />
    </div>
    }
  </div>
  );
};

export default BookDetailsUserPanel;
