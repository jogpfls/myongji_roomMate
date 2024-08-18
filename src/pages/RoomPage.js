import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Category from "../components/Category";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import {
  getBoardDetail,
  deleteBoardDetail,
  patchBoardDetail,
  postChat,
} from "../api/RoomApi";
import Modal from "../components/Modal";

const dormitoryNames = {
  dormitory3: "3동",
  dormitory4: "4동",
  dormitory5: "5동",
  myoungdeok: "명덕",
  myounghyun: "명현",
};

const RoomPage = () => {
  const navigate = useNavigate();
  const { id, name } = useParams();
  const [post, setPost] = useState(null);
  const [patchPost, setPatchPost] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [roomId, setRoomId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    console.log(`Fetching data for dormitory: ${name}, board ID: ${id}`);
    getBoardDetail(id, name)
      .then((response) => {
        console.log("게시글 조회 성공", response.data);
        setPost(response.data);
        setRoomId(response.roomId);
      })
      .catch((error) => {
        console.error("게시글 조회 실패:", error);
      });
  }, [id, name]);

  if (!post) {
    return (
      <LoadingContainer>
        <Loading />
        <LoadingText>loading</LoadingText>
      </LoadingContainer>
    );
  }

  const changeClick = () => {
    setPatchPost(!patchPost);
    setEditedContent(post.content);
  };

  const handlePatch = async () => {
    try {
      const result = await patchBoardDetail(id, name, editedContent);
      if (result.errorCode === 403) {
        setModalMessage("본인 게시글만 수정 가능합니다.");
        setModalOpen(true);
        setPatchPost(false);
      } else {
        setPost((prevPost) => ({
          ...prevPost,
          content: editedContent,
        }));
        setPatchPost(false);
      }
    } catch (error) {
      console.error("패치 실패:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const result = await deleteBoardDetail(id, name);
      if (result.errorCode === 403) {
        setModalMessage("본인 게시글만 삭제 가능합니다.");
        setModalOpen(true);
        setPatchPost(false);
      } else {
        navigate(`/dormitory/${name}`);
      }
    } catch (error) {
      console.error("삭제 실패:", error);
    }
  };

  const handleContentChange = (e) => {
    setEditedContent(e.target.value);
  };

  const handleChat = async () => {
    try {
      const response = await postChat(roomId);
      if (response.statusCode === "200 OK") {
        console.log("해당 채팅방 불러오기 성공:", response.data);
        navigate("/chat");
      } else {
        setModalMessage(response.message);
        setModalOpen(true);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "해당 채팅방 불러오기 중 오류가 발생했습니다.";

      console.error("해당 채팅방 불러오기 실패:", error);
      setModalMessage(`${errorMessage}`);
      setModalOpen(true);
    }
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Container>
      <Dormitory>{dormitoryNames[name]}</Dormitory>
      <Title>{post.title}</Title>
      <TagBox>
        {post.categoryList.map((data, index) => (
          <Category key={index}>{data}</Category>
        ))}
      </TagBox>
      <Content>
        {patchPost ? (
          <Input
            type="text"
            value={editedContent}
            onChange={handleContentChange}
          />
        ) : (
          <ContentsText>{post.content}</ContentsText>
        )}
      </Content>
      <Box>
        {!patchPost && (
          <Text>※ 채팅 버튼을 누르면 작성자에게 개인정보가 공개됩니다.</Text>
        )}
        <BtnBox patchPost={patchPost}>
          {!patchPost ? (
            <>
              <ButtonBox>
                <Button onClick={changeClick}>수정하기</Button>
              </ButtonBox>
              <Button onClick={handleChat}>채팅하기</Button>
            </>
          ) : (
            <BoxBox>
              <Button onClick={handleDelete}>삭제하기</Button>
              <Button onClick={handlePatch}>수정완료</Button>
            </BoxBox>
          )}
        </BtnBox>
      </Box>

      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title="알림"
        message={modalMessage}
      />
    </Container>
  );
};

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const fadeInOut = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const LoadingContainer = styled.div`
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 70vh;
  justify-content: center;
`;

const Loading = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.lightBlue};
  border-top: 2px solid ${({ theme }) => theme.colors.deepBlue};
  border-right: 2px solid ${({ theme }) => theme.colors.deepBlue};
  animation: ${rotate} 1.8s linear infinite;
`;

const LoadingText = styled.div`
  margin-top: 10px;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.deepBlue};
  text-transform: uppercase;
  animation: ${fadeInOut} 2s linear infinite;
`;

const ContentsText = styled.p`
  width: 100%;
  height: 100%;
  display: flex;
  word-break: break-word;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  width: 70%;
  margin: auto;
  height: 95vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 80%;
  }
`;

const Dormitory = styled.div`
  ${(props) => props.theme.fonts.title}
  font-size: 40px;
  text-align: center;
  margin-bottom: 10px;
`;

const Title = styled.div`
  width: 100%;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.lightBlue};
  ${(props) => props.theme.fonts.text5}
`;

const TagBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  gap: 1.85vw;
  width: 100%;
`;

const Content = styled.div`
  width: 100%;
  min-height: 300px;
  height: auto;
  padding: 20px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.lightBlue};
`;

const Input = styled.textarea`
  background-color: transparent;
  width: 100%;
  height: 100%;
  outline: none;
  resize: none;

  &:hover {
    outline: none;
  }
`;

const BtnBox = styled.div`
  display: flex;
  width: 100%;
  margin-top: 10px;
  justify-content: ${({ patchPost }) => (!patchPost ? "end" : "space-between")};
`;

const Text = styled.div`
  display: flex;
  flex-direction: row-reverse;
  font-size: 15px;
`;

const ButtonBox = styled.div`
  width: 100%;
`;

const BoxBox = styled.div`
  display: flex;
  gap: 1vw;
`;

export default RoomPage;
