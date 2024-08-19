import { Axios } from "./Axios";
import Cookies from "js-cookie";

export const login = async (
  id,
  passwrd,
  setModalOpen,
  setModalMessage
) => {
  try {
    const response = await Axios.post(`/auth/login`, { id, passwrd });
    Cookies.set("accessToken", response.data.accessToken);

    return response;
  } catch (error) {
    console.error("로그인 중 에러 발생:", error);
    setModalMessage("로그인 중 에러가 발생했습니다.");
    setModalOpen(true);
    throw error;
  }
};

export const logout = async (navigate, setModalOpen, setModalMessage) => {
  try {
    const response = await Axios.get(`/auth/logout`);
    Cookies.remove("accessToken");
    setModalMessage("로그아웃 성공");
    setModalOpen(true);
    return response;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      Cookies.remove("accessToken");
      setModalMessage("세션이 만료되었습니다. 다시 로그인해주세요.");
      setModalOpen(true);
      navigate("/auth/login");
    } else {
      console.error("로그아웃 실패:", error);
      setModalMessage("로그아웃 중 에러가 발생했습니다.");
      setModalOpen(true);
    }
    throw error;
  }
};
