import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import ChatOut from "../images/ChatOut.svg";
import ChatRoomList from "../components/ChatRoomList";
import { getUserData } from "../api/MyApi";
import { getChatRooms } from "../api/ChatApi";
import { useLocation } from "react-router-dom";
import { Axios } from "../api/Axios";
import OtherInfo from "../components/OtherInfo";
import Modal from "../components/Modal";

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
  const [isRoomListOpen, setIsRoomListOpen] = useState(false);

  const [selectedUserInfo, setSelectedUserInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorModal, setErrorModal] = useState({
    isOpen: false,
    title: "",
    message: "",
  });

  const handleNameClick = async (name) => {
    try {
      const response = await Axios.post("/users/profile", { name });
      setSelectedUserInfo(response.data.data);
      console.log(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("다른 유저 정보 받기 실패: ", error);
      setErrorModal({
        isOpen: true,
        title: "알림",
        message:
          error.response?.data?.message || "유저 정보를 확인할 수 없습니다.",
      });
    }
  };

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userData = await getUserData();
        setUserName(userData.name);
      } catch (error) {
        console.error("유저 이름 받기 실패: ", error);
      }
    };

    fetchUserName();
  }, []);

  useEffect(() => {
    const fetchRecentChatRoom = async () => {
      try {
        const chatRooms = await getChatRooms();
        if (chatRooms.length > 0) {
          const recentRoom = chatRooms.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )[0];
          setActiveRoomId(recentRoom.id);
          setActiveRoomTitle(recentRoom.title);
          setRoomParticipants({
            current: recentRoom.current,
            total: recentRoom.total,
          });
        }
      } catch (error) {
        console.error("최근 채팅방 받기 실패: ", error);
      }
    };

    if (!location.state?.roomId) {
      fetchRecentChatRoom();
    } else {
      setActiveRoomId(location.state.roomId);
      setActiveRoomTitle(location.state.roomTitle);
      setRoomParticipants({
        current: location.state.currentParticipants,
        total: location.state.totalParticipants,
      });
    }
  }, [location.state]);

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

  const isJoinOrLeaveMessage = (messageContent) => {
    return (
      messageContent.includes("님이 채팅방을 퇴장했습니다.") ||
      messageContent.includes("님이 채팅방에 입장했습니다.")
    );
  };

  const getModifiedContent = (messageContent) => {
    return isJoinOrLeaveMessage(messageContent)
      ? `--------------${messageContent}--------------`
      : messageContent;
  };

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

            const modifiedContent = getModifiedContent(receivedMessage.content);

            // 메시지 중복 여부를 체크하고 추가
            if (
              roomMessages.some(
                (msg) =>
                  msg.content === modifiedContent &&
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
                  content: modifiedContent,
                  sender: receivedMessage.sender,
                  timestamp: receivedMessage.timestamp,
                  type: isJoinOrLeaveMessage(receivedMessage.content)
                    ? "notification"
                    : "message",
                },
              ],
            };
          });
        } catch (error) {
          console.error("메시지 처리 실패: ", error);
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
      console.error("STOMP client 연결되지 않음 또는 입력 빈값");
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
    setIsRoomListOpen(false);
  };

  const handleExitRoom = () => {
    if (stompClient && stompClient.active && activeRoomId) {
      stompClient.publish({
        destination: `/pub/ws/chat/${activeRoomId}/quit`,
        body: JSON.stringify({
          roomId: activeRoomId,
          sender: userName,
        }),
      });

      setActiveRoomId(null);
      setActiveRoomTitle("");
      setRoomParticipants({ current: 0, total: 0 });
      setMessages({});
    } else {
      console.error("STOMP client 연결되지않음 또는 선택되지않음");
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const toggleRoomList = () => {
    setIsRoomListOpen(!isRoomListOpen);
  };

  return (
    <ChatContainer>
      <ListContainer isOpen={isRoomListOpen}>
        <ChatRoomList
          isOpen={isRoomListOpen}
          activeRoom={activeRoomId}
          onRoomClick={handleRoomClick}
        />
      </ListContainer>
      <ChatRoom isOpen={isRoomListOpen}>
        <ChatRoomHeader>
          <ToggleRoomListButton onClick={toggleRoomList}>
            <Icon isOpen={isRoomListOpen}>{isRoomListOpen ? "×" : "<"}</Icon>
          </ToggleRoomListButton>
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
            <Message
              key={index}
              sent={message.sender === userName}
              type={message.type}
            >
              {message.type === "message" && (
                <SenderName
                  sent={message.sender === userName}
                  onClick={() => handleNameClick(message.sender)}
                >
                  {message.sender}
                </SenderName>
              )}
              <MessageContainer sent={message.sender === userName}>
                <MessageText
                  sent={message.sender === userName}
                  type={message.type}
                >
                  {message.content}
                </MessageText>
                {message.type === "message" && (
                  <Timestamp sent={message.sender === userName}>
                    {formatTimestamp(message.timestamp)}
                  </Timestamp>
                )}
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
      {isModalOpen && (
        <OtherInfo
          userInfo={selectedUserInfo}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <Modal
        isOpen={errorModal.isOpen}
        onClose={() => setErrorModal({ ...errorModal, isOpen: false })}
        title={errorModal.title}
        message={errorModal.message}
      />
    </ChatContainer>
  );
};

export default ChatPage;

const ChatContainer = styled.div`
  display: flex;
  height: 92vh;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    height: 92vh;
  }
`;

const ListContainer = styled.aside`
  width: 30%;
  background-color: ${(props) => props.theme.colors.white};
  border-right: 1px solid ${(props) => props.theme.colors.gray};
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    height: 92vh;
    display: ${(props) => (props.isOpen ? "block" : "none")};
  }
`;

const ChatRoom = styled.section`
  width: 70%;
  display: flex;
  flex-direction: column;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    height: 100%;
    display: ${(props) => (props.isOpen ? "none" : "flex")};
  }
`;

const ToggleRoomListButton = styled.button`
  display: none;
  padding: 0px;
  color: black;
  border: none;
  background-color: #fff;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: block;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Icon = styled.span`
  font-size: 30px;
  ${(props) => props.theme.fonts.other};
  color: ${(props) => props.theme.colors.deepBlue};
`;

const ChatRoomHeader = styled.header`
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 2px solid ${(props) => props.theme.colors.gray2};
  padding-bottom: 17px;
`;

const RoomInfo = styled.div``;

const RoomTitle = styled.h3`
  ${(props) => props.theme.fonts.text5};
  font-size: 23px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0;
    margin-top: 4px;
  }
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
  align-items: ${({ sent, type }) =>
    type === "message" ? (sent ? "flex-end" : "flex-start") : "center"};
  margin-bottom: 10px;
  width: 100%;
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
  margin-left: ${({ sent }) => (sent ? "" : "5px")};
  margin-right: ${({ sent }) => (sent ? "5px" : "")};
  cursor: pointer;
`;

const MessageText = styled.p`
  background-color: ${({ sent, type }) =>
    type === "message"
      ? sent
        ? (props) => props.theme.colors.lightBlue
        : "#ffecd4"
      : "none"};
  padding: ${({ type }) => (type === "message" ? "10px" : "5px 10px")};
  border-radius: 10px;
  margin: 0;
  max-width: ${({ type }) => (type === "message" ? "80%" : "100%")};
  word-break: break-word;
  display: inline-block;
  text-align: ${({ type }) => (type === "message" ? "left" : "center")};
  color: ${({ type, theme }) =>
    type === "message" ? theme.colors.black : theme.colors.gray};
  font-size: ${({ type }) => (type === "message" ? "20px" : "17px")};
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
