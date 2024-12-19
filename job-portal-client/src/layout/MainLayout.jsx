import React from 'react';
import { Outlet } from 'react-router-dom';
import Navber from '../pages/shared/Navber';
import Footer from '../pages/Footer/Footer';

const MainLayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <Navber></Navber>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;