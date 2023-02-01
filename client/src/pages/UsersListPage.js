import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import Swal from "sweetalert2/src/sweetalert2.js";
import {deleteUserAction} from '../services/actions/UserActions'
import {deleteCommentAction} from '../services/actions/CommentActions'



export const UsersListPage = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);
    const comments = useSelector((state) => state.comments);
        
    const deleteUser = (id, username) => {
      Swal.fire({title:`Delete user "${username}" ?`, showCancelButton: true, confirmButtonText: 'Delete'}).then(result => {
        if (result.isConfirmed) {
          let promises = []
              const userComments = comments.filter( c => c.user === id).forEach(c => promises.push(axios.delete(`http://localhost:4000/api/comments/${c._id}`).then(res => {
                dispatch(deleteCommentAction(c))
                console.log(comments);

              }).catch(err => console.log(err))));
              const p1 =  axios.delete(`http://localhost:4000/api/users/${id}` )
              Promise.all([...promises, p1])
              .then(res=>{
                    dispatch(deleteUserAction(id))
                    Swal.fire(`Deleted user ${username}`)
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
          <th>Username</th>
          <th>Name</th>
          <th>E-mail</th>
          <th>Delete:</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => {
            return (        <tr key={index}>
                <th>{index+1}</th>
                <td>{user.username}</td>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td><button
                    className="hover:bg-red-700 bg-red-300 text-white mr-2 mt-0.5 rounded"
                    onClick={() => deleteUser(user._id, user.username)}
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