import React from "react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const AddJob = () => {
const navigate=useNavigate()
    const {user}=useAuth()
    const handleSubmitJob=(e)=>{
        e.preventDefault()
        const formData=new FormData(e.target)
        const initialData=Object.fromEntries(formData);

        const {min,max,currency,...newData}=initialData;
        newData.salaryRange={min,max,currency};
        newData.requirements=newData?.requirements?.split('\n');
        newData.responsibilities=newData?.responsibilities?.split('\n');
        console.log(newData)

        fetch('http://localhost:3000/jobs',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(newData)
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
                navigate('/mypostedjobs')
              }
        })
    }
  return (
    <div className="card bg-base-100 w-full max-w-6xl mx-auto shrink-0 shadow-2xl">
      <form onSubmit={handleSubmitJob} className="card-body">
        {/* title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">title</span>
          </label>
          <input
            name="title"
            type="text"
            placeholder="title"
            className="input input-bordered"
            required
          />
        </div>
        {/* locaion */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <input
            name="location"
            type="text"
            placeholder="location"
            className="input input-bordered"
            required
          />
        </div>
        {/* job type */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Job Type</span>
          </label>
          <select name="jobType" className="select select-bordered w-full ">
            <option disabled selected>
              Select job type
            </option>
            <option>Full Time</option>
            <option>Intern</option>
            <option>Part time</option>
          </select>
        </div>
        {/* job category */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Job category</span>
          </label>
          <select name="category" className="select select-bordered w-full ">
            <option disabled selected>
              Select job Category
            </option>
            <option>Engineering</option>
            <option>Finance</option>
            <option>Marketing</option>
          </select>
        </div>

        {/* salary range */}

        <div className="form-control">
          <label className="label">
            <span className="label-text">Salary Range</span>
          </label>
          <div className="lg:grid lg:grid-cols-3 gap-3">

            {/* min */}

            <input
            name="min"
            type="number"
            placeholder="min"
            className="input input-bordered"
            required
          />
            {/* min */}

            <input
            name="max"
            type="number"
            placeholder="max"
            className="input input-bordered"
            required
          />


          <select name="currency" className="select select-bordered  ">
            <option disabled selected>
              Select Cueerncy
            </option>
            <option>BDT</option>
            <option>USD</option>
            <option>INNER</option>
          </select>

          </div>
          
        </div>
        
        {/* desxription */}

        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea name="description" className="textarea textarea-bordered" placeholder="descripiton"></textarea>
        </div>

        {/* company */}

        <div className="form-control">
          <label className="label">
            <span className="label-text">Company Name</span>
          </label>
          <input
            name="company"
            type="text"
            placeholder="company"
            className="input input-bordered"
            required
          />
        </div>

        {/* requitements */}


        <div className="form-control">
          <label className="label">
            <span className="label-text">Requirements</span>
          </label>
          <textarea name="requirements" className="textarea textarea-bordered" placeholder="write requitement in every new line"></textarea>
        </div>


        {/* responsibilities */}


        <div className="form-control">
          <label className="label">
            <span className="label-text">Responsibilities</span>
          </label>
          <textarea name="responsibilities" className="textarea textarea-bordered" placeholder="write responsibilities in every new line"></textarea>
        </div>


        {/* name */}

        <div className="form-control">
          <label className="label">
            <span className="label-text">HR Name</span>
          </label>
          <input
            name="hr_name"
            type="text"
            placeholder="hr_name"
            className="input input-bordered"
            required
          />
        </div>

        {/* emial */}


        <div className="form-control">
          <label className="label">
            <span className="label-text">HR Email</span>
          </label>
          <input
            name="hr_email"
            type="email"
            defaultValue={user?.email}
            placeholder="hr_email"
            className="input input-bordered"
            required
          />
        </div>
        {/* 
applicationDeadline */}


        <div className="form-control">
          <label className="label">
            <span className="label-text">ApplicationDeadline</span>
          </label>
          <input
            name="applicationDeadline"
            type="date"
            defaultValue={user?.email}
            placeholder="applicationDeadline"
            className="input input-bordered"
            required
          />
        </div>

        {/* company logo */}


        <div className="form-control">
          <label className="label">
            <span className="label-text">Company Logo URL</span>
          </label>
          <input
            name="company_logo"
            type="text"
            placeholder="company logo url"
            className="input input-bordered"
            required
          />
        </div>


        {/* submit button */}

        <div className="form-control mt-6">
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;
