import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const List = ({search, title, status}) => {
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

  const handleClick = () => {
    if (status !== '모집완료') {
      navigate('/room');
    }
  };

  return (
    <div>
      {title.includes(search) && (
        <Wrapper 
        status={status}
        onClick={() => handleClick()}>
          <LeftBox>
          <div>
            <Title>{title}</Title>
          </div>
          <ContentsBox>
            <Contents >
              {truncateText("-비흡연자 - 방 안 영상통화 X (방에 혼자 있을 때나 짧은 통화는 호실\
              내에서 해도 괜찮아요!) 긴 통화는 호실 밖에서 해주세요:) - 청소 규칙\
              정해서 해주실 분 (음식물 쓰레기, 머리 말린 후 머리카락 제때 치워주기)\
              음식물 쓰레기 변기에 버리지 X - 영상, 노래 들을 때 이어폰 사용 - 밤에", maxLength)}
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
            <ChatTextBox status={status}>
              {status === '모집완료' ? <ChatText>모집 완료</ChatText> 
              : <>
              <Count>3/4 모집 중..</Count>
              <ChatText>채팅방 입장하기</ChatText>
              </>}
            </ChatTextBox>
          </RightBox>
        </Wrapper>
      )}
    </div>
  );
};

const Wrapper = styled.div`
  background-color: ${({theme, status})=>status === '모집완료' ? theme.colors.gray3 : theme.colors.white};
  width: 100%;
  height: 25vh;
  border-radius: 10px;
  display: flex;
  cursor: ${({status})=>status === '모집완료' ? "" : "pointer"};
  transition: background-color 0.2s;
  margin-bottom: 2.3vh;
  border: solid 1px ${({theme})=>theme.colors.gray2};

&:hover{
    background-color: ${({theme, status})=>status === '모집완료' ? 'none' : theme.colors.lightBlue};
    border: ${({status})=>status === '모집완료' ? "" : "none"};
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
  background-color: ${({theme, status})=>status === '모집완료' ? theme.colors.gray2 : "#F7FAFF"};
  height: 90%;
  width: 90%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Count = styled.p`
  color: ${({theme})=>theme.colors.gray};
  font-size: 15px;
  margin-bottom: 5px;
`;

const ChatText = styled.p`
  ${({theme})=>theme.fonts.text4};
  color: ${({theme})=>theme.colors.gray};
  font-size: 25px;
`;

export default List;