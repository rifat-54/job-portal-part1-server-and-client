import Lottie from "lottie-react";
import React, { useContext, useState } from "react";
import lottieData from "../../assets/lottefile/lotte.json";
import AuthContex from "../../contex/AuthContex/AuthContex";

const Register = () => {
    const [error,setError]=useState('')
    const{createUser}=useContext(AuthContex)

    const handleRegister=e=>{
        setError('')
        e.preventDefault()
        const form=e.target;
        const email=form.email.value;
        const password=form.password.value;
        console.log(email ,password);
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if(!passwordRegex.test(password))
    {
        setError('password should one uppercase one number and at least 6 characters');
        return;
    }

    createUser(email,password)
    .then(result=>{
        console.log(result.user);
    })
    .catch(error=>{
        console.log('ERROR',error.meassage);
    })

    }
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:w-96 lg:text-left">
          <Lottie animationData={lottieData}></Lottie>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h1 className="text-5xl mt-8 ml-8 font-bold">Login now!</h1>

          <form onSubmit={handleRegister} className="card-body">
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
              {
                error &&
                <p className="text-red-600">{error}</p>
              }
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

export default Register;
