import React from "react"
export default function Display401(){
  
  
    return (
        <div  style={{width:'100vw',height:'100vh',marginTop:'0',backgroundColor:' rgb(24, 23, 23)'}}>
            <h2 style={{textAlign:'center',color:'white'}}>Unauthroized Person</h2>
            <h4 style={{textAlign:'center'}}><a style={{margin:'20px',color:'grey'}} href='/'>Login</a><a style={{margin:'20px',color:'grey'}} href="#/register">Signup</a></h4>
         </div>
    )
}
