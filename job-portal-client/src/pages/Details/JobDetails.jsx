import React from 'react';
import { useLoaderData } from 'react-router-dom';

import { FaDollarSign, FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

const JobDetails = () => {
    const data=useLoaderData()
    console.log(data);
    const {
        _id,
        status,
        company_logo,
        requirements,
        company,
        description,
        salaryRange,
        applicationDeadline,
        category,
        jobType,
        location,
        title,
        responsibilities
      } = data;
      return (
        <div className="card card-compact max-w-4xl mx-auto lg:p-14 bg-base-100  shadow-xl">
          <div className="flex mt-4 ml-4 gap-3 items-center">
            <figure>
                
              <img className="w-16" src={company_logo} alt="Shoes" />
            </figure>
            <div>
              <h2 className="text-xl">{company}</h2>
              <p className="flex gap-1 items-center">
                <FaLocationDot />
                {location}
              </p>
            </div>
          </div>
          <div className="card-body mt-6">
            <div className="flex items-center gap-3 mb-5">
              <h2 className="card-title">{title}!</h2>
              <div className="badge badge-secondary">NEW</div>
            </div>
            <p className="text-gray-500">{description}</p>
            <h2 className="text-xl font-bold">Requitements: </h2>
            <div className="flex gap-3 flex-wrap">
              {requirements.map((skill,index) => (
                <p key={index} className="border text-center p-2 rounded-lg  bg-slate-200">
                  {skill}
                </p>
              ))}
            </div>
            <div>
                <p className='text-xl font-bold mt-8'>Responsibilities:</p>
                <ol>
                {
                    responsibilities.map((item,idx)=><li key={idx}>{idx+1} . {item}</li>)
                }
                </ol>
            </div>
    
            <div className="card-actions my-7 gap-4 items-center flex justify-between">
              <div>
                <p className="flex items-center flex-wrap gap-1">
                  Salary:<FaDollarSign></FaDollarSign> {salaryRange.min}-{" "}
                  {salaryRange.max} {salaryRange.currency}
                </p>
              </div>
              <Link to={`/jobApply/${_id}`} className="btn btn-primary">Apply</Link>
            </div>
          </div>
        </div>
      );
};

export default JobDetails;