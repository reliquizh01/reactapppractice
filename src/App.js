
import './App.css';
import Register from './pages/Register';
import Navbar from './pages/Navbar';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './pages/Login';
import axios from 'axios';
import UserList from './pages/UserList';
import UpdateUser from './pages/UpdateUser';
import { useState } from 'react';
import AdminRoute from './pages/AdminRoute';

axios.defaults.baseURL = 'https://serverexpresspractice.herokuapp.com/';

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  console.log(loggedInUser);
  return (
    <div className="App">
      <BrowserRouter>
          <Navbar user={loggedInUser} onLogout={setLoggedInUser}/>
          <Routes>
            <Route path='/Login' element={<Login onLogin={setLoggedInUser} />}></Route>

            <Route path='/fetchUsers'>
              <Route 
                index 
                element={
                  <AdminRoute user={loggedInUser}>
                      <UserList/>
                  </AdminRoute>
                }>

                </Route>
              <Route 
                path=':user_id' 
                element={
                  <AdminRoute user={loggedInUser}>
                    <UpdateUser />
                  </AdminRoute>
                }>

              </Route>
            </Route>
            
            <Route path='/register' element={<Register />}></Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
