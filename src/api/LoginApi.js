import { Axios } from "./Axios";
import Cookies from "js-cookie";

export const login = async (id, passwrd, navigate) => {
  try {
    const response = await Axios.post(`/auth/login`, {
      id,
      passwrd,
    });
    Cookies.set("accessToken", response.data.accessToken);

    setTimeout(() => {
      Cookies.remove("accessToken");
      alert("세션이 만료되었습니다. 다시 로그인해주세요.");
      navigate("/auth/login");
    }, 3600 * 1000);

    return response;
  } catch (error) {
    console.error("로그인 중 에러 발생:", error);
    throw error;
  }
};

export const logout = async (navigate) => {
  try {
    const response = await Axios.get(`/auth/logout`);
    Cookies.remove('accessToken');
    alert("로그아웃 성공");
    return response;
  } catch (error) {
    if(error.response && error.response.status === 401){
      Cookies.remove("accessToken");
      alert("세션이 만료되었습니다. 다시 로그인해주세요.");
      navigate("/auth/login");
      throw error;
    }
    console.error("로그아웃 실패:", error);
    throw error;
  }
};