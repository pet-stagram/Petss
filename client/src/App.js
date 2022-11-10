import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/login/Login"
import MainFeed from "./components/feed/MainFeed";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* setupProxy */}
        <Route path="/auth/login" element={<Login/>}/>
        <Route path="/posts" element={<MainFeed/>}/>
      </Routes> 
    </BrowserRouter>
  );
}

export default App;
