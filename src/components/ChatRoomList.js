import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getChatRooms } from "../api/ChatApi";

const ChatRoomList = ({ activeRoom, onRoomClick }) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const chatRooms = await getChatRooms();
        setRooms(chatRooms);
      } catch (error) {
        console.error("채팅방목록조회실패:", error);
      }
    };

    fetchChatRooms();
  }, []);

  return (
    <Container>
      <Title>채팅방</Title>
      <RoomList>
        {rooms.map((room) => (
          <RoomItem
            key={room.id}
            active={room.id === activeRoom}
            onClick={() =>
              onRoomClick(room.id, room.title, room.current, room.total)
            }
          >
            {room.title}
            <span>
              ({room.current} / {room.total} 명)
            </span>
          </RoomItem>
        ))}
      </RoomList>
    </Container>
  );
};

export default ChatRoomList;

const Container = styled.aside`
  width: 30%;
  background-color: ${(props) => props.theme.colors.white};
  border-right: 1px solid ${(props) => props.theme.colors.gray};
`;

const Title = styled.h2`
  padding: 25px 0;
  ${(props) => props.theme.fonts.text7};
  font-size: 30px;
  padding-left: 20px;
  border-bottom: 2px solid ${(props) => props.theme.colors.gray2};
`;

const RoomList = styled.ul`
  list-style: none;
`;

const RoomItem = styled.li`
  padding: 25px 20px;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.lightBlue : theme.colors.white};
  cursor: pointer;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray2};
  ${(props) => props.theme.fonts.text4};
  font-size: 20px;
  span {
    font-size: 15px;
    color: ${(props) => props.theme.colors.gray};
    margin-left: 5px;
  }
`;
