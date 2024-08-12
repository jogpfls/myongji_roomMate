import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const List = ({search, title}) => {
  const navigate = useNavigate();

  return (
    <div>
      {title.includes(search) && (
        <Wrapper onClick={() => navigate('/room')}>
        <TitleBox>
          <Title>{title}</Title>
        </TitleBox>
          <TextBox>
          <CategoryBox>
            <Category>#흡연안함</Category>
            <Category>#4인실</Category>
          </CategoryBox>
          <Date>2024.05.31</Date>
        </TextBox>
      </Wrapper>
      )}
    </div>
  );
};

const Wrapper = styled.div`
  background-color: ${({theme})=>theme.colors.lightBlue};
  width: 67vw;
  height: 11.75vh;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2vh;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-bottom: 2.3vh;
  
  &:hover{
    background-color: ${({theme})=>theme.colors.lightBlueC};
  }
`;

const TitleBox = styled.div`
  background-color: ${({theme})=>theme.colors.white};
  width: 90%;
  height: 3.5vh;
  border-radius: 0.7vw;
  display: flex;
  align-items: center;
`;

const Title = styled.p`
  ${({theme})=>theme.fonts.text4}
  margin-left: 0.8vw;
  font-size: 15px;
`;

const TextBox = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
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

export default List;