import React, { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";

export const userDataContext = createContext();

const UserContext = ({ children }) => {

  const [userData,setUserData] = useState(null)
  const {serverUrl} = useContext(authDataContext)

  const getCurrentUser = async ()=> {
    try {
      const res = await axios.get(serverUrl+"/api/user/currentuser",{
        withCredentials:true
      })
      setUserData(res.data)
      console.log(res);
    } catch (error) {
      console.log(error);
      setUserData(null)
    }
  }

  useEffect(()=>{
    getCurrentUser()
  },[])

  const value={
    userData,setUserData
  }


  return (
    <div>
      <userDataContext.Provider value={value}>
        {children}
      </userDataContext.Provider>
    </div>
  );
};

export default UserContext;
