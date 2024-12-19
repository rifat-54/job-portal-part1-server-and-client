import React from 'react';
import { motion } from "framer-motion";
import { easeOut } from 'motion';
import logo1 from '../../assets/team/group-people-working-out-business-plan-office.jpg'
import logo2 from '../../assets/team/medium-shot-smiley-people-work.jpg'

const Banner = () => {
    return (
        <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className='flex-1'>
    <motion.img
    animate={{y:[50,100,50]}}
    transition={{duration:10,delay:1,repeat:Infinity}}
      src={logo1}
      className="max-w-sm border-l-8 border-blue-600 border-b-8 w-64 rounded-t-[40px] rounded-br-[40px] shadow-2xl" />
    <motion.img
    animate={{x:[100,150,100]}}
    transition={{duration:10,delay:1,repeat:Infinity}}
      src={logo2}
      className="max-w-sm  border-l-8 border-blue-600 border-b-8 w-64 rounded-t-[40px] rounded-br-[40px]  shadow-2xl" />
    </div>
    <div className='flex-1'>
      <motion.h1
      animate={{x:50}}
      transition={{delay:1,duration:2,repeat:Infinity ,ease:easeOut}}
      className="text-5xl font-bold">Latest <motion.span
      transition={{duration:2,delay:1,easeOut,repeat:Infinity}}
      animate={{color:['#f9ff33', '#9fff33','#33ffe6']}}
      >job</motion.span> for you!</motion.h1>
      <p className="py-6">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
      <button className="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>
    );
};

export default Banner;