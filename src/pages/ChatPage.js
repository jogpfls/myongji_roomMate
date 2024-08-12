import React, { useEffect, useState } from "react";
import styled from "styled-components";
import io from "socket.io-client";

const socket = io("");

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    if (inputMessage.trim()) {
      socket.emit("sendMessage", inputMessage);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputMessage, sender: "나" },
      ]);
      setInputMessage("");
    }
  };

  return (
    <ChatContainer>
      <ChatRoomList>
        <Title>채팅방</Title>
        <RoomList>
          <RoomItem active>흡연 안하는 룸메 구해요</RoomItem>
          <RoomItem>4동 룸메 구해요</RoomItem>
          <RoomItem>잘 안들어오는 룸메 환영</RoomItem>
        </RoomList>
      </ChatRoomList>
      <ChatRoom>
        <ChatRoomHeader>
          <RoomTitle>흡연 안하는 룸메 구해요</RoomTitle>
          <RoomStatus>3/4 모집 중...</RoomStatus>
        </ChatRoomHeader>
        <ChatMessages>
          {messages.map((message, index) => (
            <Message key={index} sent={message.sender === "나"}>
              <MessageText>{message.text}</MessageText>
              <Timestamp>12:13</Timestamp>
            </Message>
          ))}
        </ChatMessages>
        <ChatInputContainer>
          <ChatInput
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="메세지를 입력하세요."
          />
          <SendButton type="button" onClick={sendMessage}>
            ➤
          </SendButton>
        </ChatInputContainer>
      </ChatRoom>
    </ChatContainer>
  );
};

export default ChatPage;

const ChatContainer = styled.div`
  display: flex;
  height: 94vh;
`;

const ChatRoomList = styled.aside`
  width: 30%;
  background-color: ${(props) => props.theme.colors.white};
  border-right: 1px solid ${(props) => props.theme.colors.gray};
`;

const Title = styled.h2`
  padding: 25px 0px;
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
  background-color: ${({ active }) =>
    active ? (props) => props.theme.colors.lightBlue : "#fff"};
  cursor: pointer;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray2};
`;

const ChatRoom = styled.section`
  width: 70%;
  display: flex;
  flex-direction: column;
`;

const ChatRoomHeader = styled.header`
  background-color: #fff;
  padding: 20px;
  border-bottom: 2px solid ${(props) => props.theme.colors.gray2};
`;

const RoomTitle = styled.h3`
  ${(props) => props.theme.fonts.text4};
  font-size: 23px;
`;

const RoomStatus = styled.span`
  color: #666;
  ${(props) => props.theme.fonts.text2};
  font-size: 15px;
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

const Message = styled.div`
  margin-bottom: 20px;
  max-width: 50%;
  margin-left: ${({ sent }) => (sent ? "auto" : "0")};
  margin-right: ${({ sent }) => (sent ? "0" : "auto")};
  background-color: ${({ sent }) =>
    sent ? (props) => props.theme.colors.lightBlue : "#ffecd4"};
  padding: 10px;
  border-radius: 10px;
`;

const MessageText = styled.p`
  margin: 0;
`;

const Timestamp = styled.span`
  font-size: 12px;
  color: #888;
  display: block;
  text-align: right;
`;

const ChatInputContainer = styled.footer`
  display: flex;
  padding: 20px;
  background-color: #fff;
  border-top: 1px solid ${(props) => props.theme.colors.gray2};
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.colors.gray2};
  border-radius: 5px;
  &:focus {
    outline: none;
    border: 1px solid ${(props) => props.theme.colors.blue};
  }
`;

const SendButton = styled.button`
  margin-left: 10px;
  padding: 10px 20px;
  background-color: ${(props) => props.theme.colors.blue2};
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.blue2C};
  }
`;
