import { React, useState, useEffect } from "react"
import { MoreVert } from "@material-ui/icons"
import { useNavigate } from "react-router-dom"
import "../css/Posts.css"
import {FavoriteBorderOutlined, FavoriteOutlined} from "@material-ui/icons"

import Comment from "./Comment"
export default function Posts(props) {
    const navigate = useNavigate();
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const currentUser = JSON.parse(sessionStorage.getItem("User"));
    const [showComment, setShowComment] = useState(false)
    const [allComments, setAllComments] = useState([])
    const [newComment, setNewComment] = useState()
    const [like, setLike] = useState()
    const [isLiked, setIsLiked] = useState(null)
    const likeHandle = () => {
        setIsLiked(!isLiked)
    }
    useEffect(() => {
        fetch('https://zictate.herokuapp.com/getlikes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ postId: props.postId })
        }).then(res => res.json())
            .then(res => {
                setLike(res.results)
            })
    }, [props.postId])

    useEffect(() => {
        fetch('https://zictate.herokuapp.com/getcomments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ postId: props.postId })
        }).then(res => res.json())
            .then(res => {
                setAllComments(
                    res.results
                )
            })
    }, [props.postId])
    const handleSubmit = async (e) => {
        e.preventDefault();
        const comment = {
            postId: props.postId,
            userId: currentUser.userId,
            text: newComment,
            profileImage: currentUser.profileImage

        }
        console.log(comment)
        fetch(`https://zictate.herokuapp.com/addComment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(comment)
        }).then((res) => {
            return res.json()
        }).then((res) => {
            console.log(res)
            if (res.message === "posted") {
                if (allComments) {
                    setAllComments((prev) => {
                        return [
                            ...prev,
                            comment
                        ]
                    });
                }
                else {
                    setAllComments([comment]);
                }
            }

        })


    }
    function commentHandler() {
        setShowComment(!showComment)
    }
    const cmmnts = allComments ? allComments.map((item) => {
        return <Comment {...item} />
    }) : null
    if (allComments && like) {
        if(isLiked===null)
        {
            const checkCurrentLike =like? like.find((item)=>item.userId=currentUser.id):null
            checkCurrentLike?setIsLiked(true):setIsLiked(false)
        }
        return (
            <>
                <div className="post">
                    <div className="postWrapper">
                        <div className="postTop">
                            <div className="postTopLeft">
                            <a className="lik" href={`#/Profile/${props.id}`}><img className="postProfileImg"  src={PF+`/${props.profileImage}`} alt="" /></a>
                            <a className="lik" href={`#/Profile/${props.id}`}><span className="postUsername" >{props.you ? "You" : props.user_name}</span></a>
                           
                            </div>
                            <div className="postTopRight">
                                <MoreVert  htmlColor="white"/>
                            </div>
                        </div>
                        <div className="postCenter">
                            <span className="postText">{props.description}</span>
                            <img className="postImg" src={PF+`/${props.img}`} alt="" onDoubleClick={likeHandle} />
                        </div>
                        <div className="postBottom">
                            <div className="postBottomLeft">
                                { !isLiked?<FavoriteBorderOutlined htmlColor="white" fontSize="medium" className="likeIcon" onClick={likeHandle}/>:<FavoriteOutlined htmlColor="red" fontSize="medium" onClick={likeHandle} className="likeIcon"/>}
                                <span className="postLikeCounter" >{isLiked?<>{like.length+1}</>:<>{like.length}</>} {like.length?<>people liked</>:<>liked</>}</span>
                            </div>
                            <div className="postBottomRight">
                                <span className="postCommentText" onClick={commentHandler}>{allComments.length} comments</span>
                            </div>
                        </div>
                    </div>
                </div>

                {showComment ? <>
                    <div className="commentSection">
                        {!allComments.length ? <h1 className="noComment">No Comments</h1> :
                            <>{cmmnts}</>}
                    </div>
                    <div className="commentSectionBottom">
                        <textarea
                            className="commentMessageInput"
                            onChange={(e) => { setNewComment(e.target.value) }}
                            placeholder="write something..."
                        >
                        </textarea>
                        <button onClick={handleSubmit} className="chatSubmitButton">Comment</button>
                    </div></> : <></>
                }
            </>)
    }

}