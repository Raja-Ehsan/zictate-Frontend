import React from "react"
import "../css/info.css"
import { useEffect, useState } from "react"

export default function Info(props) {
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const people=props.friends?.map((val)=>{
        return (
          <div className="rightbarFollowing">
                <img
                  src={PF+'/'+val.profileImage}
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{val.user_name}</span>
              </div>
        )
      })
    return (
        <div style={{margin:'15px'}}>
            <h4  className="rightbarTitle"><strong>User information</strong></h4>
            <div className="rightbarInfo">
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">City:</span>
                    <span className="rightbarInfoValue">{props.info.city}</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">From:</span>
                    <span className="rightbarInfoValue">{props.info.province}</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Relationship:</span>
                    <span className="rightbarInfoValue">{props.info.relationship}</span>
                </div>
            </div>
            <h4 className="rightbarTitle">User friends</h4>
            <div className="rightbarFollowings">
            {people}
            </div>
        </div>
    )
}