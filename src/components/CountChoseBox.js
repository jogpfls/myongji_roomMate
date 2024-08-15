import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CountChoseBox = ({closeModal}) => {
  const navigate = useNavigate();

  const handleClose = (e) => {
    e.stopPropagation();
    closeModal();
    };

  const handleWrite = (e) => {
    e.stopPropagation()
    closeModal();
    navigate(`/write`)
  }
  return (
    <Wrapper onClick={handleClose}>
      <BoxWrapper>
        <ChoseBox onClick={handleWrite}>
          <Text>2인실</Text>
        </ChoseBox>
        <ChoseBox onClick={handleWrite}>
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
`;

const Text = styled.p`
  ${({theme})=>theme.fonts.font4}
  font-size: 50px;
`;

// const Wrapper = styled.div`
//   background-color: rgba(0, 0, 0, 0.5);
//   position: fixed;
//   top: 0;
//   right: 0;
//   bottom: 0;
//   left: 0;
//   z-index: 1000;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const BoxWrapper = styled.div`
//   display: flex;
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   gap: 5%;
//   background-color: ${({theme})=>theme.colors.white};
//   width: 50%;
//   height: 40%;
//   padding: 0 30px;
//   border-radius: 10px;

// `;

// const ChoseBox = styled.div`
//   background-color: ${({theme})=>theme.colors.lightBlue};
//   width: 90%;
//   height: 90%;
//   max-width: 400px;
//   max-height: 400px;
//   border-radius: 10px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   cursor: pointer;
//   transition: background-color 0.2s;

//   &:hover{
//     background-color: ${({theme})=>theme.colors.lightBlueC};
//   }
// `;

// const Text = styled.p`
//   ${({theme})=>theme.fonts.font4}
//   font-size: 50px;
// `;

export default CountChoseBox;