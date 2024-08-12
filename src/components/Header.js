import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaBuilding } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const activePath = location.pathname.toLowerCase();

  const isActive = (path) => {
    return activePath.startsWith(path.toLowerCase());
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const onClick = (e) => {
      if (menuRef.current !== null && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener("click", onClick);
    }
    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [isOpen]);

  return (
    <Container>
      <Title onClick={() => handleNavigation("/main")}>명지메이트</Title>
      <Menu>
        <ItemBox
          ref={menuRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Item
            $active={
              isActive("/dormitory") || isActive("/room") || isActive("/write")
            }
            onClick={()=>navigate('/main')}
            post="매칭"
          >
            매칭게시판
          </Item>
          {isOpen && (
            <DroppedBox>
              <LinkWrapper onClick={() => handleNavigation("/dormitory")}>
                <FaHome style={{ marginRight: "8px" }} /> 명덕
              </LinkWrapper>
              <LinkWrapper onClick={() => handleNavigation("/dormitory")}>
                <FaHome style={{ marginRight: "8px" }} /> 명현
              </LinkWrapper>
              <LinkWrapper onClick={() => handleNavigation("/dormitory")}>
                <FaBuilding style={{ marginRight: "8px" }} /> 3동
              </LinkWrapper>
              <LinkWrapper onClick={() => handleNavigation("/dormitory")}>
                <FaBuilding style={{ marginRight: "8px" }} /> 4동
              </LinkWrapper>
              <LinkWrapper onClick={() => handleNavigation("/dormitory")}>
                <FaBuilding style={{ marginRight: "8px" }} /> 5동
              </LinkWrapper>
            </DroppedBox>
          )}
        </ItemBox>
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
        <Logout onClick={() => navigate("/auth/login")}>로그인</Logout>
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
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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

const ItemBox = styled.div`
  position: relative;
  display: inline-block;
`;

const Item = styled.span`
  text-align: center;
  padding: 15px 40px;
  font-weight: ${(props) => (props.$active ? "bold" : "normal")};
  border-bottom: ${(props) =>
    props.$active ? `4px solid ${props.theme.colors.deepBlue}` : "none"};
  color: ${(props) =>
    props.$active ? props.theme.colors.deepBlue : props.theme.colors.gray};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;

  ${({ post, theme }) =>
    post !== "매칭" ? `
    &:hover {
      color: ${theme.colors.deepBlue};
      border-bottom: 4px solid ${theme.colors.deepBlue};
    }` : `
    &:hover {
      color: ${theme.colors.deepBlue};
    }`}
`;

const DroppedBox = styled.div`
  position: absolute;
  top: 50px;
  left: 0;
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.white},
    ${(props) => props.theme.colors.gray2}
  );
  border-radius: 8px;
  width: 160px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  transition: opacity 0.3s ease, transform 0.3s ease;
  opacity: 0.95;
  transform-origin: top;
  transform: scaleY(1);
`;

const LinkWrapper = styled.a`
  background-color: transparent;
  width: 100%;
  border-radius: 4px;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.deepBlue};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const LogoutContainer = styled.div`
  margin-right: 40px;
`;

const Logout = styled.button`
  width: 8vw;
  min-width: 50px;
  height: 4vh;
  border-radius: 2vw;
  background-color: ${(props) => props.theme.colors.deepBlue};
  color: ${(props) => props.theme.colors.white};
  margin-bottom: 3px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.blueBlack};
  }
`;

export default Header;
