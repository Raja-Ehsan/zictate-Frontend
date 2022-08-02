import { React, useState, useEffect } from "react"
import "../css/Comment.css"
export default function Comment(props) {
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const [showReply, setShowReply] = useState(false)
    function replyHandler() {
        setShowReply(!showReply)
    }
    return (
        <>
            <div className="commentWrapper">
                <div className="commentProfile">
                    <img className="profilePicture" src={PF+`/${props.profileImage}`} alt="" />
                </div>
                <div className="commentText">
                    {props.text}
                    <span className="commentActions"><pre className="actionContainer"><small>Like</small>   <small onClick={replyHandler}>Reply</small></pre></span>
                </div>
            </div>
            {showReply ? <div className="replySectionBottom">
                <textarea
                    className="replyMessageInput"
                    // onChange={(e) => { setNewMessage(e.target.value) }}
                    placeholder="write something..."
                >
                </textarea>
                <button className="replySubmitButton">Reply</button>
            </div> : <></>}


        </>
    )
}