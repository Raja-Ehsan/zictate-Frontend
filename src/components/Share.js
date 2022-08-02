import "../css/Share.css"
import { useRef,useState } from "react";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons"
export default function Share(props) {
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const currentUser = JSON.parse(sessionStorage.getItem("User"));
    const hiddenFileInput = useRef(null);
    const des = useRef(null);
    const [uploadImage,setUploadImage]=useState(null)
    const [Description,addDescription]=useState(null)
    const [add,setAdd]=useState(false)
    const addPost = () => {       

        fetch("/addPost", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                description:Description,
                img:uploadImage.name,
                userId:currentUser.id})
        }).then(res=>res.json()).then(res=>{console.log(res)})
        props.refresh()
        des.current.value="";
        setUploadImage(null)
    }
    
    const handleClick = event => {
        hiddenFileInput.current.click();
    };
    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        const data= new FormData();
        data.append("file",fileUploaded)
        data.append("name",fileUploaded.name)

        fetch('/uploadImage',{
            method: 'POST',
            body: data
        })
        setUploadImage(fileUploaded)
        console.log(fileUploaded.name)

    };
    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className="shareProfileImg" src={PF+`/${props.profileImage}`} alt="" />
                    <textarea
                        placeholder="What's in your mind?"
                        className="shareInput"
                        ref={des}
                        onChange={(e)=>{addDescription(e.target.value)}}
                    />
                </div>
                <hr className="shareHr" style={{backgroundColor:'white',border:'.01px solid grey'}}/><div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <PermMedia onClick={handleClick} htmlColor="tomato" className="shareIcon" />
                            <span onClick={handleClick}>Photo/Video</span>
                            <input
                                type="file"
                                ref={hiddenFileInput}
                                onChange={handleChange}
                                style={{ display: 'none' }}
                            />
                        </div>
                        {/* <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon" />
                            <span>Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="green" className="shareIcon" />
                            <span>Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="yellow" className="shareIcon" />
                            <span>Feelings</span>
                        </div> */}
                    </div>
                    <button onClick={addPost} className="shareButton">Share</button>
                </div>
            </div>
        </div>
    )
}