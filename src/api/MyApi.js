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

export const updateUserName = async (newName) => {
  try {
    const response = await Axios.patch("/users/info/name", { name: newName });
    return response.data;
  } catch (error) {
    console.error("이름 수정에 실패했습니다.", error);
    throw error;
  }
};

export const getUserBoards = async () => {
  try {
    const response = await Axios.get("/users/board");
    return response.data.data.myBoardDtoList;
  } catch (error) {
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
