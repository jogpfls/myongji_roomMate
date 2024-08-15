import { Axios } from "./Axios";

export const getChatRooms = async () => {
  try {
    const response = await Axios.get("/chat");
    if (response.status === 200) {
      return response.data.data.chattingRoomList;
    } else {
      throw new Error("채팅방 조회 실패");
    }
  } catch (error) {
    console.error("채팅방 조회 에러: ", error);
    throw error;
  }
};
