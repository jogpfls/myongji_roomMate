import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const List = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Wrapper onClick={() => navigate('/room')}>
        <TitleBox>
          <Title>♀ 흡연 안하는 룸메 구해요</Title>
        </TitleBox>
          <TextBox>
          <CategoryBox>
            <Category>#흡연안함</Category>
            <Category>#4인실</Category>
          </CategoryBox>
          <Date>2024.05.31</Date>
        </TextBox>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  background-color: ${({theme})=>theme.colors.lightBlue};
  width: 58vw;
  height: 6.38vw;
  border-radius: 0.7vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.2vw;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover{
    background-color: ${({theme})=>theme.colors.lightBlueC};
  }
`;

const TitleBox = styled.div`
  background-color: ${({theme})=>theme.colors.white};
  width: 55vw;
  height: 2.2vw;
  border-radius: 0.7vw;
  display: flex;
  align-items: center;
`;

const Title = styled.p`
  ${({theme})=>theme.fonts.text4}
  margin-left: 0.8vw;
  font-size: 1.1vw;
`;

const TextBox = styled.div`
  width: 55vw;
  display: flex;
  justify-content: space-between;
`;

const CategoryBox = styled.div`
  display: flex;
  gap: 1vw;

`;

const Category = styled.p`
  color: ${({theme})=>theme.colors.gray};
  font-size: 1.1vw;
`;

const Date = styled.p`
  color: ${({theme})=>theme.colors.gray};
  font-size: 1.1vw;
`;

export default List;