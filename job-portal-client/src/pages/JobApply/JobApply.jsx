import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContex from "../../contex/AuthContex/AuthContex";
import Swal from "sweetalert2";


const JobApply = () => {
    const {id}=useParams()
    const navigate=useNavigate()
    // console.log(id);
    const {user}=useContext(AuthContex)
    console.log(user);


    const submitJobApplication=e=>{
        
        e.preventDefault()
        const form=e.target;
        const linkedin=form.linkedin.value;
        const github=form.github.value;
        const resume=form.resume.value;
        console.log(linkedin,github,resume);
        const applicaionInfo={
            job_id:id,
            application_email:user?.email,
            linkedin,
            github,
            resume

        }
        // console.log(applicaionInfo);

        fetch('http://localhost:3000/job-application',{
          method:'POST',
          headers:{
            'content-type':'application/json'
          },
          body:JSON.stringify(applicaionInfo)
        })
        .then(res=>res.json())
        .then(data=>{
          console.log(data);
          if(data.insertedId){
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Successfully applied",
              showConfirmButton: false,
              timer: 1500
            });
            navigate('/myApplications')
          }
        })
    }
  return (
    
        <div className="card bg-base-100 w-full  lg:max-w-5xl mx-auto shadow-2xl">
        <h1 className="text-5xl text-center font-bold">Apply now!</h1>

          <form onSubmit={submitJobApplication} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">LinkedIn</span>
              </label>
              <input
              name="linkedin"
                type="url"
                placeholder="LinkedIn"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">GitHub URL</span>
              </label>
              <input
              name="github"
                type="url"
                placeholder="github url"
                className="input input-bordered"
                required
              />
              
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Resume</span>
              </label>
              <input
              name="resume"
                type="url"
                placeholder="resume url"
                className="input input-bordered"
                required
              />
              
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Apply</button>
            </div>
          </form>
        </div>
    
  );
};

export default JobApply;
