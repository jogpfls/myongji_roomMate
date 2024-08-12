import React from "react";
import styled from "styled-components";
import Category from "../components/Category";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const RoomPage = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Dormitory>명덕</Dormitory>
      <Title>흡연안하는 룸메 구해요</Title>
      <TagBox>
        <Category disabled>여자</Category>
        <Category disabled>2인실</Category>
        <Category disabled>아침형</Category>
      </TagBox>
      <Content>
        -비흡연자 - 방 안 영상통화 X (방에 혼자 있을 때나 짧은 통화는 호실
        내에서 해도 괜찮아요!) 긴 통화는 호실 밖에서 해주세요:) - 청소 규칙
        정해서 해주실 분 (음식물 쓰레기, 머리 말린 후 머리카락 제때 치워주기)
        음식물 쓰레기 변기에 버리지 X - 영상, 노래 들을 때 이어폰 사용 - 밤에
        스탠드 켜도 주무실 수 있는 분 / 밤에 키보드 사용 X (무소음 키보드는
        사용해도 괜찮아요!) 생활하면서 불편한 점 있으면 규칙 조율하고, 한 학기
        동안 잘 지낼 분 구해요!! 관심 있으시거나 궁금한 점 있는 분들은 쪽지
        부탁드려요!!
      </Content>
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
  width: 75%;
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
  display: flex;
  gap: 2vw;
  flex-direction: initial;
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
