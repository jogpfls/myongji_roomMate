import { Axios } from "./Axios";

export const CategoryApi = async(response) => {
  try{
    response = await Axios.get(`/users/category`);
    console.log("카테고리 성공: ", response.data)
    return response.data;
  }catch(error){
    throw error;
  }
}