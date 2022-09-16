import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const Login = ({onLogin}) => {
  let Navigate = useNavigate();

  const [user, setUser] = useState(
    {
        email : "",
        password : ""
    }
  );

  const onInputChange = (e) =>{
    setUser({
        ...user, 
        [e.target.name]: e.target.value});
  }

  const onFormSubmit =(e) =>{
    e.preventDefault();
    const loginFormData = {
        email: user.email,
        password: user.password
    }
    axios.post('users/login', loginFormData).then((res)=>{
        console.log("Login Response : " + res);
        swal("Success", "Login Successfully", "success");

        onLogin({
            id: res.data.user_id,
            first_name: res.data.first_name,
            last_name: res.data.last_name,
            is_admin: res.data.is_admin
        })

        Navigate('/');
    }).catch((err)=>{
        console.log("Login Error Response: " + err.response.data);
        swal("Error", err.response.data.message, "error");
    })
  }


  return (
    <div className='container'>
        <div className='row justify-content-center'>
            <div className='col-md-6'>
                <div className='card'>
                    <div className='card-header'>
                        <h4>Login</h4>
                    </div>
                    <div className='card-body'>
                        <form onSubmit={onFormSubmit}>
                            <div className='input-group mb-3'>
                                <label htmlFor='email' className='input-group-text'>Email</label>
                                <input 
                                    className={`form-control`}
                                    name='email'
                                    id='email'
                                    type='email'
                                    onChange={onInputChange}
                                />
                            </div>
                            <div className='input-group mb-3'>
                                <label htmlFor='password' className='input-group-text'>Password</label>
                                <input 
                                    className={`form-control`}
                                    name='password'
                                    id='password'
                                    type='password'
                                    onChange={onInputChange}
                                />
                            </div>
                            <div className='input-group mb-3 justify-content-center'>
                                <input
                                    type='Submit'
                                    value='Login'
                                    className='btn btn-primary w-100'
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

export default Login