import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import ChatOut from "../images/ChatOut.svg";
import ChatRoomList from "../components/ChatRoomList";

const socket = io("");

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [activeRoom, setActiveRoom] = useState("");
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  useLayoutEffect(() => {
    const chatMessagesElement = chatMessagesRef.current;

    if (chatMessagesElement) {
      chatMessagesElement.scrollTop = chatMessagesElement.scrollHeight;
    }
  }, [messages]);

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

  const handleRoomClick = (roomName) => {
    setActiveRoom(roomName);
  };

  return (
    <ChatContainer>
      <ChatRoomList activeRoom={activeRoom} onRoomClick={handleRoomClick} />
      <ChatRoom>
        <ChatRoomHeader>
          <RoomInfo>
            <RoomTitle>{activeRoom}</RoomTitle>
            <RoomStatus>3/4 모집 중...</RoomStatus>
          </RoomInfo>
          <HeaderRight>
            <ExitButton>
              <img src={ChatOut} alt="나가기" />
            </ExitButton>
          </HeaderRight>
        </ChatRoomHeader>
        <ChatMessages ref={chatMessagesRef}>
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

// ... existing styled components
const ChatContainer = styled.div`
  display: flex;
  height: 94vh;
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
