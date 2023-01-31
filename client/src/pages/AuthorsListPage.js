import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import Swal from "sweetalert2/src/sweetalert2.js";
import {deleteAuthorAction} from '../services/actions/UserActions'



export const AuthorsListPage = () => {
    const dispatch = useDispatch();
    const authors = useSelector((state) => state.authors);

        
    const deleteAuthor = (id, fullName) => {
        const booksOfAuthor = useSelector((state) => {
            state.books.filter(b => {
               const tmp = b.author.filter(a => a._id===id);
               return tmp.length !== 0;
            })
        });
        Swal.fire({title:`Delete author "${fullName}" and books: ${booksOfAuthor.join(", ")} ?`, showCancelButton: true, confirmButtonText: 'Delete'}).then(result => {
            if (result.isConfirmed) {
                // tu dokończyć promise.all axios.delete(`http://localhost:4000/api/books/${book._id}` ).
                
                axios.delete(`http://localhost:4000/api/authors/${id}` ).then(res=>{
                    dispatch(deleteAuthorAction(id))
                    Swal.fire(`Deleted author ${username}`)
                }).catch(err => {
                    console.log(err);
                })
            }
        })
    }

    return ( <div className="overflow-x-auto">
    <table className="table w-full">
      {/* <!-- head --> */}
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Delete:</th>
        </tr>
      </thead>
      <tbody>
        {authors.map((author, index) => {
            return (        <tr key={index}>
                <th>{index+1}</th>
                <td>{author.fullName}</td>
                <td><button
                    className="hover:bg-red-700 bg-red-300 text-white mr-2 mt-0.5 rounded"
                    onClick={() => deleteAuthor(author._id, author.fullName)}
                  >
                    <svg
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
                    </svg>
                  </button></td>
              </tr>)
        })}
      </tbody>
    </table>
  </div> );
};