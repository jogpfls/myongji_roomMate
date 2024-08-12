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
      <Title onClick={() => handleNavigation("/main")}>로고</Title>
      <Menu>
        <Item
          $active={isActive("/dormitory")}
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
  width: 100%;
  margin: 20px auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray};
  /* margin-bottom: 30px; */
  background-color: ${(props) => props.theme.colors.white};
`;
const Title = styled.h1`
  width: 20%;
  font-size: 40px;
  padding-left: 40px;
  margin-bottom: 3px;
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
  padding: 14px 40px;
  font-weight: ${(props) => (props.$active ? "bold" : "normal")};
  border-bottom: ${(props) =>
    props.$active ? `4px solid ${props.theme.colors.deepBlue}` : "none"};
  color: ${(props) =>
    props.$active ? props.theme.colors.deepBlue : props.theme.colors.gray};
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
