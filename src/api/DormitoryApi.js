import { Axios } from "./Axios";
import Cookies from "js-cookie";

export const fetchDormitoryPosts = async (name, setModalMessage, setModalOpen) => {
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
      Cookies.remove("accessToken");
      setModalMessage("세션이 만료되었습니다. 다시 로그인해주세요.");
      setModalOpen(true);
    }
    console.error("기숙사 조회 실패: ", error);
    return [];
  }
};
