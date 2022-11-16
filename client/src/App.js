import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/login/Login"
import MainFeed from "./components/feed/pages/MainFeed";
import AddFeed from "./components/feed/pages/AddFeed";
import Navbar from "./components/feed/layout/Navbar";
import Side from "./components/feed/layout/Side";
import MyFeed from "./components/feed/pages/MyFeed";



  function App() {
  return (
    <BrowserRouter>
      <div className='wrapper'>
        <div className='navbar'>
          <Navbar />
        </div>
        <div className='main'>
            <Routes path="/" element={<MainFeed/>}>
              <Route index element={<MainFeed/>}/>
              <Route path="/addFeed" element={<AddFeed/>} />
              <Route path="/myFeed" element={<MyFeed/>} />
            </Routes>
        </div>
        <div className="side">
          <Side/>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
