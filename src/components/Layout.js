import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <LayoutContainer>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <Main>{children}</Main>
      {location.pathname !== "/chat" && (
        <FooterBox>
          <Footer />
        </FooterBox>
      )}
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const HeaderWrapper = styled.div`
  height: 60px;
`;

const Main = styled.main`
  flex: 1;
`;

const FooterBox = styled.div`
  margin-top: 5vh;
`;

export default Layout;
