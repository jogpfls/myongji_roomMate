import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaBuilding, FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const activePath = location.pathname.toLowerCase();

  const isActive = (path) => {
    return activePath.startsWith(path.toLowerCase());
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const handleMouseEnter = () => {
    if (window.innerWidth > 480)
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (window.innerWidth > 480)
    setIsOpen(false);
  };

  useEffect(() => {
    const onClick = (e) => {
      setWindowWidth(window.innerWidth);
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

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Container>
      <Box>
      <Sidebar>
        <Title onClick={() => handleNavigation("/main")}>명지메이트</Title>
        {windowWidth <=480 &&
          <LogoutContainer>
            <Logout onClick={() => navigate("/auth/login")}>로그인</Logout>
          </LogoutContainer>
        }
        <SideMenu onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <Close /> : <MenuBars />}
        </SideMenu>
      </Sidebar>
      <Menu open={menuOpen}>
      <Item
          $active={isActive("/info")}
          onClick={() => handleNavigation("/info")}
        >
          입사 안내
        </Item>
        <ItemBox
          ref={menuRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {windowWidth > 480 ? 
          <Item
          $active={
            isActive("/dormitory") || isActive("/room") || isActive("/write")
          }
          post="매칭"
          >
          매칭게시판
          </Item> : 
          <Item
          $active={
            isActive("/main")
          }
          onClick={() => handleNavigation("/main")}
        >
          매칭게시판
        </Item>  
        }
          
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
        {windowWidth > 480 &&
          <LogoutContainer>
            <Logout onClick={() => navigate("/auth/login")}>로그인</Logout>
          </LogoutContainer>
        }
      </Menu>
      </Box>
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
  border-bottom: 1px solid ${(props) => props.theme.colors.gray};
  background-color: ${(props) => props.theme.colors.white};

  @media screen and (max-width: ${({theme})=>theme.breakpoints.mobile}){
    padding: 10px;
    flex-direction: column;
    padding: 0;
  }
`;

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0 3vw;
`;

const Sidebar = styled.div`
  display: flex;
  align-items: center;
  width: 30%;
  justify-content: space-between;

  @media (max-width: ${({theme})=>theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

const SideMenu = styled.div`
  display: none;
  font-size: 24px;
  cursor: pointer;

  @media (max-width: ${({theme})=>theme.breakpoints.mobile}) {
    display: block;
    margin-right: 3vw;
  }
`;

const MenuBars = styled(FaBars)`
  color: ${(props) => props.theme.colors.deepBlue};
`;

const Close = styled(FaTimes)`
  color: ${(props) => props.theme.colors.deepBlue};
`;

const Title = styled.p`
  width: 100%;
  ${(props) => props.theme.fonts.logo};
  cursor: pointer;
  color: ${(props) => props.theme.colors.deepBlue};
  white-space: nowrap;

  @media screen and (max-width: ${({theme})=>theme.breakpoints.mobile}){
    font-size: 5.5vw;
    margin-left: 3vw;
  }
`;

const Menu = styled.h1`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;

  @media (max-width: ${({theme})=>theme.breakpoints.mobile}) {
    width: 100%;
    flex-direction: column;
    gap: 5px;
    display: ${(props) => (props.open ? "flex" : "none")};
    background-color: ${({theme})=>theme.colors.white};
    position: absolute;
    top: 60px;
    left: 0;
    z-index: 999;
  }

`;

const ItemBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: columns;
`;

const Item = styled.span`
  margin-left: 3vw;
  text-align: center;
  white-space: nowrap;
  padding: 20px 0;
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

@media (max-width: ${({theme})=>theme.breakpoints.mobile}) {
    font-size: 18px;
    width: 100vw;
    border-bottom: solid 2px ${({theme})=>theme.colors.gray2};
    padding: 20px 0;
    margin: 0;

    &:hover{
      color: ${({theme})=>theme.colors.deepBlue};
      border-bottom: solid 2px ${({theme})=>theme.colors.gray2
    }
  }}
`;

const DroppedBox = styled.div`
  position: absolute;
  top: 50px;
  left: 0;
  background-color: white;
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

  @media (max-width: ${({theme})=>theme.breakpoints.mobile}) {
    position: relative;
    top: 0;
    left: 0;
    box-shadow: none;
    width: 100%;
  }

`;

const LinkWrapper = styled.a`
  background-color: transparent;
  width: 100%;
  border-radius: 4px;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
  font-size: 18px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.deepBlue};
    color: ${({ theme }) => theme.colors.white};
  }

  @media (max-width: ${({theme})=>theme.breakpoints.mobile}) {
    justify-content: flex-start;
    padding: 10px;
  }
`;

const LogoutContainer = styled.div`
  margin-left: 3vw;
  height: 100%;
  display: flex;
  align-items: center;

  @media screen and (max-width: ${({theme})=>theme.breakpoints.mobile}){
    margin-left: 38vw;
    margin-right: 3vw;
  }
`;

const Logout = styled.button`
  width: 8vw;
  min-width: 50px;
  height: 35px;
  border-radius: 15px;
  background-color: ${(props) => props.theme.colors.deepBlue};
  color: ${(props) => props.theme.colors.white};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.blueBlack};
  }

  @media (max-width: ${({theme})=>theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

export default Header;
