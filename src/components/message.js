import "../css/message.css"
export default function Message(props){
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    return(
        <div className={props.own?"message own":"message"}>
            <div className="messageTop">
                <img className="messageImg" src={PF+'/'+props.profileImage} alt="You"/>
                <p className="messageText">{props.text}
                </p>
            </div>
        </div>
    )
}