import React from "react"
import { AccountCircle, Settings, Info, Lock , People } from "@material-ui/icons"

import "../css/navDropDown.css"
import { useNavigate } from "react-router-dom"


export default function NavDropDown() {
    const currentUser = JSON.parse(sessionStorage.getItem("User"));
    const navigate = useNavigate();
    function handleLogout() {
        fetch('/logout',{
            method: 'POST',
            credentials: 'include' 
          }).then(res=>res.json()).then()
          sessionStorage.removeItem('User');
          navigate('/');
    }
    return (
        <div className="dropDown">
            <ul className="menu-item">
                <li onClick={() => { navigate('/Profile/' + currentUser.id) }}><AccountCircle htmlColor="white" className="messengerIconD" /> <span>Profile</span> </li>
                <hr />
                <li onClick={() => { navigate('/edit') }}><Settings htmlColor="white" variant="Filled" className="messengerIconD" /><span>Edit Profile</span></li>
                <hr />
                <li onClick={() => { navigate('/friends') }}><People htmlColor="white"  className="messengerIconD" /><span>Friends</span></li>
                <hr />
                <li onClick={handleLogout}><Lock htmlColor="white" className="messengerIconD" /><span>Logout</span></li>
                <hr />
            </ul>
        </div>
    )
}