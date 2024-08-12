import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import RoomPage from "./pages/RoomPage";
import WritePage from "./pages/WritePage";
import MyPage from "./pages/MyPage";
import DormitoryPage from "./pages/DormitoryPage";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/main" />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/room" element={<RoomPage />} />
          <Route path="/write" element={<WritePage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/dormitory" element={<DormitoryPage />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
