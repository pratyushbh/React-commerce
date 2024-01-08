import { createContext,useState } from "react";

//actualValue
export const UserContext=createContext({
    currentUser:null,
    setCurrentUser:()=>null,
});

export const UserProvider=({children})=>{
    const [currentUser,setCurrentUser]=useState(null);
    const [email,setEmail]=useState(null)
    const value={currentUser,setCurrentUser,email,setEmail};
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

