import React from "react";
import styled from "styled-components";
import Category from "./Category";

const OtherInfo = ({ userInfo, onClose }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <Header>
          <h2>{userInfo.name}님의 INFO</h2>
        </Header>
        <CategoryList>
          <CategoryWrapper>
            {userInfo.categoryListData.categoryResponseDto.map((category) => (
              <Category key={category.id}>{category.category}</Category>
            ))}
          </CategoryWrapper>
        </CategoryList>
        <ButtonContainer>
          <ConfirmButton onClick={onClose}>확인</ConfirmButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default OtherInfo;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 30px;
  max-width: 500px;
  width: 60%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 70%;
  }
`;

const Header = styled.div`
  margin-bottom: 15px;
  text-align: center;

  h2 {
    ${(props) => props.theme.fonts.text4};
  }
`;

const ButtonContainer = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ConfirmButton = styled.button`
  background: ${(props) => props.theme.colors.blue};
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 30px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background: ${(props) => props.theme.colors.deepBlue2};
  }
`;

const CategoryList = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
`;
