import axios from "axios";
import React, { useState, useEffect } from 'react'
import '../css/Userlist.css';
import { Link } from "react-router-dom";
import swal from "sweetalert";

const UserList = ({ user }) => {
  const [userlist, setUserList ] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect( () => {
    axios.get('/users/fetch').then((res) => {

        setUserList(res.data);
        setLoading(false);
    });
  }, []);

  const deleteUser = (e, id) =>{
    e.preventDefault();
    const deleteBtn = e.target;
    swal("Are you sure?", 
    {
        dangerMode: true,
        buttons: true,
    }).then((confirm)=>{
        if(!confirm){
            return;
        }
        axios.delete(`/users/${id}`).then((res) =>{
            swal("Deleted", res.data.message, 'success');
            deleteBtn.closest("tr").remove();
        }).catch((err)=>{
            swal("Error", "Unable to delete", "error");
        });
    })
  };

  const ListUsers = userlist.map( (user)=>{
    return(
        <tr className='.table-row' key={user.user_id}>
            <td>{user.user_id}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
            <td>
                <Link className="btn btn-primary" to={`/fetchUsers/${user.user_id}`}>
                    Edit
                </Link>
            </td>
            <td>
                <Link 
                className="btn btn-danger"  
                onClick={(e)=> deleteUser(e, user.user_id)}
                to="/fetchUsers/">
                    Delete
                </Link>
            </td>
        </tr>
    );
  })

  return (
    <div className='container mt-5'>
        <div className={`loader ${loading ? 'loading' : ''}`}>
            <h4>Loading...</h4>
        </div>

        <h4>User List</h4>
        <table className='table'>
            <thead>
                <tr>
                    <th>User_id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>email</th>
                    <th>edit</th>
                    <th>delete</th>
                </tr>
            </thead>
            <tbody>
                { ListUsers }
            </tbody>
        </table>
    </div>
  )

}

export default UserList