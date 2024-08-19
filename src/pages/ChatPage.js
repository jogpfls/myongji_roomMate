import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import ChatOut from "../images/ChatOut.svg";
import ChatRoomList from "../components/ChatRoomList";
import { getUserData } from "../api/MyApi";
import { useLocation } from "react-router-dom";

const ChatPage = () => {
  const location = useLocation();
  const [messages, setMessages] = useState({});
  const [inputMessage, setInputMessage] = useState("");
  const [activeRoomId, setActiveRoomId] = useState(
    location.state?.roomId || null
  );
  const [activeRoomTitle, setActiveRoomTitle] = useState("");
  const [stompClient, setStompClient] = useState(null);
  const [userName, setUserName] = useState("");
  const [roomParticipants, setRoomParticipants] = useState({});
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userData = await getUserData();
        setUserName(userData.name);
      } catch (error) {
        console.error("Failed to fetch user name:", error);
      }
    };

    fetchUserName();
  }, []);

  useEffect(() => {
    if (location.state?.roomTitle) {
      setActiveRoomTitle(location.state.roomTitle);
    }

    if (
      location.state?.currentParticipants !== undefined &&
      location.state?.totalParticipants !== undefined
    ) {
      setRoomParticipants({
        current: location.state.currentParticipants,
        total: location.state.totalParticipants,
      });
    }
  }, [location.state]);

  useEffect(() => {
    if (!activeRoomId || !userName) return;

    const client = new Client({
      webSocketFactory: () => new SockJS("https://api.mju-mate.com/ws/chat"),
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = function (frame) {
      console.log("Connected: " + frame);
      setStompClient(client);

      client.subscribe(`/sub/ws/chat/room/${activeRoomId}`, function (message) {
        console.log("Received raw message:", message.body);
        try {
          const receivedMessage = JSON.parse(message.body);
          console.log("Received message:", receivedMessage);
          setMessages((prevMessages) => {
            const roomMessages = prevMessages[activeRoomId] || [];
            if (
              roomMessages.some(
                (msg) =>
                  msg.content === receivedMessage.content &&
                  msg.sender === receivedMessage.sender &&
                  msg.timestamp === receivedMessage.timestamp
              )
            ) {
              return prevMessages;
            }
            return {
              ...prevMessages,
              [activeRoomId]: [
                ...roomMessages,
                {
                  content: receivedMessage.content,
                  sender: receivedMessage.sender,
                  timestamp: receivedMessage.timestamp,
                },
              ],
            };
          });
        } catch (error) {
          console.error("Failed to parse message:", error);
        }
      });

      client.publish({
        destination: `/pub/ws/chat/${activeRoomId}/enter`,
        body: JSON.stringify({
          roomId: activeRoomId,
          sender: userName,
        }),
      });
    };

    client.activate();

    return () => {
      if (client.active) {
        client.deactivate();
      }
    };
  }, [activeRoomId, userName]);

  useLayoutEffect(() => {
    const chatMessagesElement = chatMessagesRef.current;
    if (chatMessagesElement) {
      chatMessagesElement.scrollTop = chatMessagesElement.scrollHeight;
    }
  }, [messages, activeRoomId]);

  const sendMessage = () => {
    if (inputMessage.trim() && stompClient && stompClient.active) {
      const messagePayload = {
        roomId: activeRoomId,
        content: inputMessage,
        sender: userName,
      };
      console.log("Sending message:", JSON.stringify(messagePayload));
      stompClient.publish({
        destination: "/pub/ws/chat/send",
        body: JSON.stringify(messagePayload),
      });

      setInputMessage("");
    } else {
      console.error("STOMP client is not connected or input is empty.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const handleRoomClick = (roomId, roomTitle, current, total) => {
    setActiveRoomId(roomId);
    setActiveRoomTitle(roomTitle);
    setRoomParticipants({ current, total });
  };

  const handleExitRoom = () => {
    if (stompClient && stompClient.active && activeRoomId) {
      // 서버에 퇴장 메시지 발행 -> 아직 하는중
      stompClient.publish({
        destination: `/pub/ws/chat/${activeRoomId}/quit`,
        body: JSON.stringify({
          roomId: activeRoomId,
          sender: userName,
        }),
      });

      // UI 업데이트 및 채팅방 나가기 로직
      setActiveRoomId(null);
      setActiveRoomTitle("");
      setRoomParticipants({ current: 0, total: 0 });
      setMessages({});
    } else {
      console.error("STOMP client is not connected or room is not selected.");
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <ChatContainer>
      <ChatRoomList activeRoom={activeRoomId} onRoomClick={handleRoomClick} />
      <ChatRoom>
        <ChatRoomHeader>
          <RoomInfo>
            <RoomTitle>{activeRoomTitle}</RoomTitle>
            <RoomStatus>
              ( {roomParticipants.current} / {roomParticipants.total} )
            </RoomStatus>
          </RoomInfo>
          <HeaderRight>
            <ExitButton onClick={handleExitRoom}>
              <img src={ChatOut} alt="나가기" />
            </ExitButton>
          </HeaderRight>
        </ChatRoomHeader>
        <ChatMessages ref={chatMessagesRef}>
          {(messages[activeRoomId] || []).map((message, index) => (
            <Message key={index} sent={message.sender === userName}>
              <SenderName sent={message.sender === userName}>
                {message.sender}
              </SenderName>
              <MessageContainer sent={message.sender === userName}>
                <MessageText sent={message.sender === userName}>
                  {message.content}
                </MessageText>
                <Timestamp sent={message.sender === userName}>
                  {formatTimestamp(message.timestamp)}
                </Timestamp>
              </MessageContainer>
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
  ${(props) => props.theme.fonts.text5};
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
  flex-direction: column;
  align-items: ${({ sent }) => (sent ? "flex-end" : "flex-start")};
  margin-bottom: 10px;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: ${({ sent }) => (sent ? "row-reverse" : "row")};
  align-items: center;
`;

const SenderName = styled.span`
  ${(props) => props.theme.fonts.text4};
  font-size: 15px;
  margin-bottom: 5px;
  color: ${({ sent, theme }) =>
    sent ? theme.colors.deepBlue2 : theme.colors.black};
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
  margin: 0 8px;
  order: ${({ sent }) => (sent ? "1" : "2")};
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
