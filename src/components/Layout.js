import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <main>{children}</main>
      <Footer />
    </div>
  );
};

const HeaderWrapper = styled.div`
  height: 60px;
`;

export default Layout;
