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

        props.profile?
            fetch(`https://zictate.herokuapp.com/posts/${props.userid}`).then(res => res.json()).then(res => {
                setAllPosts(res.results)
            }):
            fetch('https://zictate.herokuapp.com/posts').then(res => res.json()).then(res => {
            setAllPosts(res.results)
        })

    }, [])

    function refreshPage() {
        setRefresh(true)
    }
    const posts = allPosts && currentUser ? allPosts.map(item => {
        return <Posts {...item} you={currentUser.id === item.id ? true : false} />
    }) : null;
    return (
        <div className="feedWrapper">
            {currentUser?.id===props.userid?<Share refresh={refreshPage} {...currentUser} />:<> {!props.profile?<><Share refresh={refreshPage} {...currentUser} /></>:<></>}</>}
            <div className="information">
                {props.profile ? <Info info={props.info} friends={props.friends} /> : <></>}
            </div>
            {allPosts?.length?<>{posts}</>:<div style={{display:'block',textAlign:'center',fontSize:'20px',margin:'20px',color:'white',backgroundColor:'rgb(35, 34, 34)',borderRadius:'10px',padding:'10px'}}> Nothing to show</div>}
            
        </div>
    )
}