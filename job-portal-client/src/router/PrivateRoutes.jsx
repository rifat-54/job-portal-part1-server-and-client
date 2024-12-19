import React, { useContext } from 'react';
import AuthContex from '../contex/AuthContex/AuthContex';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoutes = ({children}) => {
    const{user,loader}=useContext(AuthContex)
    const location=useLocation()
    // console.log(location);
    if(loader){
        return <p className='text-center my-32'><span className="loading loading-ring loading-lg"></span></p>
    }
    if(user){
        return children;
    }
    return <Navigate state={location.pathname} to={'/login'}></Navigate>
};

export default PrivateRoutes;