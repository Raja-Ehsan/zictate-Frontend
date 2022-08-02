import { React, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import "../css/searchBar.css"
export default function SearchBar(props) {
    const searchTerm = props.searchTerm;
    const navigate = useNavigate();
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const currentUser = JSON.parse(sessionStorage.getItem("User"));
    const [allFriends, setAllFriends] = useState();
    useEffect(() => {
        fetch(`https://zictate.herokuapp.com/getAllUsers`)
            .then(res => res.json())
            .then(data => {
                setAllFriends(data)
            })
    }, [])
    console.log(allFriends)
    var friendsList = []

    if (allFriends && searchTerm) {
        friendsList = allFriends.filter((val) => {
            if (searchTerm === '') {
                console.log(val); return val;
            }
            else if (val.user_name.toLowerCase().includes(searchTerm.toLowerCase())) {
                return val;
            }
        }).map((value) => {
            return (
                <>
                    
                    <li onClick={() => { navigate('/Profile/' + value.id) }} style={value.id===currentUser.id?{display:'none'}:{}}  ><img className="profile-ic" src={PF + '/' + value.profileImage}></img> <span style={{marginTop:'10px'}}>{value.user_name}</span> </li>
                    <hr style={value.id===currentUser.id?{display:'none'}:{}} />
                </>
            )
        }
        )
    }

    return (

        <div className="search-dropDown">
            <ul className="s-menu-item">
                {searchTerm?<>{friendsList}</>:<div style={{fontSize:'15px',textAlign:'center'}}> Search for Friends</div>}
            </ul>
        </div>
    )
}