import React from "react"
import refresh from "../auth/auth"
import { useNavigate } from "react-router-dom"
export default  function Test(){
  const [currentUser,setCurrentUser]=React.useState(null);
  const navigate = useNavigate();
    async function checkauth() {
        let response = await refresh()
        if(response.statuscode)
        {
          if(response.statuscode===403)
          navigate('#/403')
          else if(response.statuscode===401)
          navigate('#/401')
        }
        else{
          setCurrentUser({
            userId:response.foundUser.id,
            userName:response.foundUser.user_name
          })
        }
      }
    React.useEffect(()=>{
      checkauth()
    },[])
    
    console.log(currentUser)
  
  
    return (
        <div >
            FUCK YOU
         </div>
    )
}
