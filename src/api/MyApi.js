import { Axios } from "./Axios";
import Cookies from "js-cookie";

export const getUserData = async () => {
  try {
    const response = await Axios.get("/users/info");
    return response.data.data;
  } catch (error) {
    console.error("유저 정보를 가져오는데 실패했습니다.", error);
    throw error;
  }
};

export const updateUserName = async (newName, setModalMessage, setModalOpen,navigate) => {
  try {
    const response = await Axios.patch("/users/info", { name: newName });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 409) {
      setModalMessage(error.response.data.message);
      setModalOpen(true);
    }
    console.error("이름 수정에 실패했습니다.", error);
    throw error;
  }
};

export const getUserBoards = async (setModalMessage, setModalOpen) => {
  try {
    const response = await Axios.get("/users/board");
    return response.data.data.myBoardDtoList;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      setModalMessage("세션이 만료되었습니다. 다시 로그인해주세요.");
      setModalOpen(true);
      Cookies.remove("accessToken");
    }
    console.error("게시글을 가져오는데 실패했습니다.", error);
    throw error;
  }
};

export const getUserCategories = async () => {
  const response = await Axios.get("/users/category");
  return response.data;
};

export const addUserCategory = async (category) => {
  try {
    const response = await Axios.post("/users/category", { category });
    return response.data;
  } catch (error) {
    throw new Error("카테고리를 추가하는 데 실패했습니다.");
  }
};

export const deleteUserCategory = async (categoryId) => {
  try {
    await Axios.delete(`/users/category/${categoryId}`);
  } catch (error) {
    throw new Error("카테고리를 삭제하는 데 실패했습니다.");
  }
};

export const nameGenderApi = async(name, gender) => {
  try{
    await Axios.post(`/users/info`, {
      name,
      gender,
    })
  }catch(error) {
    console.error("이름과 성별 저장 실패: ", error);
  }
}

export const getLikeApi = async() => {
  try{
    const response = await Axios.get(`/boards/likes`);
    return response.data.data.boardDtoList;
  }catch(error){
    console.error("좋아요 가져오기 실패: ", error);
  }
}
