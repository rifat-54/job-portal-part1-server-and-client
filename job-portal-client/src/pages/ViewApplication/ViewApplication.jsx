import React from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const ViewApplication = () => {
  const data = useLoaderData();
  console.log(data);

  const handleUpdateChange=(e,id)=>{
    console.log(e.target.value,id);
    const data={
        status:e.target.value
    }
    fetch(`http://localhost:3000/job-application/${id}`,{
        method:'PATCH',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(data)
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        if(data.matchedCount){
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Successfully applied",
                showConfirmButton: false,
                timer: 1500
              });
        }
    })
  }
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              
              <th>Email</th>
              <th>Status</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            
            {
                data.map((job,idx)=><tr key={job?._id}>
                    <th>{idx+1}</th>
                    <td>{job?.application_email}</td>
                    <td>{job?.status}</td>
                    <td>
                  <select defaultValue={job?.status || 'change Status'} onChange={(e)=>handleUpdateChange(e,job._id)} className="select select-bordered select-xs w-full max-w-xs">
                    <option disabled>
                      Select Status
                    </option>
                    <option>Revew</option>
                    <option>Interview</option>
                    <option>Hired</option>
                    <option> Rejected</option>
                  </select>
                </td>
                  </tr>)
            }
            
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplication;
