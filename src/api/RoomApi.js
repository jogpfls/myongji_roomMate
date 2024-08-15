import { Axios } from "./Axios";

export const getBoardDetail = (id, dormitory) => {
  return Axios.get(`/boards/${id}?dormitory=${dormitory}`);
};
