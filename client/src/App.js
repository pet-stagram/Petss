import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import MainFeed from "./components/feed/MainFeed";
import Register from "./components/register/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* setupProxy */}
        <Route path="/login" element={<Login />} />
        <Route path="/posts" element={<MainFeed />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
