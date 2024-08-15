import { Axios } from "./Axios";
import Cookies from "js-cookie";

export const login = async (id, passwrd) => {
  try {
    const response = await Axios.post(`/auth/login`, {
      id,
      passwrd,
    });
    Cookies.set("accessToken", response.data.accessToken);
    console.log("response: ", response);
    return response;
  } catch (error) {
    console.error("로그인 중 에러 발생:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await Axios.get(`/auth/logout`);
    Cookies.remove('accessToken');
    alert("로그아웃 성공");
    return response;
  } catch (error) {
    console.error("로그아웃 실패:", error);
    throw error;
  }
};
