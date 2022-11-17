import React from 'react'
import "../../css/side.css"


const Side = () => {
  return (
    <>
    <h2>Message</h2>
    <div>
        <div className="messageUserInfo">
            <span className="messageUserImage"></span>
            <span>뭉치</span>
        </div>
        <div className="messageUserInfo">
            <span className="messageUserImage2"></span>
            <span>토리 유딘</span>
        </div>
        <button className='testBtn'>Message</button>
    </div>
    </>
  )
}

export default Side