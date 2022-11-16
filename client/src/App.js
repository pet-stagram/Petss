import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import MainFeed from "./components/feed/pages/MainFeed";
import AddFeed from "./components/feed/pages/AddFeed";
import Navbar from "./components/feed/layout/Navbar";
import Side from "./components/feed/layout/Side";
import MyFeed from "./components/feed/pages/MyFeed";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";

function App() {
  const [isLogined, setIsLogined] = useState(false);

  //저장된 값 확인하는 용
  // useEffect(() => {
  //   // url은 저장된 유저값이 있는지 체크하는 url
  //   axios
  //     .get("/")
  //     .then((data) => {
  //       data.result ? setIsLogined(true) : setIsLogined(false);
  //     })
  //     .catch((err) => {});
  // }, []);

  console.log(isLogined);
  return (
    <BrowserRouter>
      <div className="wrapper">
        {/* <div className="navbar">
          <Navbar />
        </div>
        <div className="main"> */}
        <Routes>
          <Route
            path="/"
            element={isLogined ? <Main component={<MainFeed />} /> : <Login />}
          />
          <Route path="/addFeed" element={<Main component={<AddFeed />} />} />
          <Route path="/myFeed" element={<Main component={<MyFeed />} />} />
        </Routes>
        {/* <Routes
            path="/"
            element={isLogined === true ? <MainFeed /> : <Login />}
          >
            <Route index element={<MainFeed />} />
            <Route path="/addFeed" element={<AddFeed />} />
            <Route path="/myFeed" element={<MyFeed />} />
          </Routes> */}
      </div>
    </BrowserRouter>
  );
}
function Main(props) {
  return (
    <>
      <div className="navbar">
        <Navbar />
      </div>
      {props.component}

      <div className="side">
        <Side />
      </div>
    </>
  );
}
export default App;
