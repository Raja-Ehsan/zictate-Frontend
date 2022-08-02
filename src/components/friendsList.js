import "../css/friends-list.css"
export default function Friend(props) {
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <>
            <button className="FriendsList" onClick={props.func}>
                <div className={props.online?"online-circle":"offline-circle"}></div>
                <div className="friend-info">
                    <img className="profile-icon" src={PF+'/'+props.profileImage} alt="You" />
                    <span className="friend-name">{props.user_name} </span>
                </div>
            </button>
        </>
    )
}