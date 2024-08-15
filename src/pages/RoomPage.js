import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Category from "../components/Category";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { getBoardDetail, deleteBoardDetail, patchBoardDetail } from "../api/RoomApi";

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

  useEffect(() => {
    console.log(`Fetching data for dormitory: ${name}, room ID: ${id}`);
    getBoardDetail(id, name)
      .then((response) => {
        console.log("게시글 조회 성공", response.data);
        setPost(response.data.data);
      })
      .catch((error) => {
        console.error("게시글 조회 실패:", error);
      });
  }, [id, name]);

  if (!post) {
    return <div>로딩중...</div>;
  }

  const changeClick = () => {
    setPatchPost(!patchPost);
    setEditedContent(post.content);
  };

  const handlePatch = async () => {
      const result = await patchBoardDetail(id, name, editedContent);
      if(result.errorCode === 404){
        alert("본인 게시글만 수정 가능합니다.");
        setPatchPost(false);
      }else{
        navigate(`/dormitory/${name}`)
      }
  };

  const handleDelete = async() => {
    const result = await deleteBoardDetail(id, name);
    if(result.errorCode === 404) {
      alert("본인 게시글만 삭제 가능합니다.");
      setPatchPost(false);
    }
    else{
      navigate(`/dormitory/${name}`)
    }
    
  };

  const handleContentChange = (e) => {
    setEditedContent(e.target.value);
  };

  return (
    <Container>
      <Dormitory>{dormitoryNames[name]}</Dormitory>
      <Title>{post.title}</Title>
      <TagBox>
        <Category disabled>여자</Category>
        <Category disabled>2인실</Category>
        <Category disabled>아침형</Category>
        <Category disabled>아침형</Category>
        <Category disabled>아침형</Category>
        <Category disabled>아침형</Category>
      </TagBox>
      <Content>
        {patchPost ? (
          <Input
            type="text"
            value={editedContent}
            onChange={handleContentChange}
          />
        ) : (
          <ContentsText>
            {post.content}
          </ContentsText>
        )}
      </Content>
      <Box>
      {!patchPost &&
        <Text>※ 채팅 버튼을 누르면 작성자에게 개인정보가 공개됩니다.</Text>}
        <BtnBox>
        {!patchPost ?
        <>
        <ButtonBox>
          <Button onClick={changeClick}>수정하기</Button>
        </ButtonBox>
        <Button onClick={() => navigate("/chat")}>채팅하기</Button>
        </>
        : <>
        <BoxBox>
          <Button onClick={handleDelete}>삭제하기</Button>
          <Button onClick={handlePatch}>수정완료</Button>
        </BoxBox>
        </>}
        </BtnBox>
      </Box>
    </Container>
  );
};

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

  @media screen and (max-width: ${({theme})=>theme.breakpoints.mobile}){
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

  &:hover{
    outline: none;
  }
`;

const BtnBox = styled.div`
  display: flex;
  width: 100%;
  margin-top: 10px;
  justify-content: ${({patchPost})=>!patchPost ? "end" : "space-between"};
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
