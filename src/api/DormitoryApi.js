import { Axios } from "./Axios";
import Cookies from "js-cookie";

export const fetchDormitoryPosts = async (name) => {
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
    }
    console.error("기숙사 조회 실패: ", error);
    return [];
  }
};
