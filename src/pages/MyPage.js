import React, { useEffect, useRef, useState } from "react";
import styled, { useTheme, keyframes  } from "styled-components";
import Button from "../components/Button";
import MyList from "../components/MyList";
import BoxList from "../components/Info";
import next from "../images/next.svg";
import back from "../images/back.svg";
import { getUserData, updateUserName, getUserBoards } from "../api/MyApi";
import { FaPen, FaCheck } from "react-icons/fa";
import { getLikeApi } from "../api/MyApi";

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
      await updateUserName(newName);
      setUserData({ ...userData, name: newName });
      setNameEditMode(false);
    } catch (error) {
      console.error("이름 수정에 실패했습니다.", error);
    }
  };

  useEffect(() => {
    const fetchUserBoards = async () => {
      try {
        const boards = await getUserBoards();
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
      if (width > 850) {
        scrollAmount = width * 0.26;
      } else if (width > 480) {
        scrollAmount = width * 0.29;
      } else {
        scrollAmount = width * 0.58;
      }
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
      if (width > 850) {
        scrollAmount = width * 0.26;
      } else if (width > 480) {
        scrollAmount = width * 0.29;
      } else {
        scrollAmount = width * 0.58;
      }
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
      if (width > 850) {
        scrollAmount = width * 0.26;
      } else if (width > 480) {
        scrollAmount = width * 0.29;
      } else {
        scrollAmount = width * 0.58;
      }
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
      if (width > 850) {
        scrollAmount = width * 0.26;
      } else if (width > 480) {
        scrollAmount = width * 0.29;
      } else {
        scrollAmount = width * 0.58;
      }
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
  
  if(!userData || !userBoards){
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
          <TBox>
            <Profile>
              <Img></Img>
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
              구분: ICT학부
              <br />
              소속: {userData.major}
            </Info>
          </TBox>
          <Title>내가 쓴 글</Title>
          <BBox>
            <WriteList>
              <Back1 src={back} alt="화살표" onClick={handleWriteBack} />
              <ListWrapper ref={listWrapperRef}>
                {userBoards.map((board) => (
                  <MyListBox>
                    <MyList
                      key={board.id}
                      id={board.id}
                      dormitory={board.dormitory}
                      title={board.title}
                      date={board.createdAt}
                    />
                  </MyListBox>
                ))}
              </ListWrapper>
              <Next1 src={next} alt="화살표" onClick={handleWriteNext} />
            </WriteList>
          </BBox>
        </Left>
        <Right>
            <Title>INFO</Title>
            <LBox>
              <BoxList isEditing={isEditing} />
            </LBox>
              <Title>Like</Title>
                <LikeBox>
                  <Back2 src={back} alt="화살표" onClick={handleLikeBack} />
                  <LikeScrollBox ref={likeWrapperRef}>
                    {like.map((likes, index)=>(
                      <MyList 
                      key={index.id}
                      id={likes.id}
                      dormitory={likes.dormitory}
                      title={likes.title}
                      date={likes.createdAt}
                      />
                    ))}
                  </LikeScrollBox>
                  <Next2 src={next} alt="화살표" onClick={handleLikeNext} />
                </LikeBox>
        </Right>
      </LRBox>
      <BtnBox>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          bgc={isEditing ? theme.colors.deepBlue2 : theme.colors.blue2}
        >
          {isEditing ? "저장하기" : "수정하기"}
        </Button>
      </BtnBox>
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
  width: 25vw;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 28vw;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 57vw;
  }
`;

const Container = styled.div`
  width: 70%;
  margin: auto;
  height: 95vh;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 90%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 85%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    margin-top: 3vh;
  }
`;

const LRBox = styled.div`
  width: 100%;
  min-height: 600px;
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3vw;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    height: auto;
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
  gap: 10px;

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
    margin-top: 3px;
  }
`;

const TBox = styled.div`
  border: 1.5px solid ${(props) => props.theme.colors.deepBlue2};
  border-radius: 30px;
  height: 70%;
  min-height: 300px;
  background-color: ${(props) => props.theme.colors.white};
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4vw;
  width: 100%;
  padding: 30px 30px 30px 40px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 3vh;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: flex;
    justify-content: space-evenly;
    padding: 0 6vw;
    border-radius: 20px;
    min-height: 0px;
    height: 200px;
    flex-direction: row;
    gap: 0;
    position: relative;
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
const Img = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.lightBlue};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}){
    position: absolute;
    left: 10%;
    top: 15%;
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
    position: absolute;
    bottom: 15%;
    left: 10%;
    input{
      width: 65px;
      text-align: start;
      padding:0 10px;
    }
  }
`;

const Info = styled.div`
  width: auto;
  line-height: 1.5em;
  display: flex;
  white-space: nowrap;
  //background-color: red;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: auto;
    top: 25%;
    position: absolute;
    left: 55%;
  }
`;

const BBox = styled.div`
  border: 1.5px solid ${(props) => props.theme.colors.deepBlue2};
  border-radius: 30px;
  height: 30%;
  min-height: 100px;
  background-color: ${(props) => props.theme.colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: auto;
    border-radius: 20px;
  }
`;

const LBox = styled.div`
  border: 1.5px solid ${(props) => props.theme.colors.deepBlue2};
  border-radius: 30px;
  height: 70%;
  min-height: 300px;
  background-color: ${(props) => props.theme.colors.white};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px;
  margin-bottom: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: 40px;
    height: 80%;
    padding: 30px 0 0 20px;
    border-radius: 20px;
  }
`;

const BtnBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: -6vh;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: 3vh;
  }
`;

const WriteList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25vw;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 28vw;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 57vw;
  }
`;

const Back1 = styled.img`
  width: 30px;
  position: absolute;
  cursor: pointer;
  z-index: 999;
  left:  0.4vw;
`;

const ListWrapper = styled.div`
  width: 100%;
  overflow-x: hidden;
  display: flex;
  gap: 1vw;
  scroll-behavior: smooth;
`;

const Next1 = styled.img`
  width: 30px;
  position: absolute;
  right: 0.3vw;
  cursor: pointer;
  z-index: 999;
`;

const LikeBox = styled.div`
  border: 1.5px solid ${(props) => props.theme.colors.deepBlue2};
  border-radius: 30px;
  height: 30%;
  min-height: 100px;
  background-color: ${(props) => props.theme.colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: auto;
    border-radius: 20px;
  }
`;

const Back2 = styled.img`
  left: 0.3vw;
  width: 30px;
  position: absolute;
  cursor: pointer;
`;

const LikeScrollBox = styled.div`
  width: 25vw;
  height: auto;
  display: flex;
  overflow-x: hidden;
  gap: 1vw;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 28vw;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 57vw;
  }
`;

const Next2 = styled.img`
  width: 30px;
  position: absolute;
  right: 0.3vw;
  cursor: pointer;
`;

export default MyPage;
