import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Category from "../components/DormitoryCategory";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import {
  getBoardDetail,
  deleteBoardDetail,
  patchBoardDetail,
  postChat,
  postLikeApi,
  deleteLikeApi,
} from "../api/RoomApi";
import Modal from "../components/Modal";
import full from "../images/fullStar.svg";
import empty from "../images/emptyStar.svg";

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
      if (response.statusCode === "201 CREATED") {
        console.log("해당 채팅방 불러오기 성공:", response.data);
        navigate("/chat", {
          state: {
            roomId: roomId,
            roomTitle: post.title,
            currentParticipants: post.current,
            totalParticipants: post.total,
          },
        });
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

  const handleStarClick = async () => {
    setPost((prevPost) => ({
      ...prevPost,
      like: !prevPost.like,
    }));

    try {
      if (!post.like) {
        await postLikeApi(id);
      } else {
        await deleteLikeApi(id);
      }
    } catch (error) {
      setPost((prevPost) => ({
        ...prevPost,
        like: !prevPost.like,
      }));
    }
  };

  return (
    <Container>
      <BestTopBox>
        <Dormitory>{dormitoryNames[name]}</Dormitory>
      </BestTopBox>
      <AllBox>
        <TopBox>
          <Title>{post.title}</Title>
          {post.like ? (
            <Star src={full} onClick={handleStarClick}></Star>
          ) : (
            <Star src={empty} onClick={handleStarClick}></Star>
          )}
        </TopBox>
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
      </AllBox>
      <TagBox>
        {post.categoryList.map((data, index) => (
          <Category key={index}>{data}</Category>
        ))}
      </TagBox>
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
  white-space: pre-line;
`;

const Box = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  width: 65%;
  margin: auto;
  height: 95vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 10px;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 70%;
    margin-top: 2vh;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 80%;
    margin-top: 0;
  }

  @media screen and (max-width: 380px) {
    width: 80%;
    margin-top: 8vh;
  }
`;

const BestTopBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
`;

const TopBox = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 1vh;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray2};
`;

const Dormitory = styled.div`
  ${(props) => props.theme.fonts.title}
  font-size: 40px;
  text-align: start;
  margin-left: 1vw;
`;

const Star = styled.img`
  width: 35px;
  cursor: pointer;
  padding-right: 15px;
`;

const AllBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vh;
  //border: 1px solid ${({ theme }) => theme.colors.gray2};
  border-radius: 5px;
`;

const Title = styled.div`
  width: 100%;
  padding: 20px 20px;
  //border-radius: 10px;
  ${(props) => props.theme.fonts.text5}
  font-size: 25px;
`;

const TagBox = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;

const Content = styled.div`
  width: 100%;
  min-height: 300px;
  height: auto;
  padding: 10px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray2};
  line-height: 1.2em;
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
