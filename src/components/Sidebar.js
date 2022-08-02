import "../css/Sidebar.css"
import { Notifications, AccountCircle, Settings, Info, Lock, People } from "@material-ui/icons"
import { useNavigate } from "react-router-dom"
export default function Sidebar() {
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
    return (<div className="sideBar">
        <ul className="sidemenu-item">
            <li style={{ cursor: 'pointer' }} onClick={() => { navigate('/Profile/' + currentUser.id) }}><AccountCircle htmlColor="white" className="messengerIconD" /> <span style={{ fontSize: '18px' }}>Profile</span> </li>
            <hr style={{ backgroundColor: 'white', border: '.01px solid grey', width: '90%' }} />
            <li style={{ cursor: 'pointer' }}><Notifications htmlColor="white" variant="Filled" className="messengerIconD" /><span style={{ fontSize: '18px' }}>Notifications</span></li>
            <hr style={{ backgroundColor: 'white', border: '.01px solid grey', width: '90%' }} />
            <li onClick={() => { navigate('/edit') }} style={{ cursor: 'pointer' }}><Settings htmlColor="white" variant="Filled" className="messengerIconD" /><span style={{ fontSize: '18px' }}>Edit Profile</span></li>
            <hr style={{ backgroundColor: 'white', border: '.01px solid grey', width: '90%' }} />
            <li onClick={() => { navigate('/friends') }}     style={{ cursor: 'pointer' }}><People htmlColor="white" className="messengerIconD" /><span style={{ fontSize: '18px' }}>All Friends</span></li>
            <hr style={{ backgroundColor: 'white', border: '.01px solid grey', width: '90%' }} />
            <li onClick={handleLogout} style={{ cursor: 'pointer' }}><Lock htmlColor="white" className="messengerIconD" /><span style={{ fontSize: '18px' }}>Logout</span></li>
            <hr style={{ backgroundColor: 'white', border: '.01px solid grey', width: '90%' }} />

        </ul>
    </div>)
}