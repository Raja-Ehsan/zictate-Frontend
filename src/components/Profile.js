import Nav from "./Nav";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Rightbar from "./Rightbar"
import { useState, useRef } from "react";
import refresh from "../auth/auth";
import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "../css/Profile.css"

export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const navigate = useNavigate();
    const currentUser = JSON.parse(sessionStorage.getItem("User"));
    const { id } = useParams();
    const [userData, setUserData] = useState(null);
    const [you, setYou] = useState(false)
    const [added, setAdded] = useState(false);
    const [conversationId, setConversationId] = useState(null)
    const [friends, setFriends] = useState(null)
    const [uploadImage, setUploadImage] = useState(null)
    const [uploadImage1, setUploadImage1] = useState(null)
    const hiddenFileInput = useRef(null);
    const hiddenFileInput1 = useRef(null);
    const style = { marginRight: 60 }




    if (uploadImage) {
        console.log('cover')
        fetch("https://zictate.herokuapp.com/addCoverPhoto", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                img: uploadImage.name,
                id: currentUser?.id
            })  
        }).then(res => res.json()).then(res => { window.location.reload();})
    }
    else if (uploadImage1) {
        console.log('profile')
        fetch("https://zictate.herokuapp.com/addProfilePhoto", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                img: uploadImage1.name,
                id: currentUser?.id
            })
        }).then(res => res.json()).then(res => { window.location.reload();})
    }

    const handleClick = event => {
        hiddenFileInput.current.click();
    };
    const handleClick1 = event => {
        hiddenFileInput1.current.click();
    };
    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        const data = new FormData();
        data.append("file", fileUploaded)
        data.append("name", fileUploaded.name)

        fetch('https://zictate.herokuapp.com/uploadImage', {
            method: 'POST',
            body: data
        })
        setUploadImage(fileUploaded)

    };
    const handleChange1 = event => {
        const fileUploaded = event.target.files[0];
        const data = new FormData();
        data.append("file", fileUploaded)
        data.append("name", fileUploaded.name)

        fetch('https://zictate.herokuapp.com/uploadImage', {
            method: 'POST',
            body: data
        })
        setUploadImage1(fileUploaded)

    };


    // React.useEffect(() => {
    //     fetch('https://zictate.herokuapp.com/refresh').then(res => {
    //         if (res.status === 401) navigate('/401')
    //         else if (res.status === 403) navigate('/403')
    //     })
    // })

    const addFriend = () => {
        if (!added) {
            fetch("https://zictate.herokuapp.com/addConversationId", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ conversationId: conversationId })
            })
            fetch("https://zictate.herokuapp.com/addFriend", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: currentUser.id,
                    friendId: id,
                    conversationID: conversationId
                })
            })

            setAdded(true)
        }
        else {
            fetch("https://zictate.herokuapp.com/removeFriend", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ friendId: id })
            })
            setAdded(false)
        }
    }

    console.log(conversationId)
    React.useEffect(() => {
        fetch(`https://zictate.herokuapp.com/checkFriend`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: currentUser?.id,
                    friendId: id
                })
            })
            .then(res => res.json())
            .then(res => {
                console.log("Hello")
                console.log(res.exists)
                res.exists ? setAdded(true) : setAdded(false)
            })
    }, [])
    React.useEffect(() => {
        fetch(`https://zictate.herokuapp.com/${id}/conversations`)
            .then(res => res.json())
            .then(res => {
                if (!res.message) {
                    const friendz = res.friends.filter(value => value.friendID != id)
                    setFriends(friendz)
                }
            })
    }, [])
    React.useEffect(() => {
        fetch(`https://zictate.herokuapp.com/getConversationId`)
            .then(res => res.json())
            .then(res => {
                console.log("3")
                setConversationId(res + 1)
            })
    }, [])
    React.useEffect(() => {
        fetch(`https://zictate.herokuapp.com/Profilee/${id}`)
            .then(res => res.json())
            .then(res => {
                console.log("4")
                setUserData(res)
            })
    }, [id])

    React.useEffect(() => {
        console.log("leeeee");
        if (id === currentUser?.id) {
            console.log("aaaaa");
            setYou(true)
        }
    }, [currentUser?.id])


    console.log(you)

    if (userData) {
        return (
            <>
                <Nav />
                <div className="profile">
                    <div className="sidebar">
                        <Sidebar />
                    </div>

                    <div className="profileRight">
                        <div className="profileRightTop">
                            <div className="profileCover">
                                <img onClick={handleClick}
                                    className="profileCoverImg"
                                    src={PF + `/${userData.coverImage}`}
                                    alt="" />
                                <img
                                    onClick={handleClick1}
                                    className="profileUserImg"
                                    src={PF + `/${userData.profileImage}`}
                                    alt="" />
                            </div>
                            <input
                                type="file"
                                ref={hiddenFileInput}
                                onChange={handleChange}
                                style={{ display: 'none' }}
                            />
                            <input
                                type="file"
                                ref={hiddenFileInput1}
                                onChange={handleChange1}
                                style={{ display: 'none' }}
                            />
                            {/* <div className="clear"></div> */}
                            <div className="profileInfo">
                                <div className="container">
                                    <h4 className="profileInfoName">{you ? "You" : userData.user_name}</h4>
                                </div>

                            </div>
                            <div className="friend">
                                {you ? <button style={style} className="addFriendButton" type="hidden">{added ? " " : " "}</button> : <button onClick={addFriend} className="addFriendButton">{added ? "Added" : "Add Friend"}</button>} </div>

                        </div>
                        <div className="profileRightBottom">
                            <div className="feed">
                                <Feed profile={true}
                                    userid={userData.id} info={{ city: userData.city, province: userData.province, relationship: userData.relationship }} friends={friends} />
                            </div>
                            <div className="rightbar">
                                <Rightbar city={userData.city} province={userData.province} relationship={userData.relationship} profile={true} friends={friends} />
                            </div>
                        </div>
                    </div>

                </div>
            </>
        );
    }
}