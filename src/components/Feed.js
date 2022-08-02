import React from "react"
import "../css/Feed.css"
import Share from "./Share"
import Posts from "./posts"
import Info from "./info"
import { useEffect, useState } from "react"

export default function Feed(props) {
    const [refresh, setRefresh] = useState(false)
    const [allPosts, setAllPosts] = useState();
    const currentUser = JSON.parse(sessionStorage.getItem("User"));
    useEffect(() => {

        if (props.profile) {
            fetch(`https://zictate.herokuapp.com/posts/${props.userid}`).then(res => res.json()).then(res => {
                setAllPosts(res.results)
            })
        }
    }, [props.profile])

    useEffect(() => {
        fetch('https://zictate.herokuapp.com/posts').then(res => res.json()).then(res => {
            setAllPosts(res.results)
        })

    })
    function refreshPage() {
        setRefresh(true)
    }
    const posts = allPosts && currentUser ? allPosts.map(item => {
        return <Posts {...item} you={currentUser.id === item.id ? true : false} />
    }) : null;
    return (
        <div className="feedWrapper">
            <Share refresh={refreshPage} {...currentUser} />
            <div className="information">
                {props.profile ? <Info info={props.info} friends={props.friends} /> : <></>}
            </div>

            {posts}
        </div>
    )
}