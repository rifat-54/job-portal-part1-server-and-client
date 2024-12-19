import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const MyPostedJobs = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/jobs?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
      });
  }, [user?.email]);
  console.log(jobs);

 

  return (
    <div>
      <h2 className="text-2xl mt-20 lg:text-3xl font-bold text-center">
        My Posted Jobs {jobs.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Email</th>
              <th>Title</th>
              <th>Application</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={index} className="bg-base-200">
                <th>{index + 1}</th>
                <td>{job?.hr_email}</td>
                <td>{job?.title}</td>
                <td>{job?.applicationCount}</td>
               
                <td>
                  <Link to={`/viewApplication/${job._id}`}>
                  <button className="btn btn-link"> View Application</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPostedJobs;
