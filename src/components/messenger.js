import React, { useRef, useState } from "react"
import "../css/messenger.css"
import Message from "./message"
import Friend from "./friendsList"
import Nav from "./Nav"
import refresh from "../auth/auth"
import { useNavigate } from "react-router-dom"
import Rightbar from "./Rightbar"
import { io } from "socket.io-client"
export default function Messenger() {
    const User = JSON.parse(sessionStorage.getItem("User"));
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = React.useState(null);
    const [prevmessages, setprevmessages] = React.useState();
    const [currentFriend, setCurrentFriend] = React.useState(null);
    const [allFriends, setAllFriends] = React.useState();
    const [newMessage, setNewMessage] = React.useState("")
    const socket = useRef()
    const [onlineFriends, setOnlineFriends] = React.useState(null)
    const [arrivalMessage, setArrivalMessage] = useState("")
    const [searchTerm, setSearchTerm] = useState("");
    const scrollRef = useRef();

    React.useEffect(() => {
        fetch('/refresh').then(res => {
            if (res.status === 401) navigate('/401')
            else if (res.status === 403) navigate('/403')
        })
    })
    React.useEffect(() => {
        socket.current = io("ws://localhost:8000")
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text
            })
        })
    }, [])

    console.log("1111")
    console.log(prevmessages)

    React.useEffect(() => {
        arrivalMessage && currentFriend.id === arrivalMessage.sender && !prevmessages.empty &&
            setprevmessages((prev1) => {
                return [
                    ...prev1,
                    {
                        conversationID: currentFriend.conversationID,
                        senderID: arrivalMessage.sender,
                        text: arrivalMessage.text,
                        profileImage: currentFriend.profileImage
                    }

                ]
            })
        if (arrivalMessage && currentFriend.id === arrivalMessage.sender && prevmessages.empty) {
            console.log("lul")
            setprevmessages([{
                conversationID: currentFriend.conversationID,
                senderID: arrivalMessage.sender,
                text: arrivalMessage.text,
                profileImage: currentFriend.profileImage
            }
            ])
        }
    }, [arrivalMessage, currentFriend])

    React.useEffect(() => {
        socket.current?.emit("addUser", User.id, User.user_name, User.profileImage);
        socket.current?.on("getUsers", (users) => {
            console.log(users)
            setOnlineFriends(users)
        })
    }, [socket, User?.id])

    React.useEffect(() => {
        socket.current?.on("welcome", message => {
            console.log(message)
        })
    }, [socket])

    React.useEffect(() => {
        setCurrentUser({
            userId: User.id,
            userName: User.user_name
        })
    }, [User?.id, User?.user_name])

    React.useEffect(() => {
        currentFriend ? fetch(`/conversations/${currentFriend.conversationID}`).then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.mesage)
                    setprevmessages({ empty: true })
                else
                    setprevmessages(data.results);
            }) : setCurrentFriend(null)

    }, [currentFriend])

    React.useEffect(() => {
        currentUser ? fetch(`/${currentUser.userId}/conversations`)
            .then(res => res.json())
            .then(data => {
                if (!data.message) {
                    const friendz = data.friends.filter(value => value.friendID != User.id)
                    setAllFriends(friendz)
                }
            }) : setAllFriends(null)
    }, [currentUser])

    function setFriend(id) {
        setCurrentFriend(id)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        socket.current.emit("sendMessage", {
            senderId: User.id,
            receiverId: currentFriend.id,
            text: newMessage
        })
        const message = {
            conversationID: currentFriend.conversationID,
            senderID: currentUser.userId,
            text: newMessage
        }
        fetch(`/${currentUser.userId}/conversation/send`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(message)
        }).then((res) => {
            return res.json()
        }).then((res) => {
            console.log(res.message)
            if (res.message === "sent") {
                if (!prevmessages.empty) {
                    setprevmessages((prev) => {
                        return [
                            ...prev,
                            { ...message, profileImage: User.profileImage }
                        ]
                    });
                }
                else {
                    setprevmessages([{...message, profileImage: User.profileImage}]);
                }

            }
        })


    }

    React.useEffect(() => {
        scrollRef.current?.scrollIntoView()
    }, [prevmessages])

    var friendsList = []

    if (allFriends) {
        console.log(allFriends)
        friendsList = allFriends.filter((val) => {
            if (searchTerm === '') {
                console.log(val); return val;
            }
            else if (val.user_name.toLowerCase().includes(searchTerm.toLowerCase())) {
                return val;
            }
        }).map((value) => {
            const online = onlineFriends?.some(valuee => valuee.userId === value.id);
            console.log(online)
            return <Friend online={online} func={() => { setFriend({ conversationID: value.conversationID, id: value.id, profileImage: value.profileImage }) }} {...value} />
        }
        )
    }

    var messages = []

    if (prevmessages) {
        if (!prevmessages.empty)
            messages = prevmessages.map((value) => {
                if (value.senderID === currentUser.userId) {
                    return (
                        <Message own={true} {...value} />
                    )
                }
                return (
                    <Message {...value} />
                )

            })
    }



    return (
        <>
            <Nav />
            <div className="messenger">
                <div className="chatMenu">
                    <h2 className="title-name">Friends</h2>
                    <div className="chatMenuWrapper">
                        <input type="text"
                            placeholder="Search..."
                            className="search-bar"
                            onChange={(e) => {
                                setSearchTerm(e.target.value)
                            }} />
                        {friendsList}
                    </div>
                </div>
                <div className="chatBox">
                    <h2 className="title-name">Chat</h2>
                    <div className="chatBoxWrapper">
                        {prevmessages ?
                            <><div className="chatBoxTop">
                                {prevmessages.empty ? <div className="start-conversation">Start a new conversation</div> : ""}
                                {messages}
                                <div ref={scrollRef} />
                            </div>
                                <div className="chatBoxBottom">
                                    <textarea
                                        className="chatMessageInput"
                                        onChange={(e) => { setNewMessage(e.target.value) }}
                                        placeholder="write something..."
                                    >
                                    </textarea>
                                    <button onClick={handleSubmit} className="chatSubmitButton">Send</button>
                                </div>
                            </> : <div className="clickk">CLick to see messages</div>}
                    </div>
                </div>
                <div className="chatOnline">
                    <Rightbar profile={false} messenger={true} friends={onlineFriends} />
                </div>
            </div>
        </>

    )
}