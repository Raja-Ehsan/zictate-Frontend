import Nav from "./Nav";
import React from "react";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Rightbar from "./Rightbar";
import "../css/Home.css"
import { useNavigate } from "react-router-dom"
import refresh from "../auth/auth"

export default function Home() {
  const currentUser = JSON.parse(sessionStorage.getItem("User"));
  const navigate = useNavigate();
  console.log(currentUser)
  if(currentUser===null) {
    console.log("lulul")
    navigate('/401') 
    console.log("lulul")
  }
  // React.useEffect(() => {
  //   fetch('https://zictate.herokuapp.com/refresh').then(res => {
  //     if (res.status === 401) 
  //     else if(res.status ===403) navigate('/403')
  //   })
  // })
  return (
    <>
      <Nav />
      <div >
        <div className="home">
          <div className="sidebar">
            <Sidebar />
          </div>
          <div className="feed">
            <Feed profile={false}
              userid="" />
          </div>
          <div className="rightbar">
            <Rightbar profile={false} />
          </div>
        </div>
      </div>
    </>
  );
}