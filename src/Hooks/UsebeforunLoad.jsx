import React, { useEffect } from 'react'

export default function UsebeforunLoad(beforeunLoad) {
    useEffect(()=>{
        
        window.addEventListener("beforeunload",beforeunLoad)
        return(()=>{
          window.removeEventListener("beforeunload",beforeunLoad)
        })
      },[])
  return (
    <div>
        
      
    </div>
  )
}
