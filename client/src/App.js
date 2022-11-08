import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchUser from "./components/SearchUser";
import Register from "./components/Register";

function App() {
  const [a, setA] = useState("hi");
  const callApi = async () => {
    /* src/setupProxy.js 파일에 proxy 설정해놓음. 
    만약에 api주소가 /auth 라면, /api/auth 로 요청하기 */
    axios.get("/api/auth/login").then((res) => {
      setA(res.data.test);
    });
  };
  useEffect(() => {
    callApi();
  }, []);

  return (
<div>
<SearchUser/>
<Register/>
    </div>
  );
}

export default App;
