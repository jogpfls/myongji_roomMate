import React, { useEffect, useState } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import ChatOut from "../images/ChatOut.svg";

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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
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
          <RoomInfo>
            <RoomTitle>흡연 안하는 룸메 구해요</RoomTitle>
            <RoomStatus>3/4 모집 중...</RoomStatus>
          </RoomInfo>
          <HeaderRight>
            <ExitButton>
              <img src={ChatOut} />
            </ExitButton>
          </HeaderRight>
        </ChatRoomHeader>
        <ChatMessages>
          {messages.map((message, index) => (
            <Message key={index} sent={message.sender === "나"}>
              <Timestamp sent={message.sender === "나"}>12:13</Timestamp>
              <MessageText sent={message.sender === "나"}>
                {message.text}
              </MessageText>
            </Message>
          ))}
        </ChatMessages>

        <ChatInputContainer>
          <ChatInput
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 2px solid ${(props) => props.theme.colors.gray2};
`;
const RoomInfo = styled.div``;

const RoomTitle = styled.h3`
  ${(props) => props.theme.fonts.text4};
  font-size: 23px;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`;

const RoomStatus = styled.span`
  color: #666;
  ${(props) => props.theme.fonts.text2};
  font-size: 15px;
  margin-right: 20px;
`;

const ExitButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;

  img {
    width: 24px;
    height: 24px;
  }

  &:hover {
    opacity: 0.7;
  }
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

const Message = styled.div`
  display: flex;
  justify-content: ${({ sent }) => (sent ? "flex-end" : "flex-start")};
  margin-bottom: 10px;
  align-items: center;
`;

const MessageText = styled.p`
  background-color: ${({ sent }) =>
    sent ? (props) => props.theme.colors.lightBlue : "#ffecd4"};
  padding: 10px;
  border-radius: 10px;
  margin: 0;
  max-width: 70%;
  word-break: break-word;
  display: inline-block;
`;

const Timestamp = styled.span`
  font-size: 12px;
  color: #888;
  margin: ${({ sent }) => (sent ? "0 10px 0 0" : "0 0 0 10px")};
  order: ${({ sent }) => (sent ? "0" : "1")};
  margin-top: 20px;
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
