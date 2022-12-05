import { createContext, useContext, useState } from "react";

const Context = createContext(null); //초기값 설정

//value값에 useState를 넘겨서 편하게 사용하려고 만든 컴포넌트
function ContextProvider({ children }) {
  const userState = useState();

  //Context 오브젝트에 포함된 React 컴포넌트인 Provider는 context를 구독하는 컴포넌트들에게 context의 변화를 알리는 역할을 한다.
  return <Context.Provider value={userState}>{children}</Context.Provider>;
}

//위의 value={userState}를 사용할 수 있는 함수. 얘를 계속 재사용함->출력하고 수정가능
//children에서 사용할 때!! value에 값이 들어오는 것임.

function useUserState() {
  const value = useContext(Context);
  if (value === undefined) {
    throw new Error("Context value에 값이 없음");
  }
  return value; //호출한 곳(Login 컴포넌트)에 userState와 setUserState를 리턴
}

export { ContextProvider, useUserState };
