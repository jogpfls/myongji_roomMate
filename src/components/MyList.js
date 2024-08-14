import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const MyList = ({title}) => {
  const navigate = useNavigate();
  return (
    <AllWrapper onClick={()=>navigate('/room')}>
      <Wrapper>
        <TitleWrapper>
          <Title>{title}</Title>
        </TitleWrapper>
        <DateBox>
          <Date>2024.08.14</Date>
        </DateBox>
      </Wrapper>
    </AllWrapper>
  );
};

const AllWrapper = styled.div`
  cursor: pointer;
`;

const Wrapper = styled.div`
  background-color: ${({theme})=>theme.colors.lightBlue};
  width: 25vw;
  height: 7vh;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TitleWrapper = styled.div`
  margin-left: 10px;
`;

const Title = styled.p`
`;

const DateBox = styled.div`
  height: 100%;
  margin-right: 15px;
  margin-bottom: 10px;
  display: flex;
  align-items: end;
`;

const Date = styled.p`
  color: ${({theme})=>theme.colors.gray};
  font-size: 15px;
`;

export default MyList;