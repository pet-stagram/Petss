import { createContext } from "react";
import { useState } from "react";

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

export default Context;

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
  return <Context.Provider value={state}>{children}</Context.Provider>;
};
