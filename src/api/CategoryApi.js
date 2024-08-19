import { Axios } from "./Axios";
import Cookies from "js-cookie";

export const CategoryApi = async(response, setModalMessage, setModalOpen) => {
  try{
    response = await Axios.get(`/users/category`);
    console.log("카테고리 성공: ", response.data)
    return response.data;
  }catch(error){
    if (error.response && error.response.status === 401) {
      Cookies.remove("accessToken");
      setModalMessage("세션이 만료되었습니다. 다시 로그인해주세요.");
      setModalOpen(true);
    }
    throw error;
  }
}