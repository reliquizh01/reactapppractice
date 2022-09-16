import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

const UpdateUser = () => {

    const { user_id } = useParams();

    const [user, setUser] = useState({
        first_name:"",
        last_name:"",
        email:""
    });

    useEffect(() =>{
        axios.get(`/users/${user_id}`).then((res)=>{
            setUser(res.data[0]);
        }).catch((err) =>{
            console.log(err)
        });

    },[user_id]);

    const onFormSubmit = (e) =>{
        e.preventDefault();
        const data = {
            user_id: user_id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
        }

        axios.post('users/update', data).then((res) =>{
            console.log(res);
            swal("Success", "Updated Successfully", "success");
        }).catch((err)=>{
            console.log(err);
        })
    }

    const onInputChange = (e) =>{
        e.preventDefault();
        setUser({...user, [e.target.name]: e.target.value});
    };

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <div className='card'>
                        <div className='card-header'>
                            <h4>Update User</h4>
                        </div>
                        <div className='card-body'>
                            <form onSubmit={onFormSubmit}>
                            <div className='input-group mb-3'>
                                <label htmlFor='first_name' className='input-group-text'>
                                    First Name
                                </label>
                                <input 
                                    className={`form-control`}
                                    name='first_name'
                                    id='first_name'
                                    type='text'
                                    value={user.first_name}
                                    onChange={onInputChange}
                                />
                            </div>
                            <div className='input-group mb-3'>    
                                <label htmlFor='last_name' className='input-group-text'>Last Name</label>
                                <input 
                                    className={`form-control`}                                   
                                     name='last_name'
                                    id='last_name'
                                    type='text'
                                    value={user.last_name}
                                    onChange={onInputChange}
                                />                 
                            </div>
                                <div className='input-group mb-3'>
                                    <label htmlFor='email' className='input-group-text'>Email</label>
                                    <input 
                                        className={`form-control`}
                                        name='email'
                                        id='email'
                                        type='email'
                                        value={user.email}
                                        placeholder={user.email}
                                        disabled
                                    />
                                </div>
                                <div className='input-group mb-3 justify-content-center'>
                                    <input
                                        type='Submit'
                                        value='Save'
                                        className='btn btn-warning w-100'
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )
}

export default UpdateUser