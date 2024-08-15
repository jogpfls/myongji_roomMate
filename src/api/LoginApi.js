import { Axios } from "./Axios";

export const login = async (id, passwrd) => {
  try {
    const response = await Axios.post(`/auth/login`, {
      id,
      passwrd,
    });
    console.log("response: ", response);
    return response;
  } catch (error) {
    console.error("로그인 중 에러 발생:", error);
    throw error;
  }
};
