import { Axios } from "./Axios";
import Cookies from "js-cookie";

export const fetchDormitoryPosts = async (name, setModalMessage, setModalOpen, navigate) => {
  try {
    const response = await Axios.get(`/boards?dormitory=${name}`);
    if (response.status === 200) {
      return response.data.data.boardDtoList;
    } else {
      console.error("기숙사 조회 실패: ", response);
      return [];
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      const errorCode = error.response.data.errorCode;
      if (errorCode === "4012") {
        navigate('*');
      } else if (errorCode === "4020") {
        navigate('*');
      } else {
        Cookies.remove("accessToken");
        setModalMessage("세션이 만료되었습니다. 다시 로그인해주세요.");
        setModalOpen(true);
      }
    } else {
      console.error("기숙사 조회 실패: ", error);
    }
    return [];
  }
};