import { Axios } from "./Axios";

export const getBoardDetail = async (id, dormitory) => {
  try {
    const response = await Axios.get(`/boards/${id}?dormitory=${dormitory}`);
    console.log("룸 상세조회 성공:", response.data);
    return {
      data: response.data.data,
      roomId: response.data.data.roomId,
    };
  } catch (error) {
    console.error("룸 상세조회 에러 :", error);
    throw error;
  }
};

export const deleteBoardDetail = async (id, name) => {
  try {
    const response = await Axios.delete(`/boards/${id}?dormitory=${name}`);
    console.log("삭제 성공: ", response.data);
    return response;
  } catch (error) {
    console.error("삭제 실패:", error);
    if (error.response && error.response.status === 403) {
      return { errorCode: 403 };
    }
    throw error;
  }
};

export const patchBoardDetail = async (id, name, editedContent) => {
  try {
    const response = await Axios.patch(`/boards/${id}?dormitory=${name}`, {
      content: editedContent,
    });
    console.log("수정 성공: ", response);
    return response;
  } catch (error) {
    console.error("수정 실패: ", error);
    if (error.response && error.response.status === 403) {
      return { errorCode: 403 };
    }
    throw error;
  }
};

export const postChat = async (roomId) => {
  try {
    const response = await Axios.post("/chat", { roomId });
    return response.data;
  } catch (error) {
    console.error("채팅하기 roomId 보내기 실패:", error);
    throw error;
  }
};
