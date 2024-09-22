import React, { useState } from 'react';
import '../bootstrap.min.css';
import Header from '../Components/Header';
import { loginApi, registerApi } from '../services/allApis';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Login() {
  
  const [loginreg, setloginreg] = useState(false); // false = Login, true = Register
  const [user, setUser] = useState({
    username:'', password:'', email:''
  });
  
  const nav =useNavigate()

  const handleReg = async (e) => {
   e.preventDefault();
    const { username, password, email } = user;
    if (!username || !password || !email) {

      toast.warning('Enter valid data!');
    } 
    else {
      const result = await registerApi(user); // Registration API call
      console.log(result);

      if(result.status==200)
      {
        toast.success("Registration successfull!!")
        setUser(
          {username:"", password:"", email:""}
        )
         setloginreg(false)
        
      }
      else
      {
        toast.error("Registration failed")
      }
    }
  };

  const handleLog=async(e)=>{
e.preventDefault();
const { password, email } = user;
  if(!email || !password){
    toast.warning('invalid input')
  }
  else{
    const result = await loginApi(user)
    console.log(result);
      if(result.status == 200)
      {
        toast.success("Login successfull!!")
        setUser(
          { password:"", email:""}
        )
        sessionStorage.setItem("token",result.data.token)
        sessionStorage.setItem("username",result.data.username)
        nav("/")

       
      }
      else{
       
        
        toast.error(result.response.data,)
      }
  }
  }
  

  const click = (e) => {
    e.preventDefault();
    setloginreg(!loginreg);
  };

  return (
    <>
      <Header />
      <div className='container' style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className='w-50 container bg-light p-5 rounded'>
          <h3 className='text-center'>{loginreg ? 'REGISTER' : 'LOGIN'}</h3>

          <form action="">
            {loginreg && (
              <>
                <label htmlFor="name">Username</label> <br />
                <input
                  type="text"
                  id='name'
                  className='form-control'
                  onChange={(e) => setUser({ ...user, username: e.target.value })}  value={user.username}
                /> <br />
              </>
            )}

            <label htmlFor="email">Email</label><br />
            <input
              type="email"
              id='email'
              className='form-control'
              onChange={(e) => setUser({ ...user, email: e.target.value })} value={user.email}
            /><br />

            <label htmlFor="password">Password</label><br />
            <input
              type="password"
              id='password'
              className='form-control'
              onChange={(e) => setUser({ ...user, password: e.target.value })}  value={user.password}
            /><br />

            <div className='d-flex justify-content-between'>
              {loginreg ? (
                <button className="btn btn-info" onClick={handleReg}>Register</button>
              ) : (
                <button className='btn btn-info' onClick={ handleLog} >Login</button>
              )}

              <button onClick={click} className='btn btn-link'>
                {loginreg ? <span>Already a user?</span> : <span>New User?</span>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
