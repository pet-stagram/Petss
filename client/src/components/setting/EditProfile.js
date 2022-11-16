import React from "react";

function EditProfile() {
  return (
    <div>
      <body>
        <div className="setContainer">
          <div className="setNav">
            <ul>
              <li>프로필 편집</li>
              <li>비밀번호 변경</li>
            </ul>
          </div>
          <div className="editProWrap">
            <div className="rowPhoto">
              <img></img>
            </div>
            <div className="rowName"></div>
            <div className="rowNick"></div>
            <div className="rowIntro"></div>
            <div className="rowEmail"></div>
            <div className="rowPhone"></div>
            <div className="rowBtn"></div>
          </div>
        </div>
      </body>
    </div>
  );
}

export default EditProfile;
