import React from "react"
export default function Dashboard(){
  let varr=  JSON.parse(sessionStorage.getItem("User"));
  
    return (
        <div >
            {
            varr.password
            }
         </div>
    )
}
