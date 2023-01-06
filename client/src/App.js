import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import MainFeed from "./components/feed/pages/MainFeed";
import AddFeed from "./components/feed/pages/AddFeed";
import Navbar from "./components/feed/layout/Navbar";
import Side from "./components/feed/layout/Side";
import MyFeed from "./components/feed/pages/MyFeed";
import { useEffect, useState } from "react";
import React from "react";
import Register from "./components/register/Register";
import Messanger from "./components/messanger/Messanger";
import Edit from "./components/edit/EditAccount";
import { useUserState, ContextProvider } from "./ContextProvider";
import axios from "axios";

const App = () => {
  useEffect(() => {
    const handleTabClose = event => {
      event.preventDefault();
      console.log('beforeunload event triggered');
      return (event.returnValue = 'Are you sure you want to exit?');
      };
  
      window.addEventListener('beforeunload', handleTabClose);
  
      return () => {
        window.removeEventListener('beforeunload', handleTabClose);
      };
    }, []);





  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main component={<MainFeed />} />} />
        <Route path="/addFeed" element={<Main component={<AddFeed />} />} />
        <Route path="/myFeed" element={<Main component={<MyFeed />} />} />
        <Route path="/edit" element={<Main component={<Edit />} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/message/:conversationId"
          element={<Main component={<Messanger />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
function Main({ component }) {
  //로그인 유무를 localostorage에 저장 false는 login, true는 main
  const isLoginedStorage = sessionStorage.getItem("isLogin");

  const [isLogined, setIsLogined] = useState(isLoginedStorage ?? "false");

  return (
    <ContextProvider>
      {isLogined === "true" ? (
        <Wrapper component={component} setIsLogined={setIsLogined} />
      ) : (
        <Login setIsLogined={setIsLogined} />
      )}
    </ContextProvider>
  );
}

function Wrapper({ component, setIsLogined }) {
  const [userState, setUserState] = useUserState();
  const [isLoading, setIsLoding] = useState(true);
  function getUser() {
    axios("/api/users/me")
      .then((res) => {
        setUserState(res.data);
        setIsLoding(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    isLoading||
    <div className="wrapper">
      <Navbar setIsLogined={setIsLogined} />
      {component}
      <Side />
    </div>
  );
}
export default App;
