import React, { useContext } from "react";
import AuthContex from "../contex/AuthContex/AuthContex";

const useAuth = () => {
  const contex = useContext(AuthContex);
  return contex;
};

export default useAuth;
