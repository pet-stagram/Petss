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
});

//value값에 useState를 넘겨서 편하게 사용하려고 만든 컴포넌트
export const ContextProvider = ({ children }) => {
  //Context객체 생성
  //createContext는 객체 초기화
  const state = useState();

  //Context 오브젝트에 포함된 React 컴포넌트인 Provider는 context를 구독하는 컴포넌트들에게 context의 변화를 알리는 역할을 한다.
  //하위 컴포넌트에 state 전달.
  return (
    <Context.Provider value={state}>
      {children}
      {/* 여기 children이 Provider 안에 들어감? */}
    </Context.Provider>
  );
};

//위의 value={state}를 사용할 수 있는 함수. 얘를 계속 재사용함->출력하고 수정가능
//children에서 사용할 때!! value에 값이 들어오는 것임.
//일단 선언만 해놓는 거,호출이 돼야함,대기중임
function useUserState() {
  const value = useContext(Context);
  if (value === undefined) {
    throw new Error("Context value에 값이 없음");
  }
  return value; //호출한 곳(Login 컴포넌트)에 userState와 setUserState를 리턴
}

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
