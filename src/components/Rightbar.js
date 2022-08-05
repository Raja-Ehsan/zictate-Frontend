import "../css/Rightbar.css";
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

export default function Rightbar(props) {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  const User = JSON.parse(sessionStorage.getItem("User"));
  const [users,setUser]=useState()
  const navigate = useNavigate();

  function handleLogout() {
    fetch('https://zictate.herokuapp.com/logout',{
        method: 'POST',
        credentials: 'include' 
      }).then(res=>res.json()).then()
      sessionStorage.removeItem('User');
      navigate('/');
}

  const people=props.friends?.map((val)=>{
    return (
      <a className="lik" > <div className="rightbarFollowing">
            <img
              src={PF+'/'+val.profileImage}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">{val.user_name}</span>
          </div>
          </a>
    )
  })

  const friends =  props.friends?.map((index) => {
    if (index.user_name === User?.user_name) return (<></>)
    else {
      console.log(index.user_name + User?.user_name)
      return (
        <a href={`#/Profile/${index.userId}`}><button className="onlineList" onClick={() => { props.func(index.userId) }}><div className="online-info">
        <img className="online-icon" src={PF+'/'+index.profileImage} alt="" />
        <span className="online-name">{index.user_name} </span>
      </div>
      </button></a>
        
      )
    }
  })
  function nav(id){
    navigate(`/Profile/${id}`)
  }
  useEffect(()=>{
   User?fetch('https://zictate.herokuapp.com/getUsers/'+User.id).then((res)=>res.json())
    .then((res)=>{
      setUser(res)
    }):setUser('')
  },[])

  const user= User? users.map((value)=>{
    return( <div className="infoContainer">
    <a className="lik" href={`#/Profile/${value.id}`}><img className="ProfileImg" src={PF+'/'+value.profileImage } alt="" /></a>
    <a className="lik" href={`#/Profile/${value.id}`}> <span className="userText">
    {value.user_name}
  </span></a>
  
  </div>)
  }):''
  const HomeRightbar = () => {
    return  ( 
      <>
      <div className="cunt">
        <div className="infoContainer">
         <a className="lik" href={`#/Profile/${User?.id}`}><img className="userProfileImg" src={PF+'/'+User?.profileImage } alt="" /></a>
         <a  className="lik" href={`#/Profile/${User?.id}`}><span className="nameText">
            {User?.user_name}
          </span></a> 
          
        </div>
        <p><small onClick={handleLogout}>Switch</small></p>
        </div>
        <hr style={{backgroundColor:'white',border:'.01px solid grey',width:'90%'}} />
        {props.messenger?<><h6 className="rightbarTitle"><small>Online Friends</small></h6> {friends} </>:<> <h6 className="rightbarTitle"><small>Suggestions for You</small></h6>
        {user}</>}
        <ul className="rightbarFriendList">
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle"><strong>User information</strong></h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{props.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{props.province}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{props.relationship}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {people}
        </div>
      </>
    );
  };
  return (
    <div className={props.messenger ? "messengerRightBar" : "rightbar"}>
      <div className="rightbarWrapper">
        {props.profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}