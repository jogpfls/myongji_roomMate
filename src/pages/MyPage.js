import React, { useEffect, useRef, useState } from "react";
import styled, { useTheme, keyframes  } from "styled-components";
import Button from "../components/Button";
import MyList from "../components/MyList";
import BoxList from "../components/Info";
import next from "../images/next.svg";
import back from "../images/back.svg";
import { getUserData, updateUserName, getUserBoards, getLikeApi } from "../api/MyApi";
import { FaPen, FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import Cookies from "js-cookie";
import profile from "../images/profile.png";

const MyPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const theme = useTheme();
  const listWrapperRef = useRef(null);
  const likeWrapperRef = useRef(null);
  const [userData, setUserData] = useState({
    name: "",
    major: "",
    studentNumber: "",
  });
  const [nameEditMode, setNameEditMode] = useState(false);
  const [newName, setNewName] = useState("");
  const [userBoards, setUserBoards] = useState([]);
  const [like, setLike] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [changeName, setChangeName] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData();
        setUserData(data);
      } catch (error) {
        console.error("유저 정보를 가져오는데 실패했습니다.", error);
      }
    };

    fetchUserData();
  }, []);

  const handleNameEdit = () => {
    setNameEditMode(true);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNameSubmit = async () => {
    try {
      await updateUserName(newName, setModalMessage, setModalOpen, navigate);
      setUserData({ ...userData, name: newName });
      setNameEditMode(false);
    } catch (error) {
      setModalOpen(true);
      setChangeName(true);
      console.error("이름 수정에 실패했습니다.", error);
    }
  };

  useEffect(() => {
    const fetchUserBoards = async () => {
      try {
        const boards = await getUserBoards(setModalMessage, setModalOpen);
        setUserBoards(boards);
      } catch (error) {
        console.error("게시글을 가져오는데 실패했습니다.", error);
      }
    };

    fetchUserBoards();
  }, []);

  const handleWriteNext = () => {
    if (listWrapperRef.current) {
      const width = window.innerWidth;
      let scrollAmount = 0;
        scrollAmount = width * 0.58;
      listWrapperRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleLikeNext = () => {
    if (likeWrapperRef.current) {
      const width = window.innerWidth;
      let scrollAmount = 0;
        scrollAmount = width * 0.58;
      likeWrapperRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleWriteBack = () => {
    if (listWrapperRef.current) {
      const width = window.innerWidth;
      let scrollAmount = 0;
        scrollAmount = width * 0.58;
      listWrapperRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
  }
  };

  const handleLikeBack = () => {
    if (likeWrapperRef.current) {
      const width = window.innerWidth;
      let scrollAmount = 0;
        scrollAmount = width * 0.58;
      likeWrapperRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
    }

  useEffect(()=>{
    const fetchLike = async() => {
      try{
        const response = await getLikeApi();
        setLike(response)
      }catch(error){
        console.error(error);
      }
    }
    fetchLike();
  }, [])

  const handleModalClose = () => {
    setModalOpen(false);
    if(changeName){
      setModalOpen(false);
      setChangeName(false);
      navigate("/mypage");
    }
    else{
      navigate('/auth/login');
    }
  };
    
  if(!userData.length && !userBoards.length){
    return (
      <LoadingContainer>
        <Loading />
        <LoadingText>loading</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <LRBox>
        <Left>
          <Title>개인정보</Title>
          <InfoAllBox>
            <InfoBox>
            <Profile>
              <Img src={profile} alt="프로필사진"></Img>
              <NameBox>
                {nameEditMode ? (
                  <Name>
                    <FaCheck
                      onClick={handleNameSubmit}
                      style={{
                        cursor: "pointer",
                        width: "15px",
                        marginRight: "5px",
                      }}
                    />
                    <input
                      type="text"
                      value={newName}
                      onChange={handleNameChange}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") handleNameSubmit();
                      }}
                      autoFocus
                    />
                  </Name>
                ) : (
                  <Name>
                    <FaPen
                      onClick={handleNameEdit}
                      style={{
                        cursor: "pointer",
                        width: "15px",
                      }}
                    />
                    <span
                      style={{
                        color: userData?.name
                          ? theme.colors.text
                          : theme.colors.gray,
                        fontStyle: userData?.name ? "normal" : "italic",
                      }}
                    >
                      {userData?.name || <p>닉네임설정</p>}
                    </span>
                    {userData.gender === "FEMALE" && (
                    <p> (여)</p>
                    )}
                    {userData.gender === "MALE" && (
                    <p> (남)</p>
                    )}
                  </Name>
                )}
              </NameBox>
            </Profile>
            <Info>
              학번: {userData.studentNumber}
              <br />
            </Info>
            </InfoBox>
            <BottomBox>
              <ListBox>
                <BoxList isEditing={isEditing} />
              </ListBox>
              <BtnBox>
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  bgc={isEditing ? theme.colors.deepBlue2 : theme.colors.blue2}
                >
                  {isEditing ? "저장하기" : "수정하기"}
              </Button>
            </BtnBox>
            </BottomBox>
          </InfoAllBox>
        </Left>
        <Right>
          <Title>내가 쓴 글</Title>
          <BBox>
            <WriteList>
              <Back1 src={back} alt="화살표" onClick={handleWriteBack} />
              <ListWrapper ref={listWrapperRef}>
              {Cookies.get("accessToken") && (
                userBoards.map((board) => (
                  <MyListBox>
                    <MyList
                      key={board.id}
                      id={board.id}
                      dormitory={board.dormitory}
                      title={board.title}
                      date={board.createdAt}
                    />
                  </MyListBox>
                )))}
              </ListWrapper>
              <Next1 src={next} alt="화살표" onClick={handleWriteNext} />
            </WriteList>
          </BBox>
              <Title>Like</Title>
                <LikeBox>
                  <Back2 src={back} alt="화살표" onClick={handleLikeBack} />
                  <LikeScrollBox ref={likeWrapperRef}>
                  {Cookies.get("accessToken") && (
                    like.map((likes, index)=>(
                      <MyList 
                      key={index.id}
                      id={likes.id}
                      dormitory={likes.dormitory}
                      title={likes.title}
                      date={likes.createdAt}
                      />
                    )))}
                  </LikeScrollBox>
                  <Next2 src={next} alt="화살표" onClick={handleLikeNext} />
                </LikeBox>
        </Right>
      </LRBox>
      <Modal
        isOpen={modalOpen}
        onClose={handleModalClose}
        title="알림"
        message={modalMessage}
        changeName={changeName}
      />
    </Container>
  );
};

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const fadeInOut = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const LoadingContainer = styled.div`
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 70vh;
  justify-content: center;
`;

const Loading = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid ${({theme})=>theme.colors.lightBlue};
  border-top: 2px solid ${({theme})=>theme.colors.deepBlue};
  border-right: 2px solid ${({theme})=>theme.colors.deepBlue};
  animation: ${rotate} 1.8s linear infinite;
`;

const LoadingText = styled.div`
  margin-top: 10px;
  font-size: 15px;
  color: ${({theme})=>theme.colors.deepBlue};
  text-transform: uppercase;
  animation: ${fadeInOut} 2s linear infinite;
`;

const MyListBox = styled.div`

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 57vw;
  }
`;

const Container = styled.div`
  width: 70%;
  margin: auto;
  height: 95vh;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 90vw;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 90%;
    height: 120vh;
    margin-top: 6vh;
  }

`;

const LRBox = styled.div`
  width: 100%;
  min-height: 600px;
  max-height: 900px;
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3vw;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    height: auto;
    gap: 0;
  }
`;

const Left = styled.div`
  width: 50%;
  height: 80%;
  display: flex;
  flex-direction: column;
  gap: 10px;


  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    height: auto;
  }
`;

const Right = styled.div`
  width: 50%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    height: auto;
    margin-top: 10px;
  }
`;

const Title = styled.div`
  margin-left: 13px;
  ${(props) => props.theme.fonts.text4}
  font-size: 27px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: 8px;
    font-size: 25px;
    margin-top: 3vh;
  }
`;

const InfoAllBox = styled.div`
  border: 1.5px solid ${(props) => props.theme.colors.deepBlue2};
  border-radius: 30px;
  height: 100%;
  width: 100%;
  min-height: 300px;
  min-width: 200px;
  background-color: ${(props) => props.theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2vh;
  padding: 5vh 3vw;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1.5vh;
  }

`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vh;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {

  }
`;

const Profile = styled.div`
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: auto;
  }
`;
const Img = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}){
  }
`;

const NameBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  margin-top: 10px;
  flex-wrap: wrap;
`;
const Name = styled.div`
  display: flex;
  white-space: nowrap;
  span {
    margin-left: 10px;
    word-break: break-word;
    text-align: center;
  }
  input {
    background-color: ${(props) => props.theme.colors.lightBlue};
    border-radius: 5px;
    outline: none;
    display: flex;
    text-align: center;
    max-width: 150px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}){
    input{
      width: 65px;
      text-align: start;
      padding:0 10px;
    }
  }
`;

const Info = styled.div`
  width: auto;
  display: flex;
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {

  }
`;

const BottomBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  height: 63%;
  justify-content: space-between;
  width: 100%;
`;

const ListBox = styled.div`
  width: 100%;
  height: 83%;

  @media (max-width: ${({theme})=>theme.breakpoints.mobile}) {
    height: 20vh;
    margin-bottom: 2vh;
    padding-left: 7vw;
  }
`;

const BBox = styled.div`
  border: 1.5px solid ${(props) => props.theme.colors.deepBlue2};
  border-radius: 30px;
  height: 42%;
  min-height: 100px;
  background-color: ${(props) => props.theme.colors.white};
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: ${({theme})=>theme.breakpoints.mobile}) {
    position: relative;
  }

`;


const BtnBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-right: 5vw;
  }
`;

const WriteList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 3vh 0;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 57vw;
  }
`;

const Back1 = styled.img`
  display: none;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: flex;
    width: 30px;
    position: absolute;
    cursor: pointer;
    z-index: 999;
    left: 5vw;
  }
`;

const ListWrapper = styled.div`
  overflow-y: scroll;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5vh;

  &::-webkit-scrollbar{
    display: none;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
  width: 100%;
  overflow-x: hidden;
  overflow-y: initial;
  gap: 1vw;
  flex-direction: row;
  scroll-behavior: smooth;
  padding: 0;
  }
`;

const Next1 = styled.img`
  display: none;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: flex;
    width: 30px;
    position: absolute;
    right: 5vw;
    cursor: pointer;
    z-index: 999;
  }
`;

const LikeBox = styled.div`
  border: 1.5px solid ${(props) => props.theme.colors.deepBlue2};
  border-radius: 30px;
  height: 42%;
  min-height: 100px;
  background-color: ${(props) => props.theme.colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3vh 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: auto;
    border-radius: 20px;
    position: relative;
  }
`;

const Back2 = styled.img`
  display: none;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: flex;
    left: 5vw;
    width: 30px;
    position: absolute;
    cursor: pointer;
  }
`;

const LikeScrollBox = styled.div`
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 1.5vw;

  &::-webkit-scrollbar{
    display: none;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 57vw;
    height: auto;
    overflow-x: hidden;
    overflow-y: initial;
    flex-direction: row;
    gap: 1vw;
    padding: 0;
  }
`;

const Next2 = styled.img`
  display: none;
  
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: flex;
    width: 30px;
    position: absolute;
    right: 5vw;
    cursor: pointer;
  }
`;

export default MyPage;
