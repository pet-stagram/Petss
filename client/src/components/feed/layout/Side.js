import React from 'react'
import "../../css/side.css"
import { useEffect } from 'react';
import { axios } from 'axios';


import React from "react";
import "../../css/side.css";
import { useEffect } from "react";
import { axios } from "axios";


const Side = () => {
  return (
    <div className="side">
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
        <button className="testBtn">Message</button>
      </div>
    </div>
  );
};

export default Side;
