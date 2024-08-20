import {createContext, useEffect, useState } from "react";
export const Window=createContext("");
export default function WindowContext({children}){
    const [windowSize,setwindowSize]=useState(window.innerWidth)

    useEffect(()=>{
        function eventN(){
            setwindowSize(window.innerWidth)
        }
        window.addEventListener("resize",eventN)
        // cleanup function
        return()=>{
        window.removeEventListener("resize",eventN)
        }
    },[])
    // يتم استخدام ال يوس افيكت لعمل ريندر عند تغيير حجم الصفحة
    return(
        <Window.Provider value={{windowSize,setwindowSize}}>{children}</Window.Provider>
    )
}