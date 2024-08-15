import { Axios } from "./Axios";

export const WriteApi = async({ total, title, content, name }) => {
  try {
    const payload = {
      title: title,
      content: content,
    };
    
    if(total) {
      payload.total = total;
    }
    
    const response = await Axios.post(`/boards?dormitory=${name}`, payload);
    return response.data;
  } catch (error) {
    console.error("게시글 작성 실패", error);
    throw error;
  }
}