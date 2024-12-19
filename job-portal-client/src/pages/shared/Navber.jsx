import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContex from "../../contex/AuthContex/AuthContex";
import logo from "../../assets/logo.png";

const Navber = () => {
  const { user, logOutUser } = useContext(AuthContex);

  const handleLogout = () => {
    logOutUser()
      .then(() => {
        console.log("log out successfully");
      })
      .catch((error) => {
        console.log("not log out", error);
      });
  };
  const links = (
    <div className="md:flex  space-x-2">
      <li>
        <NavLink to={'/'}>Home</NavLink>
      </li>
      <li>
        <NavLink to={'/myApplications'}>My Application</NavLink>
      </li>
      <li>
        <NavLink to={'/addjob'}>Add A Job</NavLink>
      </li>
      <li>
        <NavLink to={'/mypostedjobs'}>My Posted Jobs</NavLink>
      </li>
    </div>
  );
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">
          <img className="w-14 flex items-center" src={logo} alt="" />
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <button onClick={handleLogout}>Log Out</button>
        ) : (
          <>
            {" "}
            <Link to={"/register"}>Register</Link>
            <Link to={"/login"} className="btn">
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navber;
