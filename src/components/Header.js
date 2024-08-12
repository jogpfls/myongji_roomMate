import React from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activePath = location.pathname.toLowerCase();

  const isActive = (path) => {
    return activePath.startsWith(path.toLowerCase());
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Container>
      <Title onClick={() => handleNavigation("/main")}>명지메이트</Title>
      <Menu>
        <Item
          $active={
            isActive("/dormitory") || isActive("/room") || isActive("/write")
          }
          onClick={() => handleNavigation("/dormitory")}
        >
          매칭게시판
        </Item>
        <Item
          $active={isActive("/chat")}
          onClick={() => handleNavigation("/chat")}
        >
          채팅방
        </Item>
        <Item
          $active={isActive("/mypage")}
          onClick={() => handleNavigation("/mypage")}
        >
          마이페이지
        </Item>
      </Menu>
      <LogoutContainer>
        <Logout>로그아웃</Logout>
      </LogoutContainer>
    </Container>
  );
};
const Container = styled.div`
  position: fixed;
  z-index: 1000;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray};
  background-color: ${(props) => props.theme.colors.white};
  padding-top: 10px;
`;
const Title = styled.h1`
  width: 30%;
  ${(props) => props.theme.fonts.logo};
  padding-left: 40px;
  cursor: pointer;
  color: ${(props) => props.theme.colors.deepBlue};
`;
const Menu = styled.h1`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 4vw;
  font-size: 20px;
`;
const Item = styled.p`
  text-align: center;
  padding: 15px 40px;
  font-weight: ${(props) => (props.$active ? "bold" : "normal")};
  border-bottom: ${(props) =>
    props.$active ? `4px solid ${props.theme.colors.deepBlue}` : "none"};
  color: ${(props) =>
    props.$active ? props.theme.colors.deepBlue : props.theme.colors.gray};
  cursor: pointer;
`;
const LogoutContainer = styled.div`
  margin-right: 40px;
`;
const Logout = styled.button`
  width: 8vw;
  height: 2.5vw;
  border-radius: 2vw;
  background-color: ${(props) => props.theme.colors.deepBlue};
  color: ${(props) => props.theme.colors.white};
  margin-bottom: 3px;
`;

export default Header;
