import React from "react";
import styled from "styled-components";
import Category from "./Category";
import tag from "../images/tag.png";

const OtherInfo = ({ userInfo, onClose }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <Header>
          <h2>{userInfo.name}님의 INFO</h2>
          <img src={tag}></img>
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
  padding: 25px;
  max-width: 550px;
  width: 60%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-height: 80%;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 80%;
    max-height: 60%;
  }
`;

const Header = styled.div`
  margin-top: 10px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  h2 {
    ${(props) => props.theme.fonts.text4};
  }

  img {
    width: 10%;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: end;
  width: 100%;
`;

const ConfirmButton = styled.button`
  background: ${(props) => props.theme.colors.deepBlue2};
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 30px;
  margin-right: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background: ${(props) => props.theme.colors.deepBlue};
  }
`;

const CategoryList = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  width: 90%;
  border: 2px dashed ${(props) => props.theme.colors.deepBlue};
  border-radius: 10px;
  padding: 40px 20px;
  overflow-y: auto;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 30px 10px;
  }
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;
