import React from 'react';
import styled from 'styled-components';
import dormitoryImg from "../images/dormitory.png";

const NotFoundPage = () => {
  return (
    <Background>
      <Img src={dormitoryImg} alt="기숙사 사진" />
      <ErrorText>404 ERROR</ErrorText>
      <InfoTextBox>
        <InfoText>죄송합니다. 페이지를 찾을 수 없습니다. </InfoText>
        <InfoText>존재하지 않는 주소를 입력하셨거나,</InfoText>
        <InfoText>요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.</InfoText>
      </InfoTextBox>
    </Background>
  );
};

const Background = styled.div`
  width: 100%;
  height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4vh;
`;

const ErrorText = styled.div`
  font-size: 35px;
`;

const Img = styled.img`
  width: 50px;
`;

const InfoTextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1vh;
`;

const InfoText = styled.p`
  font-size: 18px;
`;

export default NotFoundPage;