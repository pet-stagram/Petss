import React, { useEffect } from "react";
import "../../css/myFeed.css";

import image from "../../../images/7.jpg";

import axios from "axios";
import { useState } from "react";
import Modal from "react-modal";
import Follower from "./Follower";
import { followerStyle } from "../../css/modalStyles";
import Following from "./Following";

const MyFeed = () => {
  const [data, setData] = useState({});
  const [feedList, setFeedList] = useState([]);
  const [isReceiveData, setIsReceiveData] = useState(false);
  const [isOpenFollower, setIsOpenFollower] = useState(false);
  const [isOpenFollowing, setIsOpenFollowing] = useState(false);
  axios.defaults.withCredentials = true;

  const getMyInfo = async () => {
    const SESSION_ID = 1;

    await axios({
      method: "GET",
      url: `api/users/me`,
      withCredentials: true,
    })
      .then((result) => {
        console.log("MyFeed 조회 성공");
        setData(result.data);
        // feedList -> data 로 옮겨담기~~
        // data = 객체
        // 동기안되나봄.
        setFeedList(result.data.posts);
        console.log(result.data);
        console.log(data);
        console.log(data.info);
      })
      .catch((err) => {
        // err.response.status === '400'
        console.log("MyFeed 조회 실패");
      });
  };

  useEffect(() => {
    getMyInfo();
  }, []);

  return (
    <div className="myFeedWrap">
      <header>
        <div className="myFeedProfileImage"></div>
        <section>
          <div className="myFeedProfile">
            {/* data.info.image 가 프로필사진 */}
            <span className="myFeedNickname">{data.info.nick}x</span>
            <button className="editPropile">프로필 편집</button>
            {/* <span>설정아이콘 -> 설정으로 연결</span> */}
          </div>
          <ul className="myFeedInfo">
            <li>게시물 {data.postsCount} 개</li>
            <li onClick={() => setIsOpenFollower(true)}>
              팔로워 {data.followerCount} 명
            </li>
            <Modal
              isOpen={isOpenFollower}
              onRequestClose={() => setIsOpenFollower(false)}
              ariaHideApp={false}
              style={followerStyle}
            >
              <Follower />
            </Modal>
            <li>팔로잉 {data.followingCount} 명</li>
          </ul>
          <p className="introduction">{data.info.self_intro}</p>
        </section>
      </header>
      <hr></hr>
      <div className="myFeedPostsWrap">
        <h3 className="myFeedPostsTitle">게시물</h3>

        {feedList.length === 0 ? (
          <div style={{ textAlign: "center" }}>게시물이 없어요</div>
        ) : (
          feedList.map((feed) => {
            return (
              <div className="myFeedPosts">
                <span key={feed.id} className="myFeedPost">
                  <img src={feed.PostImages.img_url} alt="thumbnail" />
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MyFeed;
