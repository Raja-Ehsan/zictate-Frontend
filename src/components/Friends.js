import { React, useState,useEffect } from "react"
import Sidebar from "./Sidebar";
import Rightbar from "./Rightbar";
import { useNavigate } from "react-router-dom"
import Nav from "./Nav";
import refresh from "../auth/auth";
import "../css/friends.css"


export default function Friends() {
    
const navigate = useNavigate();
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const currentUser = JSON.parse(sessionStorage.getItem("User"));
    if(!currentUser) navigate('/401')
    const [allFriends,setAllFriends]=useState();

    // useEffect(() => {
    //     fetch('https://zictate.herokuapp.com/refresh').then(res => {
    //         if (res.status === 401) navigate('/401')
    //         else if (res.status === 403) navigate('/403')
    //     })
    // })

    useEffect(() => {
        currentUser?fetch(`https://zictate.herokuapp.com/${currentUser.id}/conversations`)
            .then(res => res.json())
            .then(data => {
                setAllFriends(data.friends)
            }) : setAllFriends(null)
    }, [currentUser?.id])

    var friendsList = []

    if (allFriends) {
        console.log(allFriends)
        friendsList = allFriends.map((value) => {
               return (<button className="FriendsLis">
               <div className="friend-inf">
                   <img className="profile-ico" src={PF + '/' +value.profileImage } alt="You" />
                   <span className="friend-name">{value.user_name}</span>
               </div>
           </button>)
        })
    }
    return (
        <>
            <Nav />
            <div >
                <div className="friends">
                    <div className="sidebar">
                        <Sidebar />
                    </div>
                    <div className="friendz">
                        <div className="container">
                            <div className="heading"><h2>My Friends</h2></div>
                            <div className="list">
                                {friendsList}
                            </div>
                        </div>
                    </div>
                    <div className="rightbar">
                        <Rightbar profile={false} />
                    </div>
                </div>
            </div>
        </>
    )
}