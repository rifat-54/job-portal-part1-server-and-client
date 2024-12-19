import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import JobDetails from "../pages/Details/JobDetails";
import PrivateRoutes from "./PrivateRoutes";
import JobApply from "../pages/JobApply/JobApply";
import MyApplications from "../pages/MyApplications/MyApplications";
import AddJob from "../pages/AddJob/AddJob";
import MyPostedJobs from "../pages/MyPostedJobs/MyPostedJobs";
import ViewApplication from "../pages/ViewApplication/ViewApplication";



const router=createBrowserRouter([
    {
        path:'/',
        element:<MainLayout></MainLayout>,
        errorElement:<h2>routers not found</h2>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/register',
                element:<Register></Register>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/jobs/:id',
                element:<PrivateRoutes><JobDetails></JobDetails></PrivateRoutes>,
                loader:({params})=>fetch(`http://localhost:3000/jobs/${params.id}`)
            },
            {
                path:'/jobApply/:id',
                element:<PrivateRoutes><JobApply></JobApply></PrivateRoutes>
            },
            {
                path:'/myApplications',
                element:<PrivateRoutes><MyApplications></MyApplications></PrivateRoutes>
            },
            {
                path:'/viewApplication/:id',
                element:<PrivateRoutes><ViewApplication></ViewApplication></PrivateRoutes>,
                loader:({params})=>fetch(`http://localhost:3000/job-applicaiton/jobs/${params.id}`)
            },
            {
                path:'/addjob',
                element:<PrivateRoutes><AddJob></AddJob></PrivateRoutes>
            },
            {
                path:'/mypostedjobs',
                element:<PrivateRoutes><MyPostedJobs></MyPostedJobs></PrivateRoutes>
            }
        ]
    }
])


export default router;