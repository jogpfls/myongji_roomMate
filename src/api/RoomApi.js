import { Axios } from "./Axios";

export const getBoardDetail = (id, dormitory) => {
  return Axios.get(`/boards/${id}?dormitory=${dormitory}`);
};

export const deleteBoardDetail = async(id, name) => {
  try{
    const response = await Axios.delete(`/boards/${id}?dormitory=${name}`);
    console.log("성공: ", response.data)
    return response;
  }catch (error) {
    console.error("삭제 실패:", error);
    if (error.response && error.response.status === 403) {
      return { errorCode: 403 };
    }
    throw error;
  }
}

export const patchBoardDetail = async(id, name, editedContent) => {
  try{
    const response = await Axios.patch(`/boards/${id}?dormitory=${name}`, {
      content: editedContent,
    })
    console.log("성공: ", response);
    return response;
  }catch(error){
    console.error("실패: ", error);
    if (error.response && error.response.status === 403) {
      return { errorCode: 403 };
    }
    throw error;
  }
}
