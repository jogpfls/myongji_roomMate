import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const List = ({search, title}) => {
  const navigate = useNavigate();
  const [maxLength, setMaxLength] = useState(12);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1200) {
        setMaxLength(100);
      } else {
        setMaxLength(200);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };
  return (
    <div>
      {title.includes(search) && (
        <Wrapper onClick={() => navigate('/room')}>
          <LeftBox>
          <div>
            <Title>{title}</Title>
          </div>
          <ContentsBox>
            <Contents >
              {truncateText("-비흡연자 - 방 안 영상통화 X (방에 혼자 있을 때나 짧은 통화는 호실\
              내에서 해도 괜찮아요!) 긴 통화는 호실 밖에서 해주세요:) - 청소 규칙\
              정해서 해주실 분 (음식물 쓰레기, 머리 말린 후 머리카락 제때 치워주기)\
              음식물 쓰레기 변기에 버리지 X - 영상, 노래 들을 때 이어폰 사용 - 밤에\
              스탠드 켜도 주무실 수 있는 분 / 밤에 키보드 사용 X (무소음 키보드는\
              사용해도 괜찮아요!) 생활하면서 불편한 점 있으면 규칙 조율하고, 한 학기\
              동안 잘 지낼 분 구해요!! 관심 있으시거나 궁금한 점 있는 분들은 쪽지\
              부탁드려요!!", maxLength)}
            </Contents>
          </ContentsBox>
            <TextBox>
              <CategoryBox>
                <Category>#흡연안함</Category>
                <Category>#4인실</Category>
              </CategoryBox>
              <Date>2024.05.31</Date>
            </TextBox>
          </LeftBox>
          <RightBox>
            <ChatTextBox>
              <ChatText>4/3 모집중...</ChatText>
            </ChatTextBox>
          </RightBox>
        </Wrapper>
      )}
    </div>
  );
};

const Wrapper = styled.div`
  background-color: ${({theme})=>theme.colors.white};
  width: 100%;
  height: 25vh;
  border-radius: 10px;
  display: flex;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-bottom: 2.3vh;
  border: solid 1px ${({theme})=>theme.colors.gray2};
  
  &:hover{
    background-color: ${({theme})=>theme.colors.lightBlue};
    border: none;
  }
`;

const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 75%;
  height: 100%;
  margin-left: 1vw;
`;

const Title = styled.p`
  ${({theme})=>theme.fonts.text4}
  font-size: 25px;
`;

const TextBox = styled.div`
  width: 95%;
  display: flex;
  justify-content: space-between;
`;

const ContentsBox = styled.div`
  width: 95%;
  height: 11vh;
  display: flex;
  align-items: center;
`;

const Contents = styled.p`
  font-size: 16px;
`;

const CategoryBox = styled.div`
  display: flex;
  gap: 1vw;

`;

const Category = styled.p`
  color: ${({theme})=>theme.colors.gray};
  font-size: 15px;
`;

const Date = styled.p`
  color: ${({theme})=>theme.colors.gray};
  font-size: 15px;
`;

const RightBox = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChatTextBox = styled.div`
  background-color: ${({theme})=>theme.colors.gray3};
  height: 90%;
  width: 90%;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChatText = styled.p`
  ${({theme})=>theme.fonts.text4};
  color: ${({theme})=>theme.colors.gray};
  font-size: 25px;
`;

export default List;