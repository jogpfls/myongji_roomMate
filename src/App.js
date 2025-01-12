import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import RoomPage from "./pages/RoomPage";
import WritePage from "./pages/WritePage";
import MyPage from "./pages/MyPage";
import DormitoryPage from "./pages/DormitoryPage";
import ChatPage from "./pages/ChatPage";
import ScrollToTop from "./components/ScrollToTop";
import InfoPage from "./pages/InfoPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/main" />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/dormitory/:name" element={<DormitoryPage />} />
          <Route path="/dormitory/:name/room/:id" element={<RoomPage />} />
          <Route path="/dormitory/:name/write" element={<WritePage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
      <ScrollToTop />
    </>
  );
}

export default App;
