import React from "react";
import styled from "styled-components";
import tree from "../images/Tree.png";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <BackgroundImage src={tree} />
      <ContentContainer>
        <Title>명지메이트</Title>
        <Info>
          명지대학교 자연캠퍼스 룸메이트 매칭 웹사이트
          <p>입주할 기숙사 건물을 선택해주세요</p>
        </Info>
        <CirBox>
          <Cir backgroundColor="blue3" onClick={() => navigate("/dormitory/")}>
            명덕
          </Cir>
          <Cir
            backgroundColor="deepBlue"
            onClick={() => navigate("/dormitory/")}
          >
            {" "}
            명현
          </Cir>
          <Cir backgroundColor="blue2" onClick={() => navigate("/dormitory/")}>
            3동
          </Cir>
          <Cir
            backgroundColor="deepBlue2"
            onClick={() => navigate("/dormitory/")}
          >
            4동
          </Cir>
          <Cir backgroundColor="blue" onClick={() => navigate("/dormitory/")}>
            5동
          </Cir>
        </CirBox>
      </ContentContainer>
    </div>
  );
};

const BackgroundImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.15;
  height: 90vh;
  width: 90vw;
  object-fit: contain;
  z-index: -1;
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 1;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.div`
  ${(props) => props.theme.fonts.logo}
  color: ${(props) => props.theme.colors.deepBlue};
  font-size: 60px;
  margin-bottom: 20px;
`;
const Info = styled.div`
  ${(props) => props.theme.fonts.text4}
  margin-bottom: 50px;
  text-align: center;
  p {
    text-align: center;
    margin-top: 20px;
    color: ${(props) => props.theme.colors.gray};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 80%;
    margin-bottom: 30px;
  }
`;

const CirBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5vw;
  padding-bottom: 50px;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 3vw;
  }
`;

const Cir = styled.div`
  background-color: ${(props) => props.theme.colors[props.backgroundColor]};
  width: 17vw;
  height: 17vw;
  border-radius: 50%;
  opacity: 0.75;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.white};
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.4);
  ${(props) => props.theme.fonts.text4}
  font-size: 4vw;
  cursor: pointer;

  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.3);
  }
  &:active {
    transform: translateY(0);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 80vw;
    height: 15vw;
    border-radius: 7px;
    ${(props) => props.theme.fonts.text4}
    font-size: 7vw;
  }
`;

export default MainPage;
