import { React, useState } from "react"
import logo from "../images/logo192.png"
import { useNavigate } from "react-router-dom";
import NavDropDown from "./navDropDown";
import SearchBar from "./searchBar";
import { Message, Notifications, AccountCircle, Search, ArrowDropDown,Home } from "@material-ui/icons"
import "../css/nav.css"


export default function Nav() {
    const currentUser = JSON.parse(sessionStorage.getItem("User"));
    const [show, setShow] = useState(false);
    const [searchTerm,setSearchTerm]=useState(false)
    const [showSearch,setShowSearch]=useState(false);
    const navigate = useNavigate(); 
    return (
        <nav >
            <div className="portion">
                <h3 onClick={() => { navigate('/home') }} className="logo-text">Zictate</h3>
            </div>
            <div className="searchBar">
                <input placeholder="Search...."
                className="search"
                type="text" name="search" id="search" onChange={(e)=>{setSearchTerm(e.target.value)}}  onFocus={()=>{setShowSearch(true)}}></input>

            <ArrowDropDown id='search' htmlColor="white" fontSize="medium" onClick={()=>{setShowSearch(!showSearch)}} className="searchIcon" /></div>
                {showSearch ? <SearchBar searchTerm={searchTerm} /> : <></>}
            
            <div className="buttons">
                <Home htmlColor="white" id='home' fontSize="medium" onClick={() => { navigate('/Home') }} className="messengerIcon" />
                <Message htmlColor="white" id='message' fontSize="medium" onClick={() => { navigate('/messenger') }} className="messengerIcon" />
                <Notifications htmlColor="white" id='noti' fontSize="medium" className="notificationIcon" />
                <AccountCircle htmlColor="white" id='acc' fontSize="medium" onClick={() => { navigate(`/Profile/${currentUser.id}`) }} className="profileIcon" />
                <ArrowDropDown htmlColor="white" id='drop'  fontSize="medium" onClick={() => { setShow(!show) }} className="profileIcon" />
                {show ? <NavDropDown /> : <></>}
            </div>
        </nav>
    )
}