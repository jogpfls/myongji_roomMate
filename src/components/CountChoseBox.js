import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CountChoseBox = ({closeModal, name}) => {
  const navigate = useNavigate();

  const handleClose = (e) => {
    e.stopPropagation();
    closeModal();
    };

    const handleWrite = (total) => (e) => {
      e.stopPropagation();
      closeModal();
      navigate(`/dormitory/${name}/write`, { state: { total } });
    }

  return (
    <Wrapper onClick={handleClose}>
        <BoxWrapper onClick={(e)=>e.stopPropagation()}>
          <Title>기숙사 옵션을 선택해주세요</Title>
          <div>
            <Box>
              <div>
                <InfoTextBox>
                  <InfoText>2인실 게시글 작성으로 이동합니다.</InfoText>
                </InfoTextBox>
                <ChoseBox onClick={handleWrite(2)}>
                  <Text>2인실</Text>
                </ChoseBox>
              </div>
              <div>
                <InfoTextBox>
                  <InfoText>4인실 게시글 작성으로 이동합니다.</InfoText>
                </InfoTextBox>
              <ChoseBox onClick={handleWrite(4)}>
                <Text>4인실</Text>
              </ChoseBox>
              </div>
            </Box>
          </div>
        </BoxWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BoxWrapper = styled.div`
  background-color: ${({theme})=>theme.colors.white};
  border-radius: 10px;
  width: 570px;
  height: 260px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 30px;

  @media screen and (max-width: ${({theme})=>theme.breakpoints.tablet}){
    width: 400px;
    height: 210px;
    padding: 25px;
  }
  
  @media screen and (max-width: ${({theme})=>theme.breakpoints.mobile}){
    width: 300px;
    height: 180px;
    padding: 30px 20px;
  }
`;

const Title = styled.p`
  ${({theme})=>theme.fonts.text5};
  font-size: 35px;
  width: 100%;
  text-align: center;

  @media screen and (max-width: ${({theme})=>theme.breakpoints.tablet}){
    font-size: 30px;
  }
  
  @media screen and (max-width: ${({theme})=>theme.breakpoints.mobile}){
    font-size: 23px;
    margin-top: 10px;
  }
`;

const Box = styled.div`
  display: flex;
  gap: 30px;

  @media screen and (max-width: ${({theme})=>theme.breakpoints.tablet}){
    gap: 20px;
  }
  
  @media screen and (max-width: ${({theme})=>theme.breakpoints.mobile}){
    gap: 12.5px;
  }
`;

const InfoTextBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;

  @media screen and (max-width: ${({theme})=>theme.breakpoints.tablet}){
    height: 50px;
    margin-top: 8px;
  }
  
  @media screen and (max-width: ${({theme})=>theme.breakpoints.mobile}){
    display: none;
    height: auto;
  }

`;

const InfoText = styled.p`
  color: ${({theme})=>theme.colors.blue};

  @media screen and (max-width: ${({theme})=>theme.breakpoints.tablet}){
    font-size: 16px;
    width: 130px;
    text-align: center;
  }
  
  @media screen and (max-width: ${({theme})=>theme.breakpoints.mobile}){
    display: none;
  }
`;

const ChoseBox = styled.div`
  background-color: ${({theme})=>theme.colors.lightBlue};
  width: 235px;
  height: 100px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover{
    background-color: ${({theme})=>theme.colors.lightBlueC};
  }

  @media screen and (max-width: ${({theme})=>theme.breakpoints.tablet}){
    width: 165px;
    height: 80px;
  }
  
  @media screen and (max-width: ${({theme})=>theme.breakpoints.mobile}){
    width: 120px;
    height: 60px;
  }
`;

const Text = styled.p`
  ${({theme})=>theme.fonts.font4}
  font-size: 40px;

  @media screen and (max-width: ${({theme})=>theme.breakpoints.tablet}){
    font-size: 30px;
  }
  
  @media screen and (max-width: ${({theme})=>theme.breakpoints.mobile}){
    font-size: 20px;
  }
`;

export default CountChoseBox;