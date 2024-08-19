import React from "react";
import styled from "styled-components";
import univ from "../images/logo.svg";

const Footer = () => {
  return (
    <div>
      <Box>
        <p>
          <Img src={univ} />
          <Logo>명지메이트</Logo>
          명지대학교 룸메이트 매칭 사이트
        </p>
        <Text>
          📍 자연캠퍼스 : (17058) 경기도 용인시 처인구 명지로 116 ( TEL :
          <a href="tel:031-330-6082">031-330-6082</a> )
          <br />
          📍 자연생활관 관리팀 카카오톡 채널:
          <a href="http://pf.kakao.com/_xgSZyK/chat">명지대학교 자연생활관</a>
          <br />
          📍 자연생활관 관리팀 이메일:
          <a href="mailto:dormyongin@mju.ac.kr">dormyongin@mju.ac.kr</a>
        </Text>
      </Box>
    </div>
  );
};
const Img = styled.img`
  width: 13%;
  height: auto;
  margin-bottom: 10px;
  opacity: 100%;
`;
const Box = styled.div`
  background-color: ${(props) => props.theme.colors.black};
  opacity: 70%;
  height: 300px;
  color: ${(props) => props.theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  p {
    font-size: 17px;
    line-height: 1.3em;
    text-align: center;
  }
`;

const Logo = styled.p`
  width: 100%;
  ${(props) => props.theme.fonts.logo};
  color: ${(props) => props.theme.colors.blue};
  text-align: center;
`;

const Text = styled.div`
  text-align: center;
  margin: 10px;
  margin-top: 20px;
  color: ${(props) => props.theme.colors.gray};
  font-size: 15px;
  line-height: 1.3em;
  a {
    font-size: 15px;
    color: ${(props) => props.theme.colors.blue};
  }
`;

export default Footer;
