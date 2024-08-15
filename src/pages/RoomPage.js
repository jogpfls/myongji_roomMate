import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Category from "../components/Category";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { getBoardDetail } from "../api/RoomApi";

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
      <Content>{post.content}</Content>
      <BtnBox>
        <Text>※ 채팅 버튼을 누르면 작성자에게 개인정보가 공개됩니다.</Text>
        <Btn>
          <Button onClick={() => navigate("/chat")}>채팅하기</Button>
        </Btn>
      </BtnBox>
    </Container>
  );
};
const Container = styled.div`
  width: 70%;
  margin: auto;
  height: 95vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
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
const BtnBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Text = styled.div`
  display: flex;
  flex-direction: row-reverse;
  font-size: 15px;
`;
const Btn = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;
export default RoomPage;
