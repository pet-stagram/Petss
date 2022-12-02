// Context관련은 굳이 App.js에 안 만들어도 됨
import { createContext, useContext, useState } from "react";

const UserContext = createContext(); // context 생성

function UserProvider({ children }) {
  // 실제 사용하는 곳이 아니라 value값에 useState를 넘겨서 편하게 사용하려고 만든 컴포넌트

  /* useState를 사용할 때 [userState,setUserState]로 나누지 않아도 userState가 둘 다 가지고 있는 거임 
        value값에 한번에 넘겨주려고 굳이 안나눈 듯
        userState라는 이름은 다른 걸로 바꿔도 됨
    */
  const userState = useState({}); //그냥 빈 객체 생성??

  return (
    <UserContext.Provider value={userState}>
      {/* 여기 있는 children이 Provider 태그 안에 들어오는 애들인가봐 */}
      {children}
      {/* 그냥 이렇게 해놓으면 됨 */}
    </UserContext.Provider>
  );
}

/* 컨텍스트에서 value값 undefined인 지 아닌 지 확인 후 넘겨주는 커스텀 훅(우리가 만든 hook) */
function useUserState() {
  const value = useContext(UserContext); // Context에서 value값 가져오기 ( 위에 UseProvider에서 value에 useState값을 줬기때문에 useState값이 넘어옴. )
  if (value === undefined) {
    throw new Error("Context value에 값이 없음");
  }
  return value; // 호출한 곳(Login 컴포넌트)에 userState와 setUserState를 리턴
}

// useUserState만 export해주면 다른 곳에서 useState 훅을 사용하듯이 값을 출력하고 수정할 수 있음

//다른 파일에서 사용할 때
//import { useUserState } from "";

function Login() {
  /* 바로위에 내가 만든 커스텀 훅 */
  const [userState, setUserState] = useUserState();
  function onSubmit() {
    axios.post("/api/auth/login").then((result) => {
      setUserState(result);
    });
  }
  return (
    <>
      <button onClick={onSubmit}></button>
    </>
  );
}

function App() {
  return (
    // 실제 사용
    <UserProvider>
      <Main />
      <Login />
    </UserProvider>
  );
}

// 이런식으로 사용해야하나본데??
