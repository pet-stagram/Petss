import React, { useState } from "react";
import style from "../../css/search.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import image0 from "../../../images/0.jpg";
import image1 from "../../../images/1.jpg";
import image2 from "../../../images/2.jpg";
import image3 from "../../../images/3.jpg";
import image4 from "../../../images/4.jpg";

const Search = () => {
  const [searchWord, setSearchWord] = useState("");

  const onChangeWord = (e) => {
    e.preventDefault();
    setSearchWord(e.target.value);
  };

  const handleAddWord = () => {
    console.log(searchWord);
    const newSearchWord = document.querySelector(".newSearchWord");
    newSearchWord.innerHTML = searchWord;
  };

  return (
    <form>
      <div className={style.search}>
        <h3>알림</h3>
      </div>
      <ul className={style.searchHistory} style={{ marginLeft: "-20px" }}>
        <li>
          <p style={{ width: "50px", height: "50px" }}>
            <img
              src={image0}
              alt="프로필사진"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
              }}
            ></img>
          </p>
          <p style={{ fontSize: "14px", marginTop: "5px", marginLeft: "10px" }}>
            <b>츄츄와예니</b>님이 회원님의 게시물을 좋아합니다.
          </p>
        </li>
        <li>
          <p style={{ width: "50px", height: "50px" }}>
            <img
              src={image1}
              alt="프로필사진"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
              }}
            ></img>
          </p>
          <p style={{ fontSize: "14px", marginTop: "5px", marginLeft: "10px" }}>
            <b>페퍼에유</b>님이 회원님의 게시물에 댓글을 달았습니다.
          </p>
        </li>
        <li>
          <p style={{ width: "50px", height: "50px" }}>
            <img
              src={image2}
              alt="프로필사진"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
              }}
            ></img>
          </p>
          <p style={{ fontSize: "14px", marginTop: "5px", marginLeft: "10px" }}>
            <b>브랜디</b>님이 회원님의 게시물에 댓글을 달았습니다.
          </p>
        </li>
        <li>
          <p style={{ width: "50px", height: "50px" }}>
            <img
              src={image3}
              alt="프로필사진"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
              }}
            ></img>
          </p>
          <p style={{ fontSize: "14px", marginTop: "5px", marginLeft: "10px" }}>
            <b>랑랑이</b>님이 회원님의 게시물을 좋아합니다.
          </p>
        </li>
      </ul>
    </form>
  );
};

export default Search;
