import React from "react";
import styled from "styled-components";
import univ from "../images/univ.png";

const Footer = () => {
  return (
    <div>
      <Box>
        <Img src={univ} />
        <h3>SW경진대회</h3>
        <p>
          <br />
          명지대학교 룸메이트 매칭 사이트
        </p>
        <p>60205205 김희수 60222475 박주희 60232410 조혜린 60222536최현서</p>
      </Box>
    </div>
  );
};
const Img = styled.img`
  width: 3%;
  height: auto;
  margin-bottom: 10px;
  opacity: 100%;
`;
const Box = styled.div`
  background-color: ${(props) => props.theme.colors.black};
  opacity: 70%;
  height: 190px;
  color: ${(props) => props.theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  p {
    line-height: 1.3em;
  }
`;
export default Footer;
