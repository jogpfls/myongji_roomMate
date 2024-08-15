import { Axios } from "./Axios";

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
    console.error("기숙사 조회 실패: ", error);
    return [];
  }
};
