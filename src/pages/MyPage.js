import React, { useEffect, useRef, useState } from "react";
import styled, { useTheme } from "styled-components";
import Button from "../components/Button";
import MyList from "../components/MyList";
import next from "../images/next.svg";
import back from "../images/back.svg";
import {
  getUserData,
  updateUserName,
  getUserBoards,
  getUserCategories,
} from "../api/MyApi";
import { FaPen, FaCheck } from "react-icons/fa";

const MyPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const theme = useTheme();
  const [width, setWidth] = useState(window.innerWidth);
  const listWrapperRef = useRef(null);
  const [userData, setUserData] = useState({
    name: "",
    major: "",
    studentNumber: "",
  });
  const [nameEditMode, setNameEditMode] = useState(false);
  const [newName, setNewName] = useState("");
  const [userBoards, setUserBoards] = useState([]);

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

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleNext = () => {
    if (listWrapperRef.current) {
      if (width > 480) {
        const scrollAmount = window.innerWidth * 0.26;
        listWrapperRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      } else {
        const scrollAmount = window.innerWidth * 0.573;
        listWrapperRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  const handleBack = () => {
    if (listWrapperRef.current) {
      if (width > 480) {
        const scrollAmount = window.innerWidth * 0.26;
        listWrapperRef.current.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      } else {
        const scrollAmount = window.innerWidth * 0.573;
        listWrapperRef.current.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Container>
      <LRBox>
        {width > 480 ? (
          <>
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
                        <span>{userData?.name}</span>
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
                  <Back src={back} alt="화살표" onClick={handleBack} />
                  <ListWrapper ref={listWrapperRef}>
                    {userBoards.map((board) => (
                      <MyList key={board.id} title={board.title} />
                    ))}
                  </ListWrapper>
                  <Next src={next} alt="화살표" onClick={handleNext} />
                </WriteList>
              </BBox>
            </Left>
            <Right>
              <Title>INFO</Title>
              <LBox>
                <BoxList isEditing={isEditing} />
              </LBox>
            </Right>
          </>
        ) : (
          <Wrapper>
            <div>
              <Title>개인정보</Title>
              <TBox>
                <Profile>
                  <Img></Img>
                  <Name>김희수</Name>
                </Profile>
                <Info>
                  소속: 정보통신공학과 <br />
                  구분: ICT학부
                  <br />
                  학년: 4
                </Info>
              </TBox>
            </div>
            <div>
              <Title>INFO</Title>
              <LBox>
                <BoxList isEditing={isEditing} />
              </LBox>
            </div>
            <div>
              <Title>내가 쓴 글</Title>
              <BBox>
                <WriteList>
                  <Back src={back} alt="화살표" onClick={handleBack} />
                  <ListWrapper ref={listWrapperRef}>
                    <MyList title="흡연" />
                    <MyList title="나나나" />
                  </ListWrapper>
                  <Next src={next} alt="화살표" onClick={handleNext} />
                </WriteList>
              </BBox>
            </div>
          </Wrapper>
        )}
      </LRBox>
      <BtnBox>
        {isEditing && <CancelButton onClick={handleCancel}>취소</CancelButton>}
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

const BoxList = ({ isEditing }) => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    const fetchUserCategories = async () => {
      try {
        const response = await getUserCategories();
        const categories = response.data.categoryResponseDto.map(
          (category) => ({
            label: category.category,
          })
        );
        setItems(categories);
      } catch (error) {
        console.error("info 목록을 가져오는데 실패했습니다.", error);
      }
    };

    fetchUserCategories();
  }, []);

  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, { label: newItem }]);
      setNewItem("");
    }
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  return (
    <BoxListContainer>
      <ItemsContainer>
        {items.map((item, index) => (
          <BoxItem key={index}>
            <SquareBox>
              {isEditing && (
                <RemoveButton onClick={() => removeItem(index)}>X</RemoveButton>
              )}
            </SquareBox>
            <Label>{item.label}</Label>
          </BoxItem>
        ))}
      </ItemsContainer>
      {isEditing && (
        <AddItemContainer>
          <Input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="새 항목 추가"
          />
          <AddButton onClick={addItem}>추가</AddButton>
        </AddItemContainer>
      )}
    </BoxListContainer>
  );
};

const Container = styled.div`
  width: 70%;
  margin: auto;
  height: 95vh;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 80%;
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
`;

const Left = styled.div`
  width: 50%;
  height: 80%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Right = styled.div`
  width: 50%;
  height: 80%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.div`
  margin-left: 13px;
  ${(props) => props.theme.fonts.text4}
  font-size: 27px;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: 8px;
    font-size: 25px;
    margin-top: 3px;
  }
`;

const TBox = styled.div`
  border: 2px solid ${(props) => props.theme.colors.deepBlue2};
  border-radius: 30px;
  height: 70%;
  min-height: 300px;
  background-color: ${(props) => props.theme.colors.white};
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3vw;
  width: 100%;
  padding: 30px;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: flex;
    justify-content: space-between;
    padding: 0 6vw;
    border-radius: 20px;
    min-height: 0px;
    height: 22vh;
  }
`;

const Profile = styled.div`
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: auto;
  }
`;
const Img = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.lightBlue};
`;

const NameBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  margin-top: 10px;
  flex-wrap: wrap;
`;
const Name = styled.div`
  display: flex;
  span {
    margin-left: 10px;
    word-break: break-word;
    text-align: center;
  }
  input {
    background-color: ${(props) => props.theme.colors.lightBlue};
    border-radius: 5px;
    outline: none;
    width: 100px;
    display: flex;
  }
`;

const Info = styled.div`
  width: 60%;
  line-height: 1.5em;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: auto;
  }
`;

const BBox = styled.div`
  border: 2px solid ${(props) => props.theme.colors.deepBlue2};
  border-radius: 30px;
  height: 30%;
  min-height: 100px;
  background-color: ${(props) => props.theme.colors.white};
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: auto;
    border-radius: 20px;
  }
`;

const LBox = styled.div`
  border: 2px solid ${(props) => props.theme.colors.deepBlue2};
  border-radius: 30px;
  height: 100%;
  min-height: 450px;
  background-color: ${(props) => props.theme.colors.white};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
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

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: 3vh;
  }
`;

const BoxListContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ItemsContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: 20px;
`;

const BoxItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const SquareBox = styled.div`
  width: 23px;
  height: 23px;
  background-color: ${(props) => props.theme.colors.blue2};
  border-radius: 5px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RemoveButton = styled.button`
  position: absolute;
  width: 23px;
  height: 23px;
  border-radius: 5px;
  border: none;
  background-color: ${(props) => props.theme.colors.blue2};
  color: white;
  font-size: 15px;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.blue2C};
  }
`;

const Label = styled.div`
  margin-left: 10px;
  font-size: 20px;
`;

const AddItemContainer = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 73vw;
    margin-bottom: 1vh;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.colors.deepBlue2};
  margin-right: 10px;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 75%;
    border-radius: 10px;
  }
`;

const AddButton = styled.button`
  width: 6vw;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.colors.deepBlue2};
  color: ${(props) => props.theme.colors.white};
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 12vw;
    border-radius: 10px;
    white-space: nowrap;
  }
`;

const CancelButton = styled(Button)`
  background-color: #f44336;
  color: ${(props) => props.theme.colors.white};
`;

const WriteList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 72%;
  position: relative;
`;

const Back = styled.img`
  width: 30px;
  position: absolute;
  cursor: pointer;
  z-index: 999;
  left: -14%;
`;

const ListWrapper = styled.div`
  width: 100%;
  overflow-x: hidden;
  display: flex;
  gap: 1vw;
  scroll-behavior: smooth;
`;

const Next = styled.img`
  width: 30px;
  position: absolute;
  left: 105%;
  cursor: pointer;
  z-index: 999;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 1vh;
  padding-top: 5%;
`;

export default MyPage;
