import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import tree from "../images/Tree.png";
import { useNavigate } from "react-router-dom";
import Map from "../components/Map";
import { scroller } from "react-scroll";
import Cookies from "js-cookie";
import { getUserData } from "../api/MyApi";
import NameGender from "../components/NameGender";
import Modal from "../components/Modal";

const MainPage = () => {
  const navigate = useNavigate();
  const [mapVisible, setMapVisible] = useState(false);
  const mapRef = useRef(null);
  const [userData, setUserData] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMapVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const currentMapRef = mapRef.current;

    if (currentMapRef) {
      observer.observe(currentMapRef);
    }

    return () => {
      if (currentMapRef) {
        observer.unobserve(currentMapRef);
      }
    };
  }, []);

  const handleScrollToMap = () => {
    scroller.scrollTo("map-section", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
      offset: -200,
    });
  };

  const handleCirClick = (path) => {
    const token = Cookies.get("accessToken");

    if (!token) {
      setModalMessage("로그인이 필요합니다.");
      setModalOpen(true);
    } else {
      navigate(path);
    }
  };

  useEffect(() => {
    if(Cookies.get("accessToken")){
      const fetchData = async () => {
        const data = await getUserData();
        setUserData(data);
      };
      fetchData();
    }
  }, [navigate]);

  useEffect(() => {
    if (userData.name === null || userData.gender === null) {
      setModal(true);
    } else {
      setModal(false);
    }
  }, [userData]);

  const closeModal = () => {
    setModal(false);
    setModalOpen(false);
  };

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
          <Cir
            backgroundColor="blue3"
            onClick={() => handleCirClick("/dormitory/myoungdeok")}
          >
            명덕
          </Cir>
          <Cir
            backgroundColor="deepBlue"
            onClick={() => handleCirClick("/dormitory/myounghyun")}
          >
            명현
          </Cir>
          <Cir
            backgroundColor="blue2"
            onClick={() => handleCirClick("/dormitory/dormitory3")}
          >
            3동
          </Cir>
          <Cir
            backgroundColor="deepBlue2"
            onClick={() => handleCirClick("/dormitory/dormitory4")}
          >
            4동
          </Cir>
          <Cir
            backgroundColor="blue"
            onClick={() => handleCirClick("/dormitory/dormitory5")}
          >
            5동
          </Cir>
        </CirBox>
        <DownArrow onClick={handleScrollToMap}>❯</DownArrow>
      </ContentContainer>
      <AnimatedMapContainer
        ref={mapRef}
        className={mapVisible ? "visible" : ""}
        name="map-section"
      >
        <Map />
      </AnimatedMapContainer>
      {modal && <NameGender closeModal={closeModal} />}

      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title="알림"
        message={modalMessage}
      />
    </div>
  );
};

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AnimatedMapContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease-in-out, transform 0.8s ease-in-out;

  &.visible {
    opacity: 1;
    transform: translateY(0);
    animation: ${fadeInUp} 0.8s ease-in-out;
  }
`;

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
  padding: 150px 20px;
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

const DownArrow = styled.div`
  transform: rotate(90deg);
  margin-top: 20px;
  cursor: pointer;
  font-size: 30px;
  color: ${(props) => props.theme.colors.blue};
  transition: transform 0.3s ease;
  font-size: 50px;
`;

export default MainPage;
