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
      <BoxWrapper>
        <ChoseBox onClick={handleWrite(2)}>
          <Text>2인실</Text>
        </ChoseBox>
        <ChoseBox onClick={handleWrite(4)}>
          <Text>4인실</Text>
        </ChoseBox>
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
`;

const BoxWrapper = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3%;
`;

const ChoseBox = styled.div`
  background-color: ${({theme})=>theme.colors.lightBlue};
  width: 40%;
  height: 50%;
  max-width: 350px;
  max-height: 350px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover{
    background-color: ${({theme})=>theme.colors.lightBlueC};
  }

  @media screen and (max-width: ${({theme})=>theme.breakpoints.mobile}){
    height: 30%;
  }
`;

const Text = styled.p`
  ${({theme})=>theme.fonts.font4}
  font-size: 50px;

  @media screen and (max-width: ${({theme})=>theme.breakpoints.mobile}){
    font-size: 30px;
  }
`;

export default CountChoseBox;