import { Axios } from "./Axios";

export const getUserData = async () => {
  try {
    const response = await Axios.get("/users/info");
    return response.data.data;
  } catch (error) {
    console.error("유저 정보를 가져오는데 실패했습니다.", error);
    throw error;
  }
};
