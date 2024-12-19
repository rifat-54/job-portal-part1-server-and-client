import Lottie from 'lottie-react';
import React, { useContext } from 'react';
import loginlottlejson from '../../assets/lottefile/loginlottile.json'
import AuthContex from '../../contex/AuthContex/AuthContex';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const{loginUser}=useContext(AuthContex)
    const location=useLocation()
    const navigate=useNavigate()
    // console.log(location);
    const from=location?.state || '/';

    const handleLogin=e=>{
       
        e.preventDefault()
        const form=e.target;
        const email=form.email.value;
        const password=form.password.value;
        console.log(email ,password);
        loginUser(email,password)
        .then(result=>{
            console.log(result.user);
            const user={email:email};

            axios.post('http://localhost:3000/jwt',user,{withCredentials:true})
            .then(res=>console.log(res.data))

            // navigate(from)
        })
        .catch(error=>{
            console.log('ERROR',error?.message)
        })
    

    

    }
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:w-96 lg:text-left">
          <Lottie animationData={loginlottlejson}></Lottie>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h1 className="text-5xl mt-8 ml-8 font-bold">Login now!</h1>

          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
              name="email"
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
              name="password"
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;