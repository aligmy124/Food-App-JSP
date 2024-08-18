import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const AuthContext=createContext(null);

export default function AuthContextProvider(props){
    const[loginData,setloginData]=useState(null);
  const saveLoginData=()=>{
    const encodeedToken=localStorage.getItem("token")
    const decodedToken=jwtDecode(encodeedToken)
    setloginData(decodedToken)
  }
  useEffect(()=>{
    if(localStorage.getItem("token")){
      saveLoginData()
    }
  },[])
  return (<AuthContext.Provider value={{loginData,saveLoginData}}>{props.children}</AuthContext.Provider>)

}
