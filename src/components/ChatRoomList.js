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
            active={room.title === activeRoom}
            onClick={() => onRoomClick(room.title)}
          >
            {room.title} ({room.memberCount})
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
  ${(props) => props.theme.fonts.title};
  font-size: 30px;
  padding-left: 20px;
  border-bottom: 2px solid ${(props) => props.theme.colors.gray2};
`;

const RoomList = styled.ul`
  list-style: none;
  padding: 0;
`;

const RoomItem = styled.li`
  padding: 25px 10px;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.lightBlue : "#fff"};
  cursor: pointer;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray2};
`;
