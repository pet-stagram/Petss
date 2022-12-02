import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import MainFeed from "./components/feed/pages/MainFeed";
import AddFeed from "./components/feed/pages/AddFeed";
import Navbar from "./components/feed/layout/Navbar";
import Side from "./components/feed/layout/Side";
import MyFeed from "./components/feed/pages/MyFeed";
import { useState, useContext, createContext } from "react";
import React from "react";
import Register from "./components/register/Register";
import Messanger from "./components/messanger/Messanger";
import Edit from "./components/edit/EditAccount";
import { create } from "yup/lib/Reference";

//Context객체 생성
const Context = createContext({
  loggedUser: {
    regName: "",
    nick: "",
    phone: "",
    email: "",
    image: "",
    self_intro: "",
  },
  loggedIn: false,
  setLoggedUser: () => {},
  setLoggedIn: () => {},
});

export const ContextProvider = ({ children }) => {
  //유저정보
  const setLoggedUser = (data) => {
    setState((prevState) => ({
      ...prevState,
      loggedUser: data, //login한 유저정보  = data
    }));
  };
  //loggedUser : 로그인한 유저의 정보, loggedIn : 로그인 상태(true,false)
  const setLoggedIn = () => {
    setState((prevState) => ({
      ...prevState,
      loggedIn: !prevState.loggedIn,
    }));
  };
  const initialState = {
    loggedUser: {},
    loggedIn: false,
    setLoggedUser,
    setLoggedIn,
  };

  const [state, setState] = useState(initialState);

  //Context 오브젝트에 포함된 React 컴포넌트인 Provider는 context를 구독하는 컴포넌트들에게 context의 변화를 알리는 역할을 한다.
  //하위 컴포넌트에 state 전달.
  return (
    <Context.Provider value={state}>
      {children}
      {/* 여기 children이 Provider 안에 들어감? */}
    </Context.Provider>
  );
};

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
          // element={isLogined ? <Main component={<MainFeed />} /> : <Login />
          element={<Main component={<MainFeed />} />}
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
  //const [userInfo, setUserInfo] = useState({});
  //Context 사용하는 곳에서 useContext를 적어야함.
  const value = useContext(Context);
  return (
    <Context>
      {Object(value.loggedIn) ? (
        <div className="wrapper">
          <Navbar />
          {props.component}
          <Side />
        </div>
      ) : (
        <Login />
      )}
    </Context>
  );
}
export default App;
