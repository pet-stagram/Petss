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
import Register from "./components/register/Register";
import Messanger from "./components/messanger/Messanger";
import Edit from "./components/edit/EditAccount";

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

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isLogined ? <Main component={<MainFeed />} /> : <Login />}
        />
        <Route path="/addFeed" element={<Main component={<AddFeed />} />} />
        <Route path="/myFeed" element={<Main component={<MyFeed />} />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/message/:conversationId"
          element={<Main component={<Messanger />} />}
        />
        {/* <Route path="/*" element={<Main component = {<MainFeed/>} />  } /> */}
      </Routes>
    </BrowserRouter>
  );
}
function Main(props) {
  return (
    <div className="wrapper">
      <Navbar />
      {props.component}
      <Side />
    </div>
  );
}
export default App;
